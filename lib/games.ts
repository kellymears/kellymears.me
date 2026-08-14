/**
 * Games page data layer.
 *
 * Reads the cached Steam import and derives everything the page renders.
 * Module-level cached, in the shape of `lib/cycling.ts` — the raw JSON stays a
 * faithful record of what Steam returned, and every editorial decision (what
 * counts as a game, what counts as loved) happens here where it is one line to
 * change rather than a re-import.
 */

import { readFileSync } from 'fs'
import { join } from 'path'
import { LOVED, NOT_A_GAME } from '@/data/games'
import type { SteamGame, SteamLibrary, SteamProfile } from './steam'

/**
 * Steam's `type` for a counted app. `mod` earns its place — a total-conversion
 * campaign is a game by any measure that matters. Everything else Steam types
 * (`dlc`, `demo`, `music`, `video`, `series`) is out.
 */
const COUNTED_TYPES = new Set(['game', 'mod'])

/**
 * Steam sells creative tools through the games storefront and types them
 * `game`, so type alone does not separate playing from making. Genre does:
 * nothing that is actually a game carries these, and a tool almost always
 * carries at least one. Anything caught here is excluded outright rather than
 * ranked, because a tool with hundreds of hours otherwise buries the library.
 */
const TOOL_GENRES = new Set([
  'Animation & Modeling',
  'Audio Production',
  'Design & Illustration',
  'Education',
  'Game Development',
  'Photo Editing',
  'Software Training',
  'Utilities',
  'Video Production',
  'Web Publishing',
])

/** Games below this get no page real estate; a launch and a refund is not play. */
const MIN_MEANINGFUL_MINUTES = 30

// --- Types ---

export interface GameSummary {
  appid: number
  name: string
  hours: number
  recentHours: number
  lastPlayed: string | null
  headerUrl: string | null
  storeUrl: string
  genres: string[]
  developers: string[]
  releaseYear: number | null
  metacritic: number | null
  shortDescription: string
  /** Present when the appid appears in the hand-curated list. */
  note: string | null
  loved: boolean
}

export interface GenreSlice {
  genre: string
  games: number
  hours: number
  /** Share of total counted hours, 0–1. */
  share: number
}

export interface YearBucket {
  year: number
  games: number
  hours: number
}

export interface GameStats {
  /** Owned apps of type `game`, played or not. */
  owned: number
  /** Counted games with any recorded playtime. */
  played: number
  /** Counted games owned but never launched. */
  unplayed: number
  hours: number
  days: number
  /** Hours in the game at the top of the list. */
  deepestHours: number
  /** Median hours across played games — the honest middle of the library. */
  medianHours: number
  /** Games past 100 hours. */
  centurions: number
}

export interface GamesPageData {
  profile: SteamProfile
  fetchedAt: string
  stats: GameStats
  /** Hand-curated when `data/games.ts` is populated, top-by-hours until then. */
  featured: GameSummary[]
  /** Whether `featured` reflects editorial choice or the hours fallback. */
  featuredIsCurated: boolean
  topByHours: GameSummary[]
  recent: GameSummary[]
  genres: GenreSlice[]
  byYear: YearBucket[]
  /** Played apps the store no longer lists, so their type is unknown. */
  delisted: GameSummary[]
}

// --- Data loading ---

let cachedLibrary: SteamLibrary | null = null
let cachedPageData: GamesPageData | null = null

function loadLibrary(): SteamLibrary | null {
  if (cachedLibrary) return cachedLibrary
  const filePath = join(process.cwd(), 'public', 'static', 'data', 'steam.json')
  try {
    cachedLibrary = JSON.parse(readFileSync(filePath, 'utf-8')) as SteamLibrary
  } catch {
    return null
  }
  return cachedLibrary
}

// --- Derivation ---

const lovedByAppid = new Map(LOVED.map((entry) => [entry.appid, entry]))
const excluded = new Set(NOT_A_GAME)

/**
 * A delisted app has no store record — no type and no genres, so neither rule
 * above can see it. Treating it as a game is the right default, since a game
 * pulled from sale is still a game, which leaves `NOT_A_GAME` to catch the
 * delisted tools by hand.
 */
export function isCountedGame(game: SteamGame): boolean {
  if (excluded.has(game.appid)) return false
  if (!game.details) return true
  if (!COUNTED_TYPES.has(game.details.type)) return false
  return !game.details.genres.some((genre) => TOOL_GENRES.has(genre))
}

