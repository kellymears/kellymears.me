const STRAVA_API = 'https://www.strava.com/api/v3'
const STRAVA_TOKEN_URL = 'https://www.strava.com/oauth/token'
const REVALIDATE = { next: { revalidate: 3600 } } as RequestInit

const METERS_TO_MILES = 0.000621371
const METERS_TO_FEET = 3.28084
const MPS_TO_MPH = 2.23694

// --- Types ---

interface StravaTokenResponse {
  access_token: string
  expires_at: number
  refresh_token: string
  token_type: string
}

export interface StravaAthlete {
  id: number
  firstname: string
  lastname: string
  city: string | null
  state: string | null
  profile: string
  username: string | null
}

interface ActivityTotal {
  count: number
  distance: number
  moving_time: number
  elapsed_time: number
  elevation_gain: number
  achievement_count?: number
}

interface StravaStats {
  biggest_ride_distance: number
  biggest_climb_elevation_gain: number
  all_ride_totals: ActivityTotal
  ytd_ride_totals: ActivityTotal
  recent_ride_totals: ActivityTotal
}

export interface StravaActivity {
  id: number
  name: string
  distance: number
  moving_time: number
  elapsed_time: number
  total_elevation_gain: number
  sport_type: string
  start_date_local: string
  average_speed: number
  max_speed: number
  average_heartrate?: number
  max_heartrate?: number
  average_watts?: number
  weighted_average_watts?: number
  max_watts?: number
  kilojoules?: number
  kudos_count: number
  pr_count: number
  visibility: string
  has_heartrate: boolean
  device_watts?: boolean
}

export interface RideStats {
  totalMiles: number
  totalRides: number
  totalElevation: number
  totalHours: number
  biggestRide: number
  biggestClimb: number
}

export interface YTDStats {
  miles: number
  rides: number
  elevation: number
  hours: number
}

export interface RecentStats {
  miles: number
  rides: number
  elevation: number
  hours: number
}

export interface WeeklyMileage {
  weekStart: string
  distance: number
  rides: number
  elevation: number
}

export interface RideCategory {
  name: string
  sportType: string
  count: number
  percentage: number
  color: string
}

export interface RecentRide {
  id: number
  name: string
  date: string
  distance: string
  duration: string
  elevation: string
  speed: string
  heartrate: string | null
  watts: string | null
  kudos: number
  prs: number
  sportType: string
}

export interface PowerStats {
  avgWatts: number
  maxWatts: number
  totalKJ: number
  ridesWithPower: number
}

export interface HeartRateStats {
  avgHR: number
  maxHR: number
  ridesWithHR: number
}

export interface StravaPageData {
  athlete: StravaAthlete
  rideStats: RideStats
  ytdStats: YTDStats
  recentStats: RecentStats
  weeklyMileage: WeeklyMileage[]
  recentRides: RecentRide[]
  rideCategories: RideCategory[]
  powerStats: PowerStats | null
  heartRateStats: HeartRateStats | null
}

// --- Ride type config ---

const RIDE_SPORT_TYPES = new Set([
  'Ride',
  'GravelRide',
  'MountainBikeRide',
  'VirtualRide',
  'EBikeRide',
])

const RIDE_TYPE_LABELS: Record<string, string> = {
  Ride: 'Road',
  GravelRide: 'Gravel',
  MountainBikeRide: 'Mountain',
  VirtualRide: 'Virtual',
  EBikeRide: 'E-Bike',
}

const RIDE_TYPE_COLORS: Record<string, string> = {
  Ride: '#3178c6',
  GravelRide: '#8b6914',
  MountainBikeRide: '#2d8b46',
  VirtualRide: '#9333ea',
  EBikeRide: '#06b6d4',
}

// --- Helpers ---

function isRide(activity: StravaActivity): boolean {
  return RIDE_SPORT_TYPES.has(activity.sport_type)
}

export function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  if (hrs === 0) return `${mins}m`
  return `${hrs}h ${mins}m`
}

function getWeekStart(dateStr: string): string {
  const date = new Date(dateStr)
  const day = date.getDay()
  const diff = day === 0 ? 6 : day - 1
  date.setDate(date.getDate() - diff)
  return date.toISOString().slice(0, 10)
}

// --- Token management ---

let tokenCache: { accessToken: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  const clientId = process.env.STRAVA_CLIENT_ID
  const clientSecret = process.env.STRAVA_CLIENT_SECRET
  const refreshToken = process.env.STRAVA_REFRESH_TOKEN

  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error('Strava env vars not configured')
  }

  if (tokenCache && tokenCache.expiresAt > Date.now() / 1000 + 60) {
    return tokenCache.accessToken
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

  if (!res.ok) throw new Error(`Token refresh failed: ${res.status}`)

  const data: StravaTokenResponse = await res.json()
  tokenCache = { accessToken: data.access_token, expiresAt: data.expires_at }
  return data.access_token
}

