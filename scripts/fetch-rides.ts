import { config } from 'dotenv'
import { writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'
import polyline from '@mapbox/polyline'
import type { RidesData, RideBounds } from '../lib/rides'

config({ path: join(process.cwd(), '.env.local') })

const STRAVA_API = 'https://www.strava.com/api/v3'
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token'

const RIDE_SPORT_TYPES = new Set(['Ride', 'GravelRide', 'MountainBikeRide', 'EBikeRide'])

interface StravaTokenResponse {
  access_token: string
  expires_at: number
}

interface StravaActivityRaw {
  id: number
  sport_type: string
  start_date_local: string
  map?: { summary_polyline?: string }
}

const EMPTY_DATA: RidesData = {
  generatedAt: new Date().toISOString(),
  totalRides: 0,
  bounds: { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 },
  rides: [],
}

async function refreshToken(): Promise<string> {
  const clientId = process.env.STRAVA_CLIENT_ID
  const clientSecret = process.env.STRAVA_CLIENT_SECRET
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Missing STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, or STRAVA_REFRESH_TOKEN')
  }

  const res = await fetch(STRAVA_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
      grant_type: 'refresh_token',
    }),
  })

  if (!res.ok) throw new Error(`Token refresh failed: ${res.status} ${await res.text()}`)

  const data: StravaTokenResponse = await res.json()
  return data.access_token
}

async function fetchAllActivities(token: string): Promise<StravaActivityRaw[]> {
  const all: StravaActivityRaw[] = []
  let page = 1

  while (true) {
    console.log(`  Fetching activities page ${page}...`)
    const res = await fetch(`${STRAVA_API}/athlete/activities?page=${page}&per_page=200`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) throw new Error(`Activities fetch failed: ${res.status}`)

    const batch: StravaActivityRaw[] = await res.json()
    all.push(...batch)
    if (batch.length < 200) break
    page++
  }

  return all
}

function computeBounds(rides: RidesData['rides']): RideBounds {
  let minLat = Infinity
  let maxLat = -Infinity
  let minLng = Infinity
  let maxLng = -Infinity

  for (const ride of rides) {
    for (const [lat, lng] of ride.coordinates) {
      if (lat < minLat) minLat = lat
      if (lat > maxLat) maxLat = lat
      if (lng < minLng) minLng = lng
      if (lng > maxLng) maxLng = lng
    }
  }

  return { minLat, maxLat, minLng, maxLng }
}

async function main() {
  const outDir = join(process.cwd(), 'data', 'cycling')
  const outPath = join(outDir, 'rides.json')
  mkdirSync(outDir, { recursive: true })

  console.log('[fetch-rides] Starting...')

  let token: string
  try {
    token = await refreshToken()
    console.log('[fetch-rides] Token refreshed')
  } catch (e) {
    console.warn('[fetch-rides] Token refresh failed:', e)
    console.warn('[fetch-rides] Writing empty data file')
    writeFileSync(outPath, JSON.stringify(EMPTY_DATA, null, 2))
    return
  }

  let activities: StravaActivityRaw[]
  try {
    activities = await fetchAllActivities(token)
    console.log(`[fetch-rides] Fetched ${activities.length} total activities`)
  } catch (e) {
    console.warn('[fetch-rides] Activity fetch failed:', e)
    console.warn('[fetch-rides] Writing empty data file')
    writeFileSync(outPath, JSON.stringify(EMPTY_DATA, null, 2))
    return
  }

  const rides = activities
    .filter((a) => RIDE_SPORT_TYPES.has(a.sport_type) && a.map?.summary_polyline)
    .map((a) => ({
      id: a.id,
      sportType: a.sport_type,
      date: a.start_date_local,
      coordinates: polyline.decode(a.map!.summary_polyline!) as [number, number][],
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  console.log(`[fetch-rides] ${rides.length} rides with polyline data (virtual rides excluded)`)

  const bounds = rides.length > 0 ? computeBounds(rides) : EMPTY_DATA.bounds

  const data: RidesData = {
    generatedAt: new Date().toISOString(),
    totalRides: rides.length,
    bounds,
    rides,
  }

  writeFileSync(outPath, JSON.stringify(data))
  const sizeMB = (Buffer.byteLength(JSON.stringify(data)) / 1024 / 1024).toFixed(2)
  console.log(`[fetch-rides] Wrote ${outPath} (${sizeMB} MB, ${rides.length} rides)`)
}

main().catch((e) => {
  console.error('[fetch-rides] Fatal error:', e)
  process.exit(1)
})
