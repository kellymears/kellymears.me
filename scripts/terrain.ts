import { existsSync, readFileSync } from 'fs'
import { join } from 'path'

// --- Types ---

export type TerrainType = 'road' | 'pavedPath' | 'unpaved'

export interface TerrainBreakdown {
  road: number
  pavedPath: number
  unpaved: number
}

interface Segment {
  lat1: number
  lng1: number
  lat2: number
  lng2: number
  terrain: TerrainType
}

interface OsmWay {
  id: number
  highway: string
  surface: string | null
  geometry: [number, number][]
}

interface OsmWayCache {
  generatedAt: string
  bounds: { south: number; west: number; north: number; east: number }
  totalWays: number
  ways: OsmWay[]
}

// --- Constants ---

const CACHE_PATH = join(process.cwd(), '.cache', 'osm-ways.json')
const CELL_SIZE = 0.001 // ~111m lat, ~90m lng at 36°N
const SMOOTHING_WINDOW = 5

const PAVED_SURFACES = new Set([
  'asphalt',
  'concrete',
  'paving_stones',
  'sett',
  'paved',
  'concrete:plates',
  'concrete:lanes',
  'bricks',
])

const UNPAVED_SURFACES = new Set([
  'gravel',
  'dirt',
  'ground',
  'grass',
  'compacted',
  'fine_gravel',
  'sand',
  'mud',
  'earth',
  'unpaved',
  'woodchips',
  'rock',
  'pebblestone',
])

const ROAD_HIGHWAYS = new Set([
  'motorway',
  'trunk',
  'primary',
  'secondary',
  'tertiary',
  'residential',
  'unclassified',
  'service',
  'motorway_link',
  'trunk_link',
  'primary_link',
  'secondary_link',
  'tertiary_link',
  'living_street',
])

// --- Classification ---

function classifyWay(highway: string, surface: string | null): TerrainType {
  // Explicit surface tag takes priority
  if (surface) {
    if (UNPAVED_SURFACES.has(surface)) return 'unpaved'
    if (PAVED_SURFACES.has(surface)) {
      // Paved — but is it a road or a path?
      return ROAD_HIGHWAYS.has(highway) ? 'road' : 'pavedPath'
    }
  }

  // No surface tag — infer from highway type
  if (ROAD_HIGHWAYS.has(highway)) return 'road'
  if (highway === 'cycleway') return 'pavedPath' // cycleways usually paved
  if (highway === 'track') return 'unpaved' // tracks usually unpaved

  // path, footway, bridleway without surface → assume unpaved
  return 'unpaved'
}

// --- Spatial Index ---

export class TerrainIndex {
  private cells = new Map<string, Segment[]>()
  private segmentCount = 0

  addSegment(seg: Segment) {
    const minLat = Math.min(seg.lat1, seg.lat2)
    const maxLat = Math.max(seg.lat1, seg.lat2)
    const minLng = Math.min(seg.lng1, seg.lng2)
    const maxLng = Math.max(seg.lng1, seg.lng2)

    const minCellLat = Math.floor(minLat / CELL_SIZE)
    const maxCellLat = Math.floor(maxLat / CELL_SIZE)
    const minCellLng = Math.floor(minLng / CELL_SIZE)
    const maxCellLng = Math.floor(maxLng / CELL_SIZE)

    for (let clat = minCellLat; clat <= maxCellLat; clat++) {
      for (let clng = minCellLng; clng <= maxCellLng; clng++) {
        const k = `${clat},${clng}`
        let cell = this.cells.get(k)
        if (!cell) {
          cell = []
          this.cells.set(k, cell)
        }
        cell.push(seg)
      }
    }
    this.segmentCount++
  }

  query(lat: number, lng: number): Segment[] {
    const centerLat = Math.floor(lat / CELL_SIZE)
    const centerLng = Math.floor(lng / CELL_SIZE)
    const results: Segment[] = []

    for (let dlat = -1; dlat <= 1; dlat++) {
      for (let dlng = -1; dlng <= 1; dlng++) {
        const cell = this.cells.get(`${centerLat + dlat},${centerLng + dlng}`)
        if (cell) {
          for (const seg of cell) results.push(seg)
        }
      }
    }
    return results
  }