// --- Safe fetch wrapper ---

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (e) {
    console.error('[strava] fetch failed:', e)
    return fallback
  }
}

// --- Fetch functions ---

async function fetchAthlete(token: string): Promise<StravaAthlete> {
  const res = await fetch(`${STRAVA_API}/athlete`, {
    headers: { Authorization: `Bearer ${token}` },
    ...REVALIDATE,
  })
  if (!res.ok) throw new Error(`Athlete fetch failed: ${res.status}`)
  return res.json()
}

async function fetchStats(token: string, athleteId: number): Promise<StravaStats> {
  const res = await fetch(`${STRAVA_API}/athletes/${athleteId}/stats`, {
    headers: { Authorization: `Bearer ${token}` },
    ...REVALIDATE,
  })
  if (!res.ok) throw new Error(`Stats fetch failed: ${res.status}`)
  return res.json()
}

async function fetchActivities(
  token: string,
  page: number = 1,
  perPage: number = 200
): Promise<StravaActivity[]> {
  const res = await fetch(`${STRAVA_API}/athlete/activities?page=${page}&per_page=${perPage}`, {
    headers: { Authorization: `Bearer ${token}` },
    ...REVALIDATE,
  })
  if (!res.ok) throw new Error(`Activities fetch failed: ${res.status}`)
  return res.json()
}

async function fetchAllActivities(token: string): Promise<StravaActivity[]> {
  const all: StravaActivity[] = []
  let page = 1

  while (true) {
    const batch = await fetchActivities(token, page, 200)
    all.push(...batch)
    if (batch.length < 200) break
    page++
  }

  return all
}

// --- Pure computation ---

function computeRideStats(stats: StravaStats): RideStats {
  const totals = stats.all_ride_totals
  return {
    totalMiles: Math.round(totals.distance * METERS_TO_MILES),
    totalRides: totals.count,
    totalElevation: Math.round(totals.elevation_gain * METERS_TO_FEET),
    totalHours: Math.round(totals.moving_time / 3600),
    biggestRide: Math.round(stats.biggest_ride_distance * METERS_TO_MILES * 10) / 10,
    biggestClimb: Math.round(stats.biggest_climb_elevation_gain * METERS_TO_FEET),
  }
}

function computeYTDStats(stats: StravaStats): YTDStats {
  const ytd = stats.ytd_ride_totals
  return {
    miles: Math.round(ytd.distance * METERS_TO_MILES),
    rides: ytd.count,
    elevation: Math.round(ytd.elevation_gain * METERS_TO_FEET),
    hours: Math.round(ytd.moving_time / 3600),
  }
}

function computeRecentStats(stats: StravaStats): RecentStats {
  const recent = stats.recent_ride_totals
  return {
    miles: Math.round(recent.distance * METERS_TO_MILES),
    rides: recent.count,
    elevation: Math.round(recent.elevation_gain * METERS_TO_FEET),
    hours: Math.round((recent.moving_time / 3600) * 10) / 10,
  }
}

function computeWeeklyMileage(activities: StravaActivity[]): WeeklyMileage[] {
  const rides = activities.filter(isRide)
  const weekMap = new Map<string, WeeklyMileage>()

  for (const ride of rides) {
    const weekStart = getWeekStart(ride.start_date_local)
    const existing = weekMap.get(weekStart)
    if (existing) {
      existing.distance += ride.distance * METERS_TO_MILES
      existing.rides += 1
      existing.elevation += ride.total_elevation_gain * METERS_TO_FEET
    } else {
      weekMap.set(weekStart, {
        weekStart,
        distance: ride.distance * METERS_TO_MILES,
        rides: 1,
        elevation: ride.total_elevation_gain * METERS_TO_FEET,
      })
    }
  }

  const now = new Date()
  const cutoff = new Date(now)
  cutoff.setDate(cutoff.getDate() - 26 * 7)
  const cutoffStr = cutoff.toISOString().slice(0, 10)

  return [...weekMap.entries()]
    .filter(([key]) => key >= cutoffStr)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([, value]) => ({
      ...value,
      distance: Math.round(value.distance * 10) / 10,
      elevation: Math.round(value.elevation),
    }))
}

