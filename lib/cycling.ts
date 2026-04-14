import { readFileSync } from 'fs'
import { join } from 'path'
import { sumBy, maxBy, groupBy, countBy } from './fn'

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
  avgCadence: number | null
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
  avgWeeklyMiles: number
  bestWeekMiles: number
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

export interface RideRaw {
  distance: number
  movingTime: number
  elevation: number
  speed: number
  heartRate: number | null
  power: number | null
  cadence: number | null
  calories: number | null
}

export interface PeriodAverages {
  d30: number | null
  d90: number | null
  year: number | null
}

export interface RideBenchmarks {
  distance: PeriodAverages
  elevation: PeriodAverages
  speed: PeriodAverages
  movingTime: PeriodAverages
  heartRate: PeriodAverages | null
  power: PeriodAverages | null
  cadence: PeriodAverages | null
}

export interface RideHistory {
  distances: number[]
  speeds: number[]
  elevations: number[]
  cadences: number[]
}

export interface RecentRide {
  id: string
  name: string
  date: string
  distance: string
  duration: string
  elapsedTime: string
  elevation: string
  speed: string
  maxSpeed: string | null
  heartrate: string | null
  maxHeartrate: string | null
  watts: string | null
  maxWatts: string | null
  calories: string | null
  source: string
  sportType: string
  terrain: RideTerrain | null
  routePath: string | null
  raw: RideRaw
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
  rideBenchmarks: RideBenchmarks
  rideHistory: RideHistory
  virtualBenchmarks: RideBenchmarks
  virtualHistory: RideHistory
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

function isVirtualRide(activity: NormalizedActivity): boolean {
  return activity.sportType === 'VirtualRide'
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
  return {
    distance: sumBy(rides, (a) => a.distance),
    time: sumBy(rides, (a) => a.movingTime),
    elevation: sumBy(rides, (a) => a.elevationGain),
  }
}

function computeRideStats(rides: NormalizedActivity[]): RideStats {
  const { distance, time, elevation } = sumMetrics(rides)

  const biggestDist = maxBy(rides, (a) => a.distance)
  const biggestClimb = maxBy(rides, (a) => a.elevationGain)

  // All-time weekly stats (not limited to chart's 26-week window)
  const weekGroups = groupBy(rides, (r) => getWeekStart(r.startTime))
  const weekDistances = [...weekGroups.values()].map(
    (weekRides) => Math.round(sumBy(weekRides, (r) => r.distance * METERS_TO_MILES) * 10) / 10
  )
  const weeksWithRides = weekDistances.filter((d) => d > 0)
  const avgWeeklyMiles =
    weeksWithRides.length > 0
      ? Math.round(weeksWithRides.reduce((a, b) => a + b, 0) / weeksWithRides.length)
      : 0
  const bestWeekMiles = weekDistances.length > 0 ? Math.round(Math.max(...weekDistances)) : 0

  return {
    totalMiles: Math.round(distance * METERS_TO_MILES),
    totalRides: rides.length,
    totalElevation: Math.round(elevation * METERS_TO_FEET),
    totalHours: Math.round(time / 3600),
    biggestRide: Math.round(biggestDist * METERS_TO_MILES * 10) / 10,
    biggestClimb: Math.round(biggestClimb * METERS_TO_FEET),
    avgWeeklyMiles,
    bestWeekMiles,
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
  const groups = groupBy(rides, (r) => getWeekStart(r.startTime))

  const now = new Date()
  const cutoff = new Date(now)
  cutoff.setDate(cutoff.getDate() - 26 * 7)
  const cutoffStr = cutoff.toISOString().slice(0, 10)

  return [...groups.entries()]
    .filter(([key]) => key >= cutoffStr)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([weekStart, weekRides]) => ({
      weekStart,
      distance: Math.round(sumBy(weekRides, (r) => r.distance * METERS_TO_MILES) * 10) / 10,
      rides: weekRides.length,
      elevation: Math.round(sumBy(weekRides, (r) => r.elevationGain * METERS_TO_FEET)),
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
      elapsedTime: formatDuration(a.elapsedTime),
      elevation: `${Math.round(a.elevationGain * METERS_TO_FEET).toLocaleString()} ft`,
      speed: `${(a.avgSpeed * MPS_TO_MPH).toFixed(1)} mph`,
      maxSpeed: a.maxSpeed > 0 ? `${(a.maxSpeed * MPS_TO_MPH).toFixed(1)} mph` : null,
      heartrate: a.avgHeartRate ? `${Math.round(a.avgHeartRate)} bpm` : null,
      maxHeartrate: a.maxHeartRate ? `${Math.round(a.maxHeartRate)} bpm` : null,
      watts: a.avgPower ? `${Math.round(a.avgPower)}W` : null,
      maxWatts: a.maxPower ? `${Math.round(a.maxPower)}W` : null,
      calories: a.calories ? `${Math.round(a.calories).toLocaleString()} kcal` : null,
      source: a.source,
      sportType: a.sportType,
      terrain: a.terrain
        ? {
            road: Math.round(a.terrain.road * METERS_TO_MILES * 10) / 10,
            pavedPath: Math.round(a.terrain.pavedPath * METERS_TO_MILES * 10) / 10,
            unpaved: Math.round(a.terrain.unpaved * METERS_TO_MILES * 10) / 10,
          }
        : null,
      routePath: a.routePreview,
      raw: {
        distance: Math.round(a.distance * METERS_TO_MILES * 10) / 10,
        movingTime: a.movingTime,
        elevation: Math.round(a.elevationGain * METERS_TO_FEET),
        speed: Math.round(a.avgSpeed * MPS_TO_MPH * 10) / 10,
        heartRate: a.avgHeartRate ? Math.round(a.avgHeartRate) : null,
        power: a.avgPower ? Math.round(a.avgPower) : null,
        cadence: a.avgCadence ? Math.round(a.avgCadence) : null,
        calories: a.calories ? Math.round(a.calories) : null,
      },
    }))
}

function avgForPeriod(
  rides: NormalizedActivity[],
  cutoff: string,
  getter: (r: NormalizedActivity) => number | null
): number | null {
  const values = rides
    .filter((r) => r.startTime >= cutoff)
    .map(getter)
    .filter((v): v is number => v !== null && v > 0)
  if (values.length < 3) return null
  return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
}

function trimmedAvgForPeriod(
  rides: NormalizedActivity[],
  cutoff: string,
  getter: (r: NormalizedActivity) => number | null,
  trimFraction = 0.1
): number | null {
  const values = rides
    .filter((r) => r.startTime >= cutoff)
    .map(getter)
    .filter((v): v is number => v !== null && v > 0)
  if (values.length < 3) return null
  const sorted = [...values].sort((a, b) => a - b)
  const dropCount = Math.floor(sorted.length * trimFraction)
  const trimmed = sorted.slice(dropCount)
  if (trimmed.length === 0) return null
  return Math.round((trimmed.reduce((a, b) => a + b, 0) / trimmed.length) * 10) / 10
}

function computeRideBenchmarks(rides: NormalizedActivity[]): RideBenchmarks {
  const now = new Date()
  const d30 = new Date(now)
  d30.setDate(d30.getDate() - 30)
  const d90 = new Date(now)
  d90.setDate(d90.getDate() - 90)

  const c30 = d30.toISOString()
  const c90 = d90.toISOString()
  const cYear = `${now.getFullYear()}-01-01T00:00:00`

  function periods(getter: (r: NormalizedActivity) => number | null): PeriodAverages {
    return {
      d30: avgForPeriod(rides, c30, getter),
      d90: avgForPeriod(rides, c90, getter),
      year: avgForPeriod(rides, cYear, getter),
    }
  }

  function trimmedPeriods(getter: (r: NormalizedActivity) => number | null): PeriodAverages {
    return {
      d30: trimmedAvgForPeriod(rides, c30, getter),
      d90: trimmedAvgForPeriod(rides, c90, getter),
      year: trimmedAvgForPeriod(rides, cYear, getter),
    }
  }

  const hrRides = rides.filter((r) => r.avgHeartRate)
  const pwrRides = rides.filter((r) => r.avgPower)
  const cadenceRides = rides.filter((r) => r.avgCadence)

  return {
    distance: periods((r) => r.distance * METERS_TO_MILES),
    elevation: periods((r) => r.elevationGain * METERS_TO_FEET),
    speed: trimmedPeriods((r) => r.avgSpeed * MPS_TO_MPH),
    movingTime: periods((r) => r.movingTime / 60), // minutes
    heartRate:
      hrRides.length >= 3
        ? {
            d30: avgForPeriod(hrRides, c30, (r) => r.avgHeartRate),
            d90: avgForPeriod(hrRides, c90, (r) => r.avgHeartRate),
            year: avgForPeriod(hrRides, cYear, (r) => r.avgHeartRate),
          }
        : null,
    power:
      pwrRides.length >= 3
        ? {
            d30: avgForPeriod(pwrRides, c30, (r) => r.avgPower),
            d90: avgForPeriod(pwrRides, c90, (r) => r.avgPower),
            year: avgForPeriod(pwrRides, cYear, (r) => r.avgPower),
          }
        : null,
    cadence:
      cadenceRides.length >= 3
        ? {
            d30: trimmedAvgForPeriod(cadenceRides, c30, (r) => r.avgCadence),
            d90: trimmedAvgForPeriod(cadenceRides, c90, (r) => r.avgCadence),
            year: trimmedAvgForPeriod(cadenceRides, cYear, (r) => r.avgCadence),
          }
        : null,
  }
}

function computeRideHistory(rides: NormalizedActivity[]): RideHistory {
  const sorted = [...rides].sort((a, b) => b.startTime.localeCompare(a.startTime)).slice(0, 50)

  return {
    distances: sorted.map((r) => Math.round(r.distance * METERS_TO_MILES * 10) / 10),
    speeds: sorted.map((r) => Math.round(r.avgSpeed * MPS_TO_MPH * 10) / 10),
    elevations: sorted.map((r) => Math.round(r.elevationGain * METERS_TO_FEET)),
    cadences: sorted.filter((r) => r.avgCadence != null).map((r) => Math.round(r.avgCadence!)),
  }
}

function computeRideCategories(rides: NormalizedActivity[]): RideCategory[] {
  const counts = countBy(rides, (r) => r.sportType)

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
  const realRides = rides.filter((r) => !isVirtualRide(r))
  const virtualRides = rides.filter(isVirtualRide)

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
    rideBenchmarks: computeRideBenchmarks(realRides),
    rideHistory: computeRideHistory(realRides),
    virtualBenchmarks: computeRideBenchmarks(virtualRides),
    virtualHistory: computeRideHistory(virtualRides),
    terrainCategories: computeTerrainCategories(rides),
    powerStats: computePowerStats(rides),
    heartRateStats: computeHeartRateStats(rides),
    totalEnergyKJ: computeTotalEnergy(rides),
  }

  return cachedData
}