function toSummary(game: SteamGame): GameSummary {
  const curated = lovedByAppid.get(game.appid)
  return {
    appid: game.appid,
    name: game.name,
    hours: Math.round(game.playtimeMinutes / 60),
    recentHours: Math.round((game.playtimeRecentMinutes / 60) * 10) / 10,
    lastPlayed: game.lastPlayed,
    headerUrl: game.details?.headerUrl ?? null,
    storeUrl: game.storeUrl,
    genres: game.details?.genres ?? [],
    developers: game.details?.developers ?? [],
    releaseYear: game.details?.releaseYear ?? null,
    metacritic: game.details?.metacritic ?? null,
    shortDescription: game.details?.shortDescription ?? '',
    note: curated?.note ?? null,
    loved: curated !== undefined,
  }
}

function median(values: number[]): number {
  if (values.length === 0) return 0
  const sorted = [...values].sort((a, b) => a - b)
  const mid = Math.floor(sorted.length / 2)
  const high = sorted[mid] ?? 0
  if (sorted.length % 2 !== 0) return high
  return Math.round(((sorted[mid - 1] ?? 0) + high) / 2)
}

function computeGenres(played: GameSummary[], totalHours: number): GenreSlice[] {
  const byGenre = new Map<string, { games: number; hours: number }>()

  for (const game of played) {
    for (const genre of game.genres) {
      const slice = byGenre.get(genre) ?? { games: 0, hours: 0 }
      slice.games += 1
      slice.hours += game.hours
      byGenre.set(genre, slice)
    }
  }

  return [...byGenre.entries()]
    .map(([genre, slice]) => ({
      genre,
      games: slice.games,
      hours: slice.hours,
      share: totalHours > 0 ? slice.hours / totalHours : 0,
    }))
    .sort((a, b) => b.hours - a.hours || a.genre.localeCompare(b.genre))
}

function computeByYear(played: GameSummary[]): YearBucket[] {
  const byYear = new Map<number, { games: number; hours: number }>()

  for (const game of played) {
    if (game.releaseYear === null) continue
    const bucket = byYear.get(game.releaseYear) ?? { games: 0, hours: 0 }
    bucket.games += 1
    bucket.hours += game.hours
    byYear.set(game.releaseYear, bucket)
  }

  return [...byYear.entries()]
    .map(([year, bucket]) => ({ year, ...bucket }))
    .sort((a, b) => a.year - b.year)
}

// --- Orchestrator ---

export function getGamesPageData(): GamesPageData | null {
  if (cachedPageData) return cachedPageData

  const library = loadLibrary()
  if (!library) return null

  const counted = library.games.filter(isCountedGame)
  const played = counted
    .filter((g) => g.playtimeMinutes >= MIN_MEANINGFUL_MINUTES)
    .map(toSummary)
    .sort((a, b) => b.hours - a.hours || a.name.localeCompare(b.name))

  const totalHours = played.reduce((sum, g) => sum + g.hours, 0)

  const stats: GameStats = {
    owned: counted.length,
    played: played.length,
    unplayed: counted.filter((g) => g.playtimeMinutes === 0).length,
    hours: totalHours,
    days: Math.round(totalHours / 24),
    deepestHours: played[0]?.hours ?? 0,
    medianHours: median(played.map((g) => g.hours)),
    centurions: played.filter((g) => g.hours >= 100).length,
  }

  const curated = played.filter((g) => g.loved)
  // Keep the curated order from data/games.ts — it is a ranking, not a set.
  const featured =
    curated.length > 0
      ? LOVED.map((entry) => curated.find((g) => g.appid === entry.appid)).filter(
          (g): g is GameSummary => g !== undefined
        )
      : played.slice(0, 12)

  cachedPageData = {
    profile: library.profile,
    fetchedAt: library.fetchedAt,
    stats,
    featured,
    featuredIsCurated: curated.length > 0,
    topByHours: played.slice(0, 50),
    recent: played
      .filter((g) => g.recentHours > 0)
      .sort((a, b) => b.recentHours - a.recentHours)
      .slice(0, 8),
    genres: computeGenres(played, totalHours),
    byYear: computeByYear(played),
    delisted: played.filter((g) => g.headerUrl === null && g.shortDescription === ''),
  }

  return cachedPageData
}
