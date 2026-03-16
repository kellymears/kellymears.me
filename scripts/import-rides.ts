import { Decoder, Stream } from '@garmin/fitsdk'
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join, basename } from 'path'
import type { RidesData, RideBounds } from '../lib/rides'
import {
  loadTerrainIndex,
  classifyRideTerrain,
  type TerrainBreakdown,
} from './terrain'

// --- Config ---

const RUNGAP_DIR = join(
  process.env.HOME ?? '',
  'Library/Mobile Documents/iCloud~com~rungap~RunGap/Documents/Export'
)

const SEMICIRCLE_TO_DEG = 180 / Math.pow(2, 31)

// Source priority for dedup: prefer richer sensor data
const SOURCE_PRIORITY: Record<string, number> = { sv: 0, zw: 1, fi: 2, hk: 3 }

// FIT sport/subSport → Strava-compatible type
const SPORT_MAP: Record<string, string> = {
  'cycling/generic': 'Ride',
  'cycling/indoorCycling': 'Ride',
  'cycling/road': 'Ride',
  'cycling/virtualActivity': 'VirtualRide',
  'cycling/gravelCycling': 'GravelRide',
  'cycling/mountain': 'MountainBikeRide',
  'cycling/eBikeCycling': 'EBikeRide',
}

// Virtual rides → excluded from GPS heatmap
const VIRTUAL_TYPES = new Set(['VirtualRide'])

// GPS simplification tolerance (degrees) — ~100m at mid-latitudes
const SIMPLIFY_TOLERANCE = 0.001

// --- Types ---

interface ParsedActivity {
  id: string
  source: string
  sportType: string
  startTime: string
  name: string
  distance: number
  movingTime: number
  elapsedTime: number
  elevationGain: number
  avgSpeed: number
  maxSpeed: number
  avgHeartRate: number | null
  maxHeartRate: number | null
  avgPower: number | null
  maxPower: number | null
  calories: number | null
  terrain: TerrainBreakdown | null
  gps: [number, number][] // [lat, lng] in degrees
}

// --- Phase 1: Scan ---

function scanFiles(): string[] {
  const entries = readdirSync(RUNGAP_DIR).filter((f) => f.endsWith('.fit'))
  console.log(`[import-rides] Found ${entries.length} FIT files`)
  return entries
}

function extractSource(filename: string): string {
  const parts = filename.split('_')
  return parts.length >= 3 ? parts[2]! : 'unknown'
}

function generateName(sportType: string, startTime: string): string {
  const labels: Record<string, string> = {
    Ride: 'Ride',
    VirtualRide: 'Virtual Ride',
    GravelRide: 'Gravel Ride',
    MountainBikeRide: 'Mountain Ride',
    EBikeRide: 'E-Bike Ride',
  }
  const label = labels[sportType] ?? 'Ride'
  const time = new Date(startTime).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  return `${label} – ${time}`
}

// --- Phase 2: Parse ---

function parseFitFile(filename: string): ParsedActivity | null {
  const filePath = join(RUNGAP_DIR, filename)
  const source = extractSource(filename)
  const id = basename(filename, '.fit')

  let buf: Buffer
  try {
    buf = readFileSync(filePath)
  } catch {
    return null
  }

  const stream = Stream.fromBuffer(buf)
  const decoder = new Decoder(stream)

  if (!decoder.isFIT()) return null

  let messages: ReturnType<Decoder['read']>['messages']
  try {
    const result = decoder.read()
    messages = result.messages
  } catch {
    return null
  }

  const session = messages.sessionMesgs?.[0]
  if (!session) return null

  const sportKey = `${session.sport}/${session.subSport}`
  const sportType = SPORT_MAP[sportKey]
  if (!sportType) return null

  const startTime =
    session.startTime instanceof Date
      ? session.startTime.toISOString()
      : new Date(session.startTime).toISOString()

  // Extract GPS coordinates from records
  const gps: [number, number][] = []
  if (messages.recordMesgs) {
    for (const rec of messages.recordMesgs) {
      if (rec.positionLat != null && rec.positionLong != null) {
        gps.push([rec.positionLat * SEMICIRCLE_TO_DEG, rec.positionLong * SEMICIRCLE_TO_DEG])
      }
    }
  }

  return {
    id,
    source,
    sportType,
    startTime,
    name: messages.workoutMesgs?.[0]?.wktName ?? generateName(sportType, startTime),
    distance: session.totalDistance ?? 0,
    movingTime: session.totalTimerTime ?? 0,
    elapsedTime: session.totalElapsedTime ?? 0,
    elevationGain: session.totalAscent ?? 0,
    avgSpeed: session.enhancedAvgSpeed ?? session.avgSpeed ?? 0,
    maxSpeed: session.enhancedMaxSpeed ?? session.maxSpeed ?? 0,
    avgHeartRate: session.avgHeartRate ?? null,
    maxHeartRate: session.maxHeartRate ?? null,
    avgPower: session.avgPower ?? null,
    maxPower: session.maxPower ?? null,
    calories: session.totalCalories ?? null,
    terrain: null,
    gps,
  }
}

