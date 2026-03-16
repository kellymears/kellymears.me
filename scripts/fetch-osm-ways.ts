import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { join } from 'path'

// --- Types ---

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

interface OverpassElement {
  type: string
  id: number
  tags?: Record<string, string>
  geometry?: Array<{ lat: number; lon: number }>
}

// --- Config ---

const CACHE_DIR = join(process.cwd(), '.cache')
const CACHE_PATH = join(CACHE_DIR, 'osm-ways.json')
const ROUTES_PATH = join(process.cwd(), 'public', 'static', 'data', 'activities-routes.json')
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'
const PADDING = 0.05 // ~3.5 mi beyond ride extents

// --- Helpers ---

function percentile(sorted: number[], p: number): number {
  const idx = Math.floor(sorted.length * p)
  return sorted[Math.min(idx, sorted.length - 1)]!
}

// --- Main ---

async function main() {
  // Compute bounds from ride centroids (percentile-based to exclude distant trips)
  let routesData: { rides: Array<{ coordinates: [number, number][] }> }
  try {
    routesData = JSON.parse(readFileSync(ROUTES_PATH, 'utf-8'))
    if (!routesData.rides?.length) throw new Error('no rides')
  } catch {
    console.error('[fetch-osm] No ride route data found — run import:rides first')
    process.exit(1)
  }

  const lats: number[] = []
  const lngs: number[] = []

  for (const ride of routesData.rides) {
    if (ride.coordinates.length === 0) continue
    let latSum = 0
    let lngSum = 0
    for (const [lat, lng] of ride.coordinates) {
      latSum += lat
      lngSum += lng
    }
    lats.push(latSum / ride.coordinates.length)
    lngs.push(lngSum / ride.coordinates.length)
  }

  lats.sort((a, b) => a - b)
  lngs.sort((a, b) => a - b)

  // 2nd–98th percentile of ride centroids → covers primary riding area, skips road trips
  const south = percentile(lats, 0.02) - PADDING
  const north = percentile(lats, 0.98) + PADDING
  const west = percentile(lngs, 0.02) - PADDING
  const east = percentile(lngs, 0.98) + PADDING

  console.log(`[fetch-osm] ${lats.length} ride centroids → p2–p98 percentile bounds`)

  console.log(
    `[fetch-osm] Bbox: ${south.toFixed(4)},${west.toFixed(4)} → ${north.toFixed(4)},${east.toFixed(4)}`
  )

  // Query Overpass API for all ways with highway tags
  const query = [
    `[out:json][timeout:180];`,
    `way["highway"](${south},${west},${north},${east});`,
    `out body geom;`,
  ].join('')

  console.log('[fetch-osm] Querying Overpass API...')
  const response = await fetch(OVERPASS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `data=${encodeURIComponent(query)}`,
  })

  if (!response.ok) {
    console.error(`[fetch-osm] Overpass error: ${response.status} ${response.statusText}`)
    process.exit(1)
  }

  const data = (await response.json()) as { elements?: OverpassElement[]; remark?: string }

  if (data.remark) {
    console.error(`[fetch-osm] Overpass remark: ${data.remark}`)
  }
  if (!data.elements) {
    console.error('[fetch-osm] No elements in response')
    process.exit(1)
  }

  console.log(`[fetch-osm] Received ${data.elements.length} elements`)

  // Parse into compact format
  const ways: OsmWay[] = []
  for (const el of data.elements) {
    if (el.type !== 'way' || !el.tags?.highway || !el.geometry?.length) continue
    ways.push({
      id: el.id,
      highway: el.tags.highway,
      surface: el.tags.surface ?? null,
      geometry: el.geometry.map((n) => [n.lat, n.lon] as [number, number]),
    })
  }

  // Write cache
  mkdirSync(CACHE_DIR, { recursive: true })
  const cache: OsmWayCache = {
    generatedAt: new Date().toISOString(),
    bounds: { south, west, north, east },
    totalWays: ways.length,
    ways,
  }
  const json = JSON.stringify(cache)
  writeFileSync(CACHE_PATH, json)
  const sizeMB = (Buffer.byteLength(json) / 1024 / 1024).toFixed(2)
  console.log(`[fetch-osm] Wrote ${CACHE_PATH} (${sizeMB} MB, ${ways.length} ways)`)

  // Stats
  const withSurface = ways.filter((w) => w.surface).length
  const pct = Math.round((withSurface / ways.length) * 100)
  console.log(`[fetch-osm] Ways with surface tag: ${withSurface} (${pct}%)`)

  // Highway type breakdown
  const typeCounts: Record<string, number> = {}
  for (const w of ways) {
    typeCounts[w.highway] = (typeCounts[w.highway] ?? 0) + 1
  }
  const top = Object.entries(typeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([k, v]) => `${k}=${v}`)
    .join(', ')
  console.log(`[fetch-osm] Top types: ${top}`)
}

main().catch((err) => {
  console.error('[fetch-osm] Fatal:', err)
  process.exit(1)
})
