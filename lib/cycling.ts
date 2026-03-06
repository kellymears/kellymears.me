import { readFileSync } from 'fs'
import { join } from 'path'

const METERS_TO_MILES = 0.000621371
const METERS_TO_FEET = 3.28084
const MPS_TO_MPH = 2.23694

// --- Types ---

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
  const day = date.getDay()
  const diff = day === 0 ? 6 : day - 1
  date.setDate(date.getDate() - diff)
  return date.toISOString().slice(0, 10)
}

// --- Pure computation ---

function computeRideStats(activities: NormalizedActivity[]): RideStats {
  const rides = activities.filter(isRide)

  const totalDistance = rides.reduce((sum, a) => sum + a.distance, 0)
  const totalTime = rides.reduce((sum, a) => sum + a.movingTime, 0)
  const totalElev = rides.reduce((sum, a) => sum + a.elevationGain, 0)

  let biggestDist = 0
  let biggestClimb = 0
  for (const ride of rides) {
    if (ride.distance > biggestDist) biggestDist = ride.distance
    if (ride.elevationGain > biggestClimb) biggestClimb = ride.elevationGain
  }

  return {
    totalMiles: Math.round(totalDistance * METERS_TO_MILES),
    totalRides: rides.length,
    totalElevation: Math.round(totalElev * METERS_TO_FEET),
    totalHours: Math.round(totalTime / 3600),
    biggestRide: Math.round(biggestDist * METERS_TO_MILES * 10) / 10,
    biggestClimb: Math.round(biggestClimb * METERS_TO_FEET),
  }
}

function computeYTDStats(activities: NormalizedActivity[]): YTDStats {
  const year = new Date().getFullYear()
  const cutoff = `${year}-01-01T00:00:00`
  const rides = activities.filter((a) => isRide(a) && a.startTime >= cutoff)

  const totalDistance = rides.reduce((sum, a) => sum + a.distance, 0)
  const totalTime = rides.reduce((sum, a) => sum + a.movingTime, 0)
  const totalElev = rides.reduce((sum, a) => sum + a.elevationGain, 0)

  return {
    miles: Math.round(totalDistance * METERS_TO_MILES),
    rides: rides.length,
    elevation: Math.round(totalElev * METERS_TO_FEET),
    hours: Math.round(totalTime / 3600),
  }
}

function computeRecentStats(activities: NormalizedActivity[]): RecentStats {
  const now = new Date()
  const cutoff = new Date(now)
  cutoff.setDate(cutoff.getDate() - 28)
  const cutoffStr = cutoff.toISOString()

  const rides = activities.filter((a) => isRide(a) && a.startTime >= cutoffStr)

  const totalDistance = rides.reduce((sum, a) => sum + a.distance, 0)
  const totalTime = rides.reduce((sum, a) => sum + a.movingTime, 0)
  const totalElev = rides.reduce((sum, a) => sum + a.elevationGain, 0)

  return {
    miles: Math.round(totalDistance * METERS_TO_MILES),
    rides: rides.length,
    elevation: Math.round(totalElev * METERS_TO_FEET),
    hours: Math.round((totalTime / 3600) * 10) / 10,
  }
}

function computeWeeklyMileage(activities: NormalizedActivity[]): WeeklyMileage[] {
  const rides = activities.filter(isRide)
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

function computeRecentRides(activities: NormalizedActivity[]): RecentRide[] {
  return activities
    .filter(isRide)
    .sort((a, b) => b.startTime.localeCompare(a.startTime))
    .slice(0, 10)
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
    }))
}

function computeRideCategories(activities: NormalizedActivity[]): RideCategory[] {
  const rides = activities.filter(isRide)
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

function computePowerStats(activities: NormalizedActivity[]): PowerStats | null {
  const ridesWithPower = activities.filter((a) => isRide(a) && a.avgPower)
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

function computeHeartRateStats(activities: NormalizedActivity[]): HeartRateStats | null {
  const ridesWithHR = activities.filter((a) => isRide(a) && a.avgHeartRate)
  if (ridesWithHR.length < 3) return null

  const avgHR = Math.round(
    ridesWithHR.reduce((sum, a) => sum + (a.avgHeartRate ?? 0), 0) / ridesWithHR.length
  )
  const maxHR = Math.max(...ridesWithHR.map((a) => a.maxHeartRate ?? 0))

  return { avgHR, maxHR, ridesWithHR: ridesWithHR.length }
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

  const activities = loadActivities()

  cachedData = {
    athlete: ATHLETE,
    rideStats: computeRideStats(activities),
    ytdStats: computeYTDStats(activities),
    recentStats: computeRecentStats(activities),
    weeklyMileage: computeWeeklyMileage(activities),
    recentRides: computeRecentRides(activities),
    rideCategories: computeRideCategories(activities),
    powerStats: computePowerStats(activities),
    heartRateStats: computeHeartRateStats(activities),
  }

  return cachedData
}
