/**
 * Steam Web API data layer.
 *
 * Two upstreams with very different manners:
 *
 * - `api.steampowered.com` — keyed, generous, returns the library and playtime.
 *   One request covers every owned game.
 * - `store.steampowered.com/api/appdetails` — unkeyed, undocumented, and rate
 *   limited to roughly 200 requests per five minutes. It holds everything worth
 *   writing about (genre, developer, release date, description), so the importer
 *   walks it slowly and caches each app to disk. Metadata for a shipped game
 *   does not change, so a cached app is never re-fetched.
 *
 * Only played games get enriched. An unplayed bundle leftover contributes
 * nothing to the page or the wiki and is not worth a rate-limited request.
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

const STEAM_API = 'https://api.steampowered.com'
const STORE_API = 'https://store.steampowered.com/api'

/** Resolved from `steamcommunity.com/id/_k3m/?xml=1`. Override with `STEAM_ID`. */
const DEFAULT_STEAM_ID = '76561197987767670'

/** Store API tolerates roughly 200 requests per 5 minutes; stay well under. */
const STORE_THROTTLE_MS = 1_600
const STORE_MAX_RETRIES = 3

const APP_CACHE_DIR = join(process.cwd(), 'public', 'static', 'data', 'steam', 'apps')

// --- Types ---

export interface SteamProfile {
  steamId: string
  personaName: string
  profileUrl: string
  avatarUrl: string
}

/** Store metadata for one app. `null` when the store has no entry (delisted). */
export interface SteamAppDetails {
  appid: number
  type: string
  shortDescription: string
  developers: string[]
  publishers: string[]
  genres: string[]
  categories: string[]
  releaseDate: string | null
  releaseYear: number | null
  metacritic: number | null
  headerUrl: string | null
  isFree: boolean
}

export interface SteamGame {
  appid: number
  name: string
  /** Total playtime across all platforms, in minutes. */
  playtimeMinutes: number
  /** Playtime in the trailing two weeks, in minutes. */
  playtimeRecentMinutes: number
  /** ISO date, or `null` when Steam has never recorded a session. */
  lastPlayed: string | null
  iconUrl: string | null
  storeUrl: string
  details: SteamAppDetails | null
}

export interface SteamLibrary {
  profile: SteamProfile
  fetchedAt: string
  /** Every owned game, played or not, sorted by playtime descending. */
  games: SteamGame[]
  /** Owned apps the store no longer lists, by appid. Kept for honest counts. */
  unresolved: number[]
}

// --- Helpers ---

function requireKey(): string {
  const key = process.env.STEAM_API_KEY
  if (!key) {
    throw new Error(
      'STEAM_API_KEY is not set. Create one at https://steamcommunity.com/dev/apikey and add it to .env.local'
    )
  }
  return key
}

