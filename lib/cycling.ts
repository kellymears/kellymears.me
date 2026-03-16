import { readFileSync } from 'fs'
import { join } from 'path'

const METERS_TO_MILES = 0.000621371
const METERS_TO_FEET = 3.28084
const MPS_TO_MPH = 2.23694

export interface NormalizedActivity {
  id: string
  source: string
  sportType: string
  startTime: string
  name: string
  distance: number // meters
  movingTime: number // seconds
  elapsedTime: number // seconds
  elevationGain: number // meters
  avgSpeed: number // m/s
  maxSpeed: number // m/s
  avgHeartRate: number | null
  maxHeartRate: number | null
  avgPower: number | null
  maxPower: number | null
  calories: number | null
  terrain: { road: number; pavedPath: number; unpaved: number } | null
  routePreview: string | null
}

export interface RideStats {
  totalMiles: number
  totalRides: number
  totalElevation: number
  totalHours: number
  biggestRide: number
  biggestClimb: number
}

export interface PeriodStats {
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

export interface RideTerrain {
  road: number
  pavedPath: number
  unpaved: number
}

export interface RecentRide {
  id: string
  name: string
  date: string
  distance: string
  duration: string
  elevation: string
  speed: string
  heartrate: string | null
  watts: string | null
  sportType: string
  terrain: RideTerrain | null
  routePath: string | null
}

export interface TerrainCategory {
  name: string
  key: string
  miles: number
  percentage: number
  color: string
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

export interface CyclingPageData {
  athlete: { firstname: string; lastname: string; username: string; city: string }
  rideStats: RideStats
  ytdStats: PeriodStats
  recentStats: PeriodStats
  weeklyMileage: WeeklyMileage[]
  recentRides: RecentRide[]
  terrainCategories: TerrainCategory[]
  powerStats: PowerStats | null
  heartRateStats: HeartRateStats | null
  totalEnergyKJ: number
}

const RIDE_SPORT_TYPES = new Set([
  'Ride',
  'GravelRide',
  'MountainBikeRide',
  'VirtualRide',
  'EBikeRide',
])

import {
  TERRAIN_COLORS,
  TERRAIN_LABELS,
  RIDE_TYPE_LABELS,
  RIDE_TYPE_COLORS,
} from './cycling-constants'

export {
  TERRAIN_COLORS,
  TERRAIN_LABELS,
  RIDE_TYPE_LABELS,
  RIDE_TYPE_SHORT_LABELS,
  RIDE_TYPE_ACCENT,
  RIDE_TYPE_COLORS,
} from './cycling-constants'

// --- Static athlete config ---

const ATHLETE = {
  firstname: 'Kelly',
  lastname: 'Mears',
  username: 'mears_kelly',
  city: 'Winston-Salem',
}

// --- Helpers ---

function isRide(activity: NormalizedActivity): boolean {
  return RIDE_SPORT_TYPES.has(activity.sportType)
}

function formatDuration(seconds: number): string {
  const hrs = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  if (hrs === 0) return `${mins}m`
  return `${hrs}h ${mins}m`
}

function getWeekStart(dateStr: string): string {
  const date = new Date(dateStr)
  const day = date.getUTCDay()
  const diff = day === 0 ? 6 : day - 1
  date.setUTCDate(date.getUTCDate() - diff)
  return date.toISOString().slice(0, 10)
}

function sumMetrics(rides: NormalizedActivity[]) {
  let distance = 0
  let time = 0
  let elevation = 0
  for (const a of rides) {
    distance += a.distance
    time += a.movingTime
    elevation += a.elevationGain
  }
  return { distance, time, elevation }
}

function computeRideStats(rides: NormalizedActivity[]): RideStats {
  const { distance, time, elevation } = sumMetrics(rides)

  let biggestDist = 0
  let biggestClimb = 0
  for (const a of rides) {
    if (a.distance > biggestDist) biggestDist = a.distance
    if (a.elevationGain > biggestClimb) biggestClimb = a.elevationGain
  }

  return {
    totalMiles: Math.round(distance * METERS_TO_MILES),
    totalRides: rides.length,
    totalElevation: Math.round(elevation * METERS_TO_FEET),
    totalHours: Math.round(time / 3600),
    biggestRide: Math.round(biggestDist * METERS_TO_MILES * 10) / 10,
    biggestClimb: Math.round(biggestClimb * METERS_TO_FEET),
  }
}

function computePeriodStats(rides: NormalizedActivity[], cutoff?: string): PeriodStats {
  const filtered = cutoff ? rides.filter((a) => a.startTime >= cutoff) : rides
  const { distance, time, elevation } = sumMetrics(filtered)

  return {
    miles: Math.round(distance * METERS_TO_MILES),
    rides: filtered.length,
    elevation: Math.round(elevation * METERS_TO_FEET),
    hours: Math.round((time / 3600) * 10) / 10,
  }
}

function computeWeeklyMileage(rides: NormalizedActivity[]): WeeklyMileage[] {
  const weekMap = new Map<string, WeeklyMileage>()

  for (const ride of rides) {
    const weekStart = getWeekStart(ride.startTime)
    const existing = weekMap.get(weekStart)
    if (existing) {
      existing.distance += ride.distance * METERS_TO_MILES
      existing.rides += 1
      existing.elevation += ride.elevationGain * METERS_TO_FEET
    } else {
      weekMap.set(weekStart, {
        weekStart,
        distance: ride.distance * METERS_TO_MILES,
        rides: 1,
        elevation: ride.elevationGain * METERS_TO_FEET,
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

function computeRecentRides(rides: NormalizedActivity[]): RecentRide[] {
  return [...rides]
    .sort((a, b) => b.startTime.localeCompare(a.startTime))
    .slice(0, 30)
    .map((a) => ({
      id: a.id,
      name: a.name,
      date: new Date(a.startTime).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      distance: `${(a.distance * METERS_TO_MILES).toFixed(1)} mi`,
      duration: formatDuration(a.movingTime),
      elevation: `${Math.round(a.elevationGain * METERS_TO_FEET).toLocaleString()} ft`,
      speed: `${(a.avgSpeed * MPS_TO_MPH).toFixed(1)} mph`,
      heartrate: a.avgHeartRate ? `${Math.round(a.avgHeartRate)} bpm` : null,
      watts: a.avgPower ? `${Math.round(a.avgPower)}W` : null,
      sportType: a.sportType,
      terrain: a.terrain
        ? {
            road: Math.round(a.terrain.road * METERS_TO_MILES * 10) / 10,
            pavedPath: Math.round(a.terrain.pavedPath * METERS_TO_MILES * 10) / 10,
            unpaved: Math.round(a.terrain.unpaved * METERS_TO_MILES * 10) / 10,
          }
        : null,
      routePath: a.routePreview,
    }))
}

function computeRideCategories(rides: NormalizedActivity[]): RideCategory[] {
  const counts = new Map<string, number>()

  for (const ride of rides) {
    counts.set(ride.sportType, (counts.get(ride.sportType) ?? 0) + 1)
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

function computeTerrainCategories(rides: NormalizedActivity[]): TerrainCategory[] {
  const totals = { road: 0, pavedPath: 0, unpaved: 0 }

  for (const ride of rides) {
    if (!ride.terrain) continue
    totals.road += ride.terrain.road
    totals.pavedPath += ride.terrain.pavedPath
    totals.unpaved += ride.terrain.unpaved
  }

  const totalMeters = totals.road + totals.pavedPath + totals.unpaved
  if (totalMeters === 0) return []

  return (['road', 'pavedPath', 'unpaved'] as const)
    .map((key) => ({
      name: TERRAIN_LABELS[key] ?? key,
      key,
      miles: Math.round(totals[key] * METERS_TO_MILES),
      percentage: Math.round((totals[key] / totalMeters) * 1000) / 10,
      color: TERRAIN_COLORS[key] ?? '#8b8b8b',
    }))
    .filter((c) => c.miles > 0)
}

function computePowerStats(rides: NormalizedActivity[]): PowerStats | null {
  const ridesWithPower = rides.filter((a) => a.avgPower)
  if (ridesWithPower.length < 3) return null

  const avgWatts = Math.round(
    ridesWithPower.reduce((sum, a) => sum + (a.avgPower ?? 0), 0) / ridesWithPower.length
  )
  const maxWatts = Math.max(...ridesWithPower.map((a) => a.maxPower ?? a.avgPower ?? 0))

  // Estimate kJ from power × time (P*t/1000)
  const totalKJ = Math.round(
    ridesWithPower.reduce((sum, a) => sum + ((a.avgPower ?? 0) * a.movingTime) / 1000, 0)
  )

  return { avgWatts, maxWatts, totalKJ, ridesWithPower: ridesWithPower.length }
}

function computeHeartRateStats(rides: NormalizedActivity[]): HeartRateStats | null {
  const ridesWithHR = rides.filter((a) => a.avgHeartRate)
  if (ridesWithHR.length < 3) return null

  const avgHR = Math.round(
    ridesWithHR.reduce((sum, a) => sum + (a.avgHeartRate ?? 0), 0) / ridesWithHR.length
  )
  const maxHR = Math.max(...ridesWithHR.map((a) => a.maxHeartRate ?? 0))

  return { avgHR, maxHR, ridesWithHR: ridesWithHR.length }
}

function computeTotalEnergy(rides: NormalizedActivity[]): number {
  let kj = 0
  for (const ride of rides) {
    if (ride.avgPower != null && ride.avgPower > 0 && ride.movingTime > 0) {
      kj += (ride.avgPower * ride.movingTime) / 1000
    } else if (ride.calories != null && ride.calories > 0) {
      // kJ ≈ kcal for cycling: ~25% human efficiency × 4.184 kJ/kcal ≈ 1.046
      kj += ride.calories
    }
  }
  return Math.round(kj)
}

// --- Data loading ---

let cachedData: CyclingPageData | null = null

function loadActivities(): NormalizedActivity[] {
  const filePath = join(process.cwd(), 'public', 'static', 'data', 'activities-metrics.json')
  try {
    const raw = readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as NormalizedActivity[]
  } catch {
    return []
  }
}

// --- Orchestrator ---

export function getCyclingPageData(): CyclingPageData {
  if (cachedData) return cachedData

  const rides = loadActivities().filter(isRide)

  const now = new Date()
  const ytdCutoff = `${now.getFullYear()}-01-01T00:00:00`
  const recentCutoff = new Date(now)
  recentCutoff.setDate(recentCutoff.getDate() - 28)

  cachedData = {
    athlete: ATHLETE,
    rideStats: computeRideStats(rides),
    ytdStats: computePeriodStats(rides, ytdCutoff),
    recentStats: computePeriodStats(rides, recentCutoff.toISOString()),
    weeklyMileage: computeWeeklyMileage(rides),
    recentRides: computeRecentRides(rides),
    terrainCategories: computeTerrainCategories(rides),
    powerStats: computePowerStats(rides),
    heartRateStats: computeHeartRateStats(rides),
    totalEnergyKJ: computeTotalEnergy(rides),
  }

  return cachedData
}
