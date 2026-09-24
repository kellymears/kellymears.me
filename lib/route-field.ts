import fs from 'fs'
import path from 'path'
import type { RawRoutesFile } from './cycling-atlas'
import { GROUP_SPORT_TYPES, type ActivityGroup } from './cycling-constants'

/**
 * Every recorded route for an activity group, projected onto one shared
 * 1900×1000 frame so they pile up into a heat field of the streets actually
 * travelled. Used as a CSS mask (see `/constellation/rides-<group>.svg`), so
 * it carries shape only — color comes from the page.
 *
 * Deterministic: same data in, byte-identical output out.
 */

export const FIELD_W = 1900
export const FIELD_H = 1000

export interface FieldRoute {
  id: string
  date: string
  /** Relative-command SVG path in frame units. */
  d: string
  /** Last point, for the "latest" marker. */
  end: [number, number]
}

export interface RouteField {
  group: ActivityGroup
  count: number
  /** One path per route — separate elements so overlapping strokes compound. */
  paths: string[]
  /** Most recent routes that actually cross the frame, newest first. */
  recent: FieldRoute[]
}

/** Share of all GPS points the frame must hold; the rest (trips away) clip. */
const FRAME_QUANTILE = 0.8
const FRAME_PADDING = 1.15
/** Douglas-Peucker tolerance, in frame units (≈ px at desktop width). */
const SIMPLIFY_EPS = 1.4
const RECENT_COUNT = 10

type Pt = [number, number]

let routesFile: RawRoutesFile | null = null
const cache = new Map<ActivityGroup, RouteField>()

function loadRoutes(): RawRoutesFile {
  routesFile ??= JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public/static/data/activities-routes.json'), 'utf8')
  ) as RawRoutesFile
  return routesFile
}

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.floor(sorted.length / 2)] ?? 0
}

function simplify(pts: Pt[], eps: number): Pt[] {
  if (pts.length < 3) return pts
  const keep = new Uint8Array(pts.length)
  keep[0] = keep[pts.length - 1] = 1
  const stack: [number, number][] = [[0, pts.length - 1]]
  while (stack.length) {
    const [a, b] = stack.pop()!
    const [ax, ay] = pts[a]!
    const [bx, by] = pts[b]!
    const dx = bx - ax
    const dy = by - ay
    const len = Math.hypot(dx, dy) || 1
    let max = 0
    let idx = -1
    for (let i = a + 1; i < b; i++) {
      const [px, py] = pts[i]!
      const dist = Math.abs(dy * px - dx * py + bx * ay - by * ax) / len
      if (dist > max) {
        max = dist
        idx = i
      }
    }
    if (max > eps && idx > 0) {
      keep[idx] = 1
      stack.push([a, idx], [idx, b])
    }
  }
  return pts.filter((_, i) => keep[i])
}

function toPath(pts: Pt[]): string {
  let d = ''
  let px = 0
  let py = 0
  for (let i = 0; i < pts.length; i++) {
    const x = Math.round(pts[i]![0])
    const y = Math.round(pts[i]![1])
    if (i === 0) d += `M${x} ${y}`
    else if (x !== px || y !== py) d += `l${x - px} ${y - py}`
    px = x
    py = y
  }
  return d
}

const inFrame = ([x, y]: Pt) => x >= 0 && x <= FIELD_W && y >= 0 && y <= FIELD_H

export function getRouteField(group: ActivityGroup): RouteField {
  const cached = cache.get(group)
  if (cached) return cached

  const types = GROUP_SPORT_TYPES[group]
  const rides = loadRoutes()
    .rides.filter((r) => types.includes(r.sportType) && r.coordinates?.length > 1)
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  // Centre on the median start point — home, in practice — and size the frame
  // so it holds most of the points, letting the occasional trip fall away.
  const lat0 = median(rides.map((r) => r.coordinates[0]![0]))
  const lng0 = median(rides.map((r) => r.coordinates[0]![1]))
  const k = Math.cos((lat0 * Math.PI) / 180)
  const dists: number[] = []
  for (const r of rides)
    for (const [lat, lng] of r.coordinates) dists.push(Math.hypot((lng - lng0) * k, lat - lat0))
  dists.sort((a, b) => a - b)
  const radius = (dists[Math.floor(dists.length * FRAME_QUANTILE)] ?? 0.05) * FRAME_PADDING
  const scale = FIELD_H / 2 / radius

  const project = ([lat, lng]: [number, number]): Pt => [
    FIELD_W / 2 + (lng - lng0) * k * scale,
    FIELD_H / 2 - (lat - lat0) * scale,
  ]

  const paths: string[] = []
  const recent: FieldRoute[] = []
  for (const r of rides) {
    const pts = simplify(r.coordinates.map(project), SIMPLIFY_EPS)
    if (!pts.some(inFrame)) continue
    const routePath = toPath(pts)
    paths.push(routePath)
    if (recent.length < RECENT_COUNT) {
      const last = pts[pts.length - 1]!
      recent.push({
        id: r.id,
        date: r.date,
        d: routePath,
        end: [Math.round(last[0]), Math.round(last[1])],
      })
    }
  }

  const field: RouteField = { group, count: rides.length, paths, recent }
  cache.set(group, field)
  return field
}

/** Standalone SVG for the mask image: black strokes, alpha builds with overlap. */
export function renderRouteFieldSvg(group: ActivityGroup): string {
  const { paths } = getRouteField(group)
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${FIELD_W} ${FIELD_H}" width="${FIELD_W}" height="${FIELD_H}">` +
    '<g fill="none" stroke="#000" stroke-opacity="0.2" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
    paths.map((d) => `<path d="${d}"/>`).join('') +
    '</g></svg>'
  )
}