function steamId(): string {
  return process.env.STEAM_ID || DEFAULT_STEAM_ID
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function getJson<T>(url: string, label: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${label} failed: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

/** Steam serves icons off a CDN keyed by a per-app hash. Empty hash means none. */
function iconUrl(appid: number, hash: string | undefined): string | null {
  if (!hash) return null
  return `https://media.steampowered.com/steamcommunity/public/images/apps/${appid}/${hash}.jpg`
}

function releaseYear(date: string | null): number | null {
  if (!date) return null
  const match = date.match(/\b(19|20)\d{2}\b/)
  return match ? Number(match[0]) : null
}

// --- Fetch functions ---

async function fetchProfile(): Promise<SteamProfile> {
  const url = `${STEAM_API}/ISteamUser/GetPlayerSummaries/v2/?key=${requireKey()}&steamids=${steamId()}`
  const data = await getJson<{
    response: {
      players: {
        steamid: string
        personaname: string
        profileurl: string
        avatarfull: string
      }[]
    }
  }>(url, 'profile')

  const player = data.response?.players?.[0]
  if (!player) throw new Error(`No profile returned for steamid ${steamId()}`)

  return {
    steamId: player.steamid,
    personaName: player.personaname,
    profileUrl: player.profileurl,
    avatarUrl: player.avatarfull,
  }
}

interface RawOwnedGame {
  appid: number
  name?: string
  playtime_forever?: number
  playtime_2weeks?: number
  rtime_last_played?: number
  img_icon_url?: string
}

async function fetchOwnedGames(): Promise<RawOwnedGame[]> {
  const url =
    `${STEAM_API}/IPlayerService/GetOwnedGames/v1/?key=${requireKey()}&steamid=${steamId()}` +
    `&include_appinfo=1&include_played_free_games=1`
  const data = await getJson<{ response: { games?: RawOwnedGame[] } }>(url, 'owned games')

  const games = data.response?.games
  if (!games) {
    throw new Error(
      'Steam returned no games. The key must belong to the account being read, and ' +
        'that account must have Game details set to Public or Friends Only.'
    )
  }
  return games
}

// --- Store enrichment ---

function readCachedApp(appid: number): SteamAppDetails | null | undefined {
  const path = join(APP_CACHE_DIR, `${appid}.json`)
  if (!existsSync(path)) return undefined
  try {
    return JSON.parse(readFileSync(path, 'utf-8')) as SteamAppDetails | null
  } catch {
    return undefined
  }
}

function writeCachedApp(appid: number, details: SteamAppDetails | null): void {
  mkdirSync(APP_CACHE_DIR, { recursive: true })
  writeFileSync(join(APP_CACHE_DIR, `${appid}.json`), JSON.stringify(details, null, 2) + '\n')
}

interface RawAppDetails {
  type?: string
  short_description?: string
  developers?: string[]
  publishers?: string[]
  genres?: { description: string }[]
  categories?: { description: string }[]
  release_date?: { date?: string; coming_soon?: boolean }
  metacritic?: { score?: number }
  header_image?: string
  is_free?: boolean
}

/**
 * One store lookup, with backoff. Returns `null` for an app the store no longer
 * lists — a real answer worth caching, distinct from a failure.
 */
async function fetchAppDetails(appid: number): Promise<SteamAppDetails | null> {
  for (let attempt = 0; attempt < STORE_MAX_RETRIES; attempt++) {
    const res = await fetch(`${STORE_API}/appdetails?appids=${appid}&l=english`)

    if (res.status === 429 || res.status === 403) {
      const backoff = STORE_THROTTLE_MS * Math.pow(4, attempt + 1)
      console.warn(`[steam] rate limited on ${appid}, waiting ${Math.round(backoff / 1000)}s`)
      await sleep(backoff)
      continue
    }
    if (!res.ok) throw new Error(`appdetails ${appid} failed: ${res.status}`)

    const body = (await res.json()) as Record<string, { success: boolean; data?: RawAppDetails }>
    const entry = body[String(appid)]
    if (!entry?.success || !entry.data) return null

    const raw = entry.data
    const date = raw.release_date?.coming_soon ? null : (raw.release_date?.date ?? null)

    return {
      appid,
      type: raw.type ?? 'game',
      shortDescription: raw.short_description ?? '',
      developers: raw.developers ?? [],
      publishers: raw.publishers ?? [],
      genres: (raw.genres ?? []).map((g) => g.description),
      categories: (raw.categories ?? []).map((c) => c.description),
      releaseDate: date,
      releaseYear: releaseYear(date),
      metacritic: raw.metacritic?.score ?? null,
      headerUrl: raw.header_image ?? null,
      isFree: raw.is_free ?? false,
    }
  }

  throw new Error(`appdetails ${appid} still rate limited after ${STORE_MAX_RETRIES} attempts`)
}

/**
 * Fill in store metadata for every played game, reading the on-disk cache first
 * and throttling anything left over.
 */
async function enrich(appids: number[]): Promise<Map<number, SteamAppDetails | null>> {
  const resolved = new Map<number, SteamAppDetails | null>()
  const missing: number[] = []

  for (const appid of appids) {
    const cached = readCachedApp(appid)
    if (cached === undefined) missing.push(appid)
    else resolved.set(appid, cached)
  }

  if (missing.length === 0) {
    console.log(`[steam] ${appids.length} played games, all cached`)
    return resolved
  }

  const eta = Math.ceil((missing.length * STORE_THROTTLE_MS) / 60_000)
  console.log(
    `[steam] ${appids.length} played games, ${missing.length} to fetch from the store (~${eta}m)`
  )

  for (const [i, appid] of missing.entries()) {
    const details = await fetchAppDetails(appid)
    writeCachedApp(appid, details)
    resolved.set(appid, details)
    if ((i + 1) % 25 === 0) console.log(`[steam]   ${i + 1}/${missing.length}`)
    await sleep(STORE_THROTTLE_MS)
  }

  return resolved
}

// --- Orchestrator ---

export async function fetchSteamLibrary(): Promise<SteamLibrary> {
  const [profile, owned] = await Promise.all([fetchProfile(), fetchOwnedGames()])
  console.log(`[steam] ${owned.length} owned apps for ${profile.personaName}`)

  const played = owned
    .filter((g) => (g.playtime_forever ?? 0) > 0)
    .map((g) => g.appid)
    .sort((a, b) => a - b)

  const details = await enrich(played)

  const games: SteamGame[] = owned
    .map((g) => ({
      appid: g.appid,
      name: g.name ?? `App ${g.appid}`,
      playtimeMinutes: g.playtime_forever ?? 0,
      playtimeRecentMinutes: g.playtime_2weeks ?? 0,
      lastPlayed: g.rtime_last_played
        ? new Date(g.rtime_last_played * 1000).toISOString().slice(0, 10)
        : null,
      iconUrl: iconUrl(g.appid, g.img_icon_url),
      storeUrl: `https://store.steampowered.com/app/${g.appid}/`,
      details: details.get(g.appid) ?? null,
    }))
    .sort((a, b) => b.playtimeMinutes - a.playtimeMinutes || a.name.localeCompare(b.name))

  return {
    profile,
    fetchedAt: new Date().toISOString(),
    games,
    unresolved: played.filter((appid) => details.get(appid) === null),
  }
}