function computeRecentRides(activities: StravaActivity[]): RecentRide[] {
  return activities
    .filter((a) => isRide(a) && a.visibility === 'everyone')
    .slice(0, 10)
    .map((a) => ({
      id: a.id,
      name: a.name,
      date: new Date(a.start_date_local).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      distance: `${(a.distance * METERS_TO_MILES).toFixed(1)} mi`,
      duration: formatDuration(a.moving_time),
      elevation: `${Math.round(a.total_elevation_gain * METERS_TO_FEET).toLocaleString()} ft`,
      speed: `${(a.average_speed * MPS_TO_MPH).toFixed(1)} mph`,
      heartrate: a.average_heartrate ? `${Math.round(a.average_heartrate)} bpm` : null,
      watts: a.average_watts ? `${Math.round(a.average_watts)}W` : null,
      kudos: a.kudos_count,
      prs: a.pr_count,
      sportType: a.sport_type,
    }))
}

function computeRideCategories(activities: StravaActivity[]): RideCategory[] {
  const rides = activities.filter(isRide)
  const counts = new Map<string, number>()

  for (const ride of rides) {
    counts.set(ride.sport_type, (counts.get(ride.sport_type) ?? 0) + 1)
  }

  const total = rides.length
  if (total === 0) return []

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([sportType, count]) => ({
      name: RIDE_TYPE_LABELS[sportType] ?? sportType,
      sportType,
      count,
      percentage: Math.round((count / total) * 1000) / 10,
      color: RIDE_TYPE_COLORS[sportType] ?? '#8b8b8b',
    }))
}

function computePowerStats(activities: StravaActivity[]): PowerStats | null {
  const ridesWithPower = activities.filter((a) => isRide(a) && a.average_watts)
  if (ridesWithPower.length < 3) return null

  const avgWatts = Math.round(
    ridesWithPower.reduce((sum, a) => sum + (a.average_watts ?? 0), 0) / ridesWithPower.length
  )
  const maxWatts = Math.max(...ridesWithPower.map((a) => a.max_watts ?? a.average_watts ?? 0))
  const totalKJ = Math.round(ridesWithPower.reduce((sum, a) => sum + (a.kilojoules ?? 0), 0))

  return { avgWatts, maxWatts, totalKJ, ridesWithPower: ridesWithPower.length }
}

function computeHeartRateStats(activities: StravaActivity[]): HeartRateStats | null {
  const ridesWithHR = activities.filter((a) => isRide(a) && a.has_heartrate)
  if (ridesWithHR.length < 3) return null

  const avgHR = Math.round(
    ridesWithHR.reduce((sum, a) => sum + (a.average_heartrate ?? 0), 0) / ridesWithHR.length
  )
  const maxHR = Math.max(...ridesWithHR.map((a) => a.max_heartrate ?? 0))

  return { avgHR, maxHR, ridesWithHR: ridesWithHR.length }
}

// --- Fallback data ---

const FALLBACK_ATHLETE: StravaAthlete = {
  id: 0,
  firstname: 'Kelly',
  lastname: 'Mears',
  city: null,
  state: null,
  profile: '',
  username: null,
}

const FALLBACK_STATS: StravaStats = {
  biggest_ride_distance: 0,
  biggest_climb_elevation_gain: 0,
  all_ride_totals: { count: 0, distance: 0, moving_time: 0, elapsed_time: 0, elevation_gain: 0 },
  ytd_ride_totals: { count: 0, distance: 0, moving_time: 0, elapsed_time: 0, elevation_gain: 0 },
  recent_ride_totals: {
    count: 0,
    distance: 0,
    moving_time: 0,
    elapsed_time: 0,
    elevation_gain: 0,
  },
}

// --- Orchestrator ---

export async function fetchAllStravaData(): Promise<StravaPageData> {
  const token = await safeFetch(getAccessToken, '')
  if (!token) {
    const stats = computeRideStats(FALLBACK_STATS)
    return {
      athlete: FALLBACK_ATHLETE,
      rideStats: stats,
      ytdStats: computeYTDStats(FALLBACK_STATS),
      recentStats: computeRecentStats(FALLBACK_STATS),
      weeklyMileage: [],
      recentRides: [],
      rideCategories: [],
      powerStats: null,
      heartRateStats: null,
    }
  }

  const [athlete, activities] = await Promise.all([
    safeFetch(() => fetchAthlete(token), FALLBACK_ATHLETE),
    safeFetch(() => fetchAllActivities(token), []),
  ])

  const stravaStats = await safeFetch(() => fetchStats(token, athlete.id), FALLBACK_STATS)

  const rideStats = computeRideStats(stravaStats)
  const ytdStats = computeYTDStats(stravaStats)
  const recentStats = computeRecentStats(stravaStats)
  const weeklyMileage = computeWeeklyMileage(activities)
  const recentRides = computeRecentRides(activities)
  const rideCategories = computeRideCategories(activities)
  const powerStats = computePowerStats(activities)
  const heartRateStats = computeHeartRateStats(activities)

  return {
    athlete,
    rideStats,
    ytdStats,
    recentStats,
    weeklyMileage,
    recentRides,
    rideCategories,
    powerStats,
    heartRateStats,
  }
}
