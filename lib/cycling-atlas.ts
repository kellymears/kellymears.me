import { METERS_TO_FEET, METERS_TO_MILES, MPS_TO_MPH } from './cycling-units'

export interface RawRouteRide {
  id: string
  sportType: string
  date: string
  coordinates: [number, number][] // [lat, lng]
}

export interface RawRoutesFile {
  generatedAt: string
  totalRides: number
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }
  rides: RawRouteRide[]
}

export interface RawMetric {
  id: string
  slug: string
  name: string
  distance: number
  movingTime: number
  elevationGain: number
  startTime: string
  sportType: string
  avgSpeed: number
  terrain?: { road: number; pavedPath: number; unpaved: number }
}

export interface JoinedRide {
  id: string
  slug: string
  name: string
  date: Date
  dateMs: number
  sportType: string
  distance: number // meters
  movingTime: number // seconds
  elevationGain: number // meters
  avgSpeed: number // m/s
  terrain?: { road: number; pavedPath: number; unpaved: number }
  // Coordinates already flipped to [lng, lat] for MapLibre
  coordinates: [number, number][]
  bbox: [number, number, number, number] // [minLng, minLat, maxLng, maxLat]
  /** Stable per-ride color drawn from RIDE_PALETTE, used in playback rendering. */
  color: string
}

export interface PeriodStats {
  rides: number
  miles: number
  elevationFt: number
  durationSec: number
  avgSpeedMph: number
}

export interface DensityBucket {
  weekStart: Date
  weekStartMs: number
  count: number
}

export function joinRides(routes: RawRouteRide[], metrics: RawMetric[]): JoinedRide[] {
  const metricsById = new Map<string, RawMetric>()
  for (const m of metrics) metricsById.set(m.id, m)

  const joined: JoinedRide[] = []
  for (const r of routes) {
    const m = metricsById.get(r.id)
    if (!m) continue
    if (!r.coordinates || r.coordinates.length < 2) continue

    let minLng = Infinity
    let minLat = Infinity
    let maxLng = -Infinity
    let maxLat = -Infinity
    const flipped: [number, number][] = new Array(r.coordinates.length)
    for (let i = 0; i < r.coordinates.length; i++) {
      const lat = r.coordinates[i]![0]!
      const lng = r.coordinates[i]![1]!
      flipped[i] = [lng, lat]
      if (lng < minLng) minLng = lng
      if (lng > maxLng) maxLng = lng
      if (lat < minLat) minLat = lat
      if (lat > maxLat) maxLat = lat
    }

    const date = new Date(r.date)
    joined.push({
      id: r.id,
      slug: m.slug,
      name: m.name,
      date,
      dateMs: date.getTime(),
      sportType: r.sportType,
      distance: m.distance,
      movingTime: m.movingTime,
      elevationGain: m.elevationGain,
      avgSpeed: m.avgSpeed,
      terrain: m.terrain,
      coordinates: flipped,
      bbox: [minLng, minLat, maxLng, maxLat],
      color: colorForRide(r.id),
    })
  }
  joined.sort((a, b) => a.dateMs - b.dateMs)
  return joined
}

export function computePeriodStats(rides: JoinedRide[]): PeriodStats {
  if (rides.length === 0) {
    return { rides: 0, miles: 0, elevationFt: 0, durationSec: 0, avgSpeedMph: 0 }
  }
  let distance = 0
  let elevation = 0
  let duration = 0
  for (const r of rides) {
    distance += r.distance
    elevation += r.elevationGain
    duration += r.movingTime
  }
  const avgSpeedMps = duration > 0 ? distance / duration : 0
  return {
    rides: rides.length,
    miles: Math.round(distance * METERS_TO_MILES * 10) / 10,
    elevationFt: Math.round(elevation * METERS_TO_FEET),
    durationSec: Math.round(duration),
    avgSpeedMph: Math.round(avgSpeedMps * MPS_TO_MPH * 10) / 10,
  }
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

function startOfWeekMs(ms: number): number {
  const d = new Date(ms)
  // Snap to Monday 00:00 UTC. Monday-aligned weeks read better than Sunday.
  const day = d.getUTCDay() // 0=Sun..6=Sat
  const diff = (day + 6) % 7 // days back to Monday
  return Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate() - diff)
}