// --- Phase 3: Deduplicate ---

function sensorRichness(a: ParsedActivity): number {
  let score = 0
  if (a.avgHeartRate) score += 2
  if (a.avgPower) score += 2
  if (a.gps.length > 0) score += 1
  if (a.calories) score += 1
  return score
}

function dedup(activities: ParsedActivity[]): ParsedActivity[] {
  // Sort by start time
  activities.sort((a, b) => a.startTime.localeCompare(b.startTime))

  const groups: ParsedActivity[][] = []

  for (const act of activities) {
    const actTime = new Date(act.startTime).getTime()
    const actDist = act.distance

    // Try to find an existing group
    let matched = false
    for (const group of groups) {
      const ref = group[0]!
      const refTime = new Date(ref.startTime).getTime()
      const timeDiff = Math.abs(actTime - refTime)
      const distRatio = actDist > 0 && ref.distance > 0 ? actDist / ref.distance : 1

      if (timeDiff <= 5 * 60 * 1000 && distRatio >= 0.9 && distRatio <= 1.1) {
        group.push(act)
        matched = true
        break
      }
    }

    if (!matched) {
      groups.push([act])
    }
  }

  const dupsRemoved = activities.length - groups.length
  console.log(
    `[import-rides] Dedup: ${activities.length} → ${groups.length} (${dupsRemoved} duplicates)`
  )

  return groups.map((group) => {
    if (group.length === 1) return group[0]!

    // Pick the best record: most sensor data, then source priority
    return group.sort((a, b) => {
      const richDiff = sensorRichness(b) - sensorRichness(a)
      if (richDiff !== 0) return richDiff
      return (SOURCE_PRIORITY[a.source] ?? 9) - (SOURCE_PRIORITY[b.source] ?? 9)
    })[0]!
  })
}

// --- GPS simplification (Douglas-Peucker) ---

function perpendicularDistance(
  point: [number, number],
  lineStart: [number, number],
  lineEnd: [number, number]
): number {
  const [px, py] = point
  const [sx, sy] = lineStart
  const [ex, ey] = lineEnd
  const dx = ex - sx
  const dy = ey - sy
  const lenSq = dx * dx + dy * dy
  if (lenSq === 0) return Math.sqrt((px - sx) ** 2 + (py - sy) ** 2)
  const t = Math.max(0, Math.min(1, ((px - sx) * dx + (py - sy) * dy) / lenSq))
  return Math.sqrt((px - (sx + t * dx)) ** 2 + (py - (sy + t * dy)) ** 2)
}

function simplifyPath(points: [number, number][], tolerance: number): [number, number][] {
  if (points.length <= 2) return points

  let maxDist = 0
  let maxIdx = 0
  const first = points[0]!
  const last = points[points.length - 1]!

  for (let i = 1; i < points.length - 1; i++) {
    const dist = perpendicularDistance(points[i]!, first, last)
    if (dist > maxDist) {
      maxDist = dist
      maxIdx = i
    }
  }

  if (maxDist > tolerance) {
    const left = simplifyPath(points.slice(0, maxIdx + 1), tolerance)
    const right = simplifyPath(points.slice(maxIdx), tolerance)
    return [...left.slice(0, -1), ...right]
  }

  return [first, last]
}

// --- Phase 4: Emit ---