  get size(): number {
    return this.segmentCount
  }

  get cellCount(): number {
    return this.cells.size
  }
}

// --- Geometry ---

function pointToSegmentDistSq(
  plat: number,
  plng: number,
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
  cosLat: number
): number {
  // Equirectangular approximation: scale longitude by cos(lat)
  const dx = lat2 - lat1
  const dy = (lng2 - lng1) * cosLat
  const px = plat - lat1
  const py = (plng - lng1) * cosLat

  const lenSq = dx * dx + dy * dy
  if (lenSq === 0) return px * px + py * py

  const t = Math.max(0, Math.min(1, (px * dx + py * dy) / lenSq))
  const projX = px - t * dx
  const projY = py - t * dy

  return projX * projX + projY * projY
}

function haversineMeters(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6_371_000
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// --- Smoothing ---

function smoothClassifications(classes: TerrainType[]): TerrainType[] {
  if (classes.length <= SMOOTHING_WINDOW) return classes

  const half = Math.floor(SMOOTHING_WINDOW / 2)

  return classes.map((original, i) => {
    const counts: Record<TerrainType, number> = { road: 0, pavedPath: 0, unpaved: 0 }
    const start = Math.max(0, i - half)
    const end = Math.min(classes.length - 1, i + half)

    for (let j = start; j <= end; j++) {
      counts[classes[j]!]++
    }

    let best: TerrainType = original
    let bestCount = 0
    for (const type of ['road', 'pavedPath', 'unpaved'] as const) {
      if (counts[type] > bestCount) {
        best = type
        bestCount = counts[type]
      }
    }
    return best
  })
}

// --- Public API ---

export function loadTerrainIndex(): TerrainIndex | null {
  if (!existsSync(CACHE_PATH)) return null

  let cache: OsmWayCache
  try {
    cache = JSON.parse(readFileSync(CACHE_PATH, 'utf-8')) as OsmWayCache
  } catch {
    return null
  }

  const index = new TerrainIndex()

  for (const way of cache.ways) {
    const terrain = classifyWay(way.highway, way.surface)
    for (let i = 0; i < way.geometry.length - 1; i++) {
      const [lat1, lng1] = way.geometry[i]!
      const [lat2, lng2] = way.geometry[i + 1]!
      index.addSegment({ lat1, lng1, lat2, lng2, terrain })
    }
  }

  console.log(
    `[terrain] Loaded ${cache.totalWays.toLocaleString()} ways → ` +
      `${index.size.toLocaleString()} segments in ${index.cellCount.toLocaleString()} cells`
  )

  return index
}

export function classifyRideTerrain(
  gps: [number, number][],
  index: TerrainIndex
): TerrainBreakdown | null {
  if (gps.length < 2) return null

  const cosLat = Math.cos((gps[0]![0] * Math.PI) / 180)

  // Classify each GPS point by nearest OSM way
  const rawClasses: TerrainType[] = gps.map(([lat, lng]) => {
    const candidates = index.query(lat, lng)
    if (candidates.length === 0) return 'road'

    let bestDist = Infinity
    let bestTerrain: TerrainType = 'road'

    for (const seg of candidates) {
      const dist = pointToSegmentDistSq(
        lat,
        lng,
        seg.lat1,
        seg.lng1,
        seg.lat2,
        seg.lng2,
        cosLat
      )
      if (dist < bestDist) {
        bestDist = dist
        bestTerrain = seg.terrain
      }
    }

    return bestTerrain
  })

  // Majority-vote smoothing to filter GPS jitter at terrain boundaries
  const classes = smoothClassifications(rawClasses)

  // Sum haversine distances per terrain type
  const breakdown: TerrainBreakdown = { road: 0, pavedPath: 0, unpaved: 0 }

  for (let i = 1; i < gps.length; i++) {
    const [lat1, lng1] = gps[i - 1]!
    const [lat2, lng2] = gps[i]!
    const dist = haversineMeters(lat1, lng1, lat2, lng2)
    breakdown[classes[i]!] += dist
  }

  breakdown.road = Math.round(breakdown.road)
  breakdown.pavedPath = Math.round(breakdown.pavedPath)
  breakdown.unpaved = Math.round(breakdown.unpaved)

  return breakdown
}