export function computeWeeklyDensity(rides: JoinedRide[]): DensityBucket[] {
  if (rides.length === 0) return []
  const firstWeek = startOfWeekMs(rides[0]!.dateMs)
  const lastWeek = startOfWeekMs(rides[rides.length - 1]!.dateMs)
  const buckets = new Map<number, number>()
  for (let w = firstWeek; w <= lastWeek; w += WEEK_MS) {
    buckets.set(w, 0)
  }
  for (const r of rides) {
    const w = startOfWeekMs(r.dateMs)
    buckets.set(w, (buckets.get(w) ?? 0) + 1)
  }
  return [...buckets.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([weekStartMs, count]) => ({
      weekStart: new Date(weekStartMs),
      weekStartMs,
      count,
    }))
}

/**
 * Precompute cumulative arc lengths along a polyline so we can find the point
 * at any progress in O(log n). Returns array `lens` where lens[i] is the
 * (planar, in degrees-of-coords) distance from coords[0] to coords[i]. Good
 * enough precision for animating a dot at typical zoom levels.
 */
export function cumulativeLengths(coords: [number, number][]): number[] {
  const out = new Array(coords.length).fill(0) as number[]
  for (let i = 1; i < coords.length; i++) {
    const [lng1, lat1] = coords[i - 1]!
    const [lng2, lat2] = coords[i]!
    out[i] = out[i - 1]! + Math.hypot(lng2 - lng1, lat2 - lat1)
  }
  return out
}

/**
 * Interpolate the point on a polyline at `progress` ∈ [0, 1] using
 * pre-computed cumulative lengths.
 */
export function pointAtProgress(
  coords: [number, number][],
  lens: number[],
  progress: number
): [number, number] {
  if (coords.length === 0) return [0, 0]
  if (coords.length === 1) return coords[0]!
  const total = lens[lens.length - 1]!
  const target = Math.max(0, Math.min(1, progress)) * total
  let lo = 0
  let hi = lens.length - 1
  while (lo < hi - 1) {
    const mid = (lo + hi) >>> 1
    if (lens[mid]! <= target) lo = mid
    else hi = mid
  }
  const segLen = lens[hi]! - lens[lo]!
  const t = segLen > 0 ? (target - lens[lo]!) / segLen : 0
  const [lng1, lat1] = coords[lo]!
  const [lng2, lat2] = coords[hi]!
  return [lng1 + (lng2 - lng1) * t, lat1 + (lat2 - lat1) * t]
}

/**
 * Stable per-ride color palette. Picked so adjacent rides on the map can be
 * distinguished even when they share routes. Order is approximately a rainbow
 * walk so a ride's color isn't predictable from its position in the dataset.
 */
export const RIDE_PALETTE: string[] = [
  '#ef4444',
  '#f97316',
  '#eab308',
  '#84cc16',
  '#22c55e',
  '#10b981',
  '#06b6d4',
  '#0ea5e9',
  '#3b82f6',
  '#6366f1',
  '#8b5cf6',
  '#a855f7',
  '#d946ef',
  '#ec4899',
  '#f43f5e',
  '#fb7185',
  '#fbbf24',
  '#a3e635',
  '#34d399',
  '#5eead4',
  '#67e8f9',
  '#7dd3fc',
  '#c084fc',
  '#f0abfc',
]

/** Deterministic id → palette color so a ride keeps the same color across renders. */
export function colorForRide(id: string): string {
  let h = 0
  for (let i = 0; i < id.length; i++) {
    h = (h * 31 + id.charCodeAt(i)) | 0
  }
  const idx = ((h % RIDE_PALETTE.length) + RIDE_PALETTE.length) % RIDE_PALETTE.length
  return RIDE_PALETTE[idx]!
}

/** Bearing in degrees (0=N, 90=E, 180=S, 270=W) from point A to point B. */
export function bearingDeg(lng1: number, lat1: number, lng2: number, lat2: number): number {
  const φ1 = (lat1 * Math.PI) / 180
  const φ2 = (lat2 * Math.PI) / 180
  const Δλ = ((lng2 - lng1) * Math.PI) / 180
  const y = Math.sin(Δλ) * Math.cos(φ2)
  const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ)
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}

export function formatDurationShort(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)}s`
  const totalMinutes = Math.round(seconds / 60)
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h === 0) return `${m}m`
  return `${h}h ${m}m`
}
