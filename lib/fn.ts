/**
 * Shared pure utility functions for array aggregation, grouping, and bounds.
 * No Node.js imports — safe for client components.
 */

export interface Bounds2D {
  minX: number
  maxX: number
  minY: number
  maxY: number
}

export function countBy<T>(items: T[], keyFn: (item: T) => string): Map<string, number> {
  const map = new Map<string, number>()
  for (const item of items) {
    const key = keyFn(item)
    map.set(key, (map.get(key) ?? 0) + 1)
  }
  return map
}

export function countByRecord<T>(items: T[], keyFn: (item: T) => string): Record<string, number> {
  const record: Record<string, number> = {}
  for (const item of items) {
    const key = keyFn(item)
    record[key] = (record[key] ?? 0) + 1
  }
  return record
}

export function groupBy<T>(items: T[], keyFn: (item: T) => string): Map<string, T[]> {
  const map = new Map<string, T[]>()
  for (const item of items) {
    const key = keyFn(item)
    const group = map.get(key)
    if (group) group.push(item)
    else map.set(key, [item])
  }
  return map
}

export function bounds2d(points: [number, number][]): Bounds2D {
  if (points.length === 0) return { minX: 0, maxX: 0, minY: 0, maxY: 0 }

  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity

  for (const [x, y] of points) {
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }

  return { minX, maxX, minY, maxY }
}

export function sumBy<T>(items: T[], fn: (item: T) => number): number {
  let total = 0
  for (const item of items) total += fn(item)
  return total
}

export function maxBy<T>(items: T[], fn: (item: T) => number): number {
  if (items.length === 0) return 0
  let max = -Infinity
  for (const item of items) {
    const val = fn(item)
    if (val > max) max = val
  }
  return max
}

export function formatCounts(counts: Record<string, number>): string {
  return Object.entries(counts)
    .map(([k, v]) => `${k}=${v}`)
    .join(', ')
}