function computeBounds(rides: { coordinates: [number, number][] }[]): RideBounds {
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

function emit(activities: ParsedActivity[]) {
  // --- activities-metrics.json (activity metadata, no GPS) ---
  const outDir = join(process.cwd(), 'public', 'static', 'data')
  mkdirSync(outDir, { recursive: true })

  const normalized = activities.map(({ gps: _gps, ...rest }) => rest)
  const activitiesPath = join(outDir, 'activities-metrics.json')
  const activitiesJson = JSON.stringify(normalized)
  writeFileSync(activitiesPath, activitiesJson)
  const activitiesSize = (Buffer.byteLength(activitiesJson) / 1024).toFixed(1)
  console.log(
    `[import-rides] Wrote ${activitiesPath} (${activitiesSize} KB, ${normalized.length} activities)`
  )

  // --- activities-routes.json (simplified GPS tracks for heatmap) ---
  let totalOriginal = 0
  let totalSimplified = 0

  const ridesWithGPS = activities
    .filter((a) => !VIRTUAL_TYPES.has(a.sportType) && a.gps.length > 0)
    .map((a) => {
      totalOriginal += a.gps.length
      const simplified = simplifyPath(a.gps, SIMPLIFY_TOLERANCE)
      totalSimplified += simplified.length
      return {
        id: a.id,
        sportType: a.sportType,
        date: a.startTime,
        coordinates: simplified,
      }
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  console.log(
    `[import-rides] GPS: ${totalOriginal.toLocaleString()} → ${totalSimplified.toLocaleString()} points (${Math.round((1 - totalSimplified / totalOriginal) * 100)}% reduction)`
  )

  const bounds =
    ridesWithGPS.length > 0
      ? computeBounds(ridesWithGPS)
      : { minLat: 0, maxLat: 0, minLng: 0, maxLng: 0 }

  const ridesData: RidesData = {
    generatedAt: new Date().toISOString(),
    totalRides: ridesWithGPS.length,
    bounds,
    rides: ridesWithGPS,
  }

  const ridesPath = join(outDir, 'activities-routes.json')
  const ridesJson = JSON.stringify(ridesData)
  writeFileSync(ridesPath, ridesJson)
  const ridesSize = (Buffer.byteLength(ridesJson) / 1024 / 1024).toFixed(2)
  console.log(
    `[import-rides] Wrote ${ridesPath} (${ridesSize} MB, ${ridesWithGPS.length} rides with GPS)`
  )
}

// --- Main ---

function main() {
  console.log(`[import-rides] Source: ${RUNGAP_DIR}`)

  const files = scanFiles()
  if (files.length === 0) {
    console.error('[import-rides] No FIT files found')
    process.exit(1)
  }

  // Parse all files
  console.log('[import-rides] Parsing...')
  const parsed: ParsedActivity[] = []
  let skipped = 0

  for (const file of files) {
    const result = parseFitFile(file)
    if (result) {
      parsed.push(result)
    } else {
      skipped++
    }
  }

  console.log(
    `[import-rides] Parsed ${parsed.length} cycling activities (skipped ${skipped} non-cycling/invalid)`
  )

  // Dedup
  const deduped = dedup(parsed)

  // Sort by start time descending (newest first for activities.json)
  deduped.sort((a, b) => b.startTime.localeCompare(a.startTime))

  // Source breakdown
  const sourceCounts: Record<string, number> = {}
  for (const a of deduped) {
    sourceCounts[a.source] = (sourceCounts[a.source] ?? 0) + 1
  }
  console.log(
    '[import-rides] Sources:',
    Object.entries(sourceCounts)
      .map(([k, v]) => `${k}=${v}`)
      .join(', ')
  )

  // Type breakdown
  const typeCounts: Record<string, number> = {}
  for (const a of deduped) {
    typeCounts[a.sportType] = (typeCounts[a.sportType] ?? 0) + 1
  }
  console.log(
    '[import-rides] Types:',
    Object.entries(typeCounts)
      .map(([k, v]) => `${k}=${v}`)
      .join(', ')
  )

  // Terrain classification (requires OSM data from `npm run import:osm`)
  const terrainIndex = loadTerrainIndex()
  if (terrainIndex) {
    console.log('[import-rides] Computing terrain...')
    let analyzed = 0
    for (const ride of deduped) {
      if (VIRTUAL_TYPES.has(ride.sportType) || ride.gps.length < 2) continue
      ride.terrain = classifyRideTerrain(ride.gps, terrainIndex)
      if (ride.terrain) analyzed++
    }
    console.log(`[import-rides] Terrain: ${analyzed} rides classified`)

    const agg = { road: 0, pavedPath: 0, unpaved: 0 }
    for (const ride of deduped) {
      if (!ride.terrain) continue
      agg.road += ride.terrain.road
      agg.pavedPath += ride.terrain.pavedPath
      agg.unpaved += ride.terrain.unpaved
    }
    const total = agg.road + agg.pavedPath + agg.unpaved
    if (total > 0) {
      const mi = (m: number) => Math.round(m * 0.000621371)
      const pct = (m: number) => Math.round((m / total) * 100)
      console.log(
        `[import-rides] Terrain totals: ` +
          `road=${mi(agg.road).toLocaleString()} mi (${pct(agg.road)}%), ` +
          `pavedPath=${mi(agg.pavedPath).toLocaleString()} mi (${pct(agg.pavedPath)}%), ` +
          `unpaved=${mi(agg.unpaved).toLocaleString()} mi (${pct(agg.unpaved)}%)`
      )
    }
  } else {
    console.log('[import-rides] No OSM data — run `npm run import:osm` to enable terrain analysis')
  }

  emit(deduped)
  console.log('[import-rides] Done')
}

main()
