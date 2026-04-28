'use client'

import type {
  PeriodAverages,
  RecentRide,
  RideBenchmarks,
  RideHistory,
  RideTerrain,
} from '@/lib/cycling'
import { SOURCE_LABELS, TERRAIN_COLORS, TERRAIN_LABELS } from '@/lib/cycling-constants'

export { SOURCE_LABELS }
import {
  Clock,
  Flame,
  Gauge,
  Heart,
  Milestone,
  Mountain,
  RotateCw,
  Route,
  Timer,
  TreePine,
  Zap,
} from 'lucide-react'

// --- Route SVG (preview polyline) ---

function parseRoutePreview(raw: string): { viewBox: string; points: string } {
  const pipe = raw.indexOf('|')
  if (pipe === -1) return { viewBox: '0 0 128 128', points: raw }
  return { viewBox: raw.slice(0, pipe), points: raw.slice(pipe + 1) }
}

export function RideRouteSvg({ path, className }: { path: string; className?: string }) {
  const { viewBox, points } = parseRoutePreview(path)
  return (
    <svg viewBox={viewBox} className={className} aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// --- Terrain icons ---

const TERRAIN_ICONS: Record<string, typeof Milestone> = {
  road: Milestone,
  pavedPath: Route,
  unpaved: TreePine,
}

// --- Stat math helpers ---

function percentile(values: number[], value: number): number {
  if (values.length === 0) return 50
  const below = values.filter((v) => v < value).length
  return Math.round((below / values.length) * 100)
}

function pctColor(pct: number): string {
  if (pct >= 70) return '#22c55e'
  if (pct >= 40) return '#a3a3a3'
  return '#ef4444'
}

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10]! || s[v]! || s[0]!)
}

// --- Trend sparkline ---

function TrendSpark({ points, current }: { points: (number | null)[]; current: number }) {
  const valid = [...points.filter((p): p is number => p !== null), current]
  if (valid.length < 2) return null

  const min = Math.min(...valid)
  const max = Math.max(...valid)
  const range = max - min || 1

  const W = 28
  const H = 12
  const pad = 2

  const normalized = valid.map((v, i) => ({
    x: pad + (i / (valid.length - 1)) * (W - pad * 2),
    y: pad + (1 - (v - min) / range) * (H - pad * 2),
  }))

  const last30d = points[2] ?? points[1] ?? points[0] ?? null
  const isUp = last30d != null && current > last30d * 1.05
  const isDown = last30d != null && current < last30d * 0.95
  const color = isUp ? '#22c55e' : isDown ? '#ef4444' : '#a3a3a3'

  const lastPt = normalized[normalized.length - 1]!

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="shrink-0">
      <path
        d={normalized
          .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
          .join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={lastPt.x} cy={lastPt.y} r="1.5" fill={color} />
    </svg>
  )
}

// --- Terrain inline ---

export function TerrainInline({ terrain }: { terrain: RideTerrain }) {
  const total = terrain.road + terrain.pavedPath + terrain.unpaved
  if (total === 0) return null

  const segments = (['road', 'pavedPath', 'unpaved'] as const)
    .map((key) => ({
      key,
      value: terrain[key],
      pct: Math.round((terrain[key] / total) * 100),
      color: TERRAIN_COLORS[key]!,
      label: TERRAIN_LABELS[key]!,
    }))
    .filter((s) => s.pct > 0)

  return (
    <div>
      <div className="mb-2 flex h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        {segments.map((seg) => (
          <div
            key={seg.key}
            className="animate-grow-width first:rounded-l-full last:rounded-r-full"
            style={{ width: `${seg.pct}%`, backgroundColor: seg.color, minWidth: '3px' }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1">
        {segments.map((seg) => {
          const Icon = TERRAIN_ICONS[seg.key]
          return (
            <span
              key={seg.key}
              className="inline-flex items-center gap-1 text-[11px] text-gray-500 dark:text-gray-400"
            >
              {Icon && <Icon size={10} strokeWidth={2.5} style={{ color: seg.color }} />}
              {seg.pct}% {seg.label.toLowerCase()}
            </span>
          )
        })}
      </div>
    </div>
  )
}

// --- Stat tile ---

interface StatTileProps {
  icon: typeof Clock
  label: string
  value: string
  accent?: 'rose' | 'blue' | 'emerald'
  trend?: { points: (number | null)[]; current: number }
}

function StatTile({ icon: Icon, label, value, accent, trend }: StatTileProps) {
  const valueClass =
    accent === 'rose'
      ? 'text-rose-600 dark:text-rose-400'
      : accent === 'blue'
        ? 'text-blue-600 dark:text-blue-400'
        : accent === 'emerald'
          ? 'text-emerald-600 dark:text-emerald-400'
          : 'text-gray-900 dark:text-gray-100'

  return (
    <div className="rounded-lg bg-gray-50/80 px-3 py-2.5 dark:bg-gray-800/40">
      <div className="mb-1 flex items-center justify-between">
        <Icon
          size={12}
          strokeWidth={2}
          className={
            accent === 'rose'
              ? 'text-rose-400 dark:text-rose-500'
              : accent === 'blue'
                ? 'text-blue-400 dark:text-blue-500'
                : accent === 'emerald'
                  ? 'text-emerald-400 dark:text-emerald-500'
                  : 'text-gray-400 dark:text-gray-500'
          }
        />
        {trend && <TrendSpark points={trend.points} current={trend.current} />}
      </div>
      <p className={`text-sm font-semibold tabular-nums ${valueClass}`}>{value}</p>
      <p className="text-[10px] text-gray-400 dark:text-gray-500">{label}</p>
    </div>
  )
}

// --- Ranking bars ---

function RankingBars({ ride, history }: { ride: RecentRide; history: RideHistory }) {
  const metrics = [
    { label: 'Distance', value: ride.raw.distance, values: history.distances },
    { label: 'Speed', value: ride.raw.speed, values: history.speeds },
    { label: 'Elevation', value: ride.raw.elevation, values: history.elevations },
  ]

  return (
    <div className="space-y-2">
      {metrics.map((m) => {
        const pct = percentile(m.values, m.value)
        const color = pctColor(pct)
        return (
          <div key={m.label} className="flex items-center gap-3">
            <span className="w-16 text-[11px] text-gray-500 dark:text-gray-400">{m.label}</span>
            <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className="animate-grow-width h-full rounded-full"
                style={{ width: `${pct}%`, backgroundColor: color }}
              />
            </div>
            <span
              className="w-10 text-right text-[11px] font-medium tabular-nums"
              style={{ color }}
            >
              {ordinal(pct)}
            </span>
          </div>
        )
      })}
    </div>
  )
}

// --- Period averages table ---

function AveragesTable({ benchmarks }: { benchmarks: RideBenchmarks }) {
  const rows = [
    { label: 'Distance', avg: benchmarks.distance, unit: 'mi' },
    { label: 'Speed', avg: benchmarks.speed, unit: 'mph' },
    { label: 'Elevation', avg: benchmarks.elevation, unit: 'ft' },
  ]

  const hasData = rows.some((r) => r.avg.d30 !== null || r.avg.d90 !== null || r.avg.year !== null)
  if (!hasData) return null

  const fmt = (v: number | null) => (v !== null ? v.toFixed(1) : '–')

  return (
    <table className="w-full text-[11px]">
      <thead>
        <tr className="text-gray-400 dark:text-gray-500">
          <th className="pb-1 text-left font-medium" />
          <th className="pb-1 text-right font-medium">30d</th>
          <th className="pb-1 text-right font-medium">90d</th>
          <th className="pb-1 text-right font-medium">Year</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 dark:text-gray-400">
        {rows.map((r) => (
          <tr key={r.label}>
            <td className="py-0.5 font-medium text-gray-500 dark:text-gray-400">{r.label}</td>
            <td className="py-0.5 text-right tabular-nums">{fmt(r.avg.d30)}</td>
            <td className="py-0.5 text-right tabular-nums">{fmt(r.avg.d90)}</td>
            <td className="py-0.5 text-right tabular-nums">
              {fmt(r.avg.year)} {r.unit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

// --- Main shared body ---

export interface RideDetailContentProps {
  ride: RecentRide
  benchmarks: RideBenchmarks
  history: RideHistory
}

export function RideDetailContent({ ride, benchmarks, history }: RideDetailContentProps) {
  const hasStoppedTime = ride.elapsedTime !== ride.duration
  const tp = (pa: PeriodAverages) => [pa.year, pa.d90, pa.d30]

  const primaryStats: StatTileProps[] = [
    {
      icon: Clock,
      label: 'Moving',
      value: ride.duration,
      trend: { points: tp(benchmarks.movingTime), current: ride.raw.movingTime / 60 },
    },
    {
      icon: Mountain,
      label: 'Elevation',
      value: ride.elevation,
      trend: { points: tp(benchmarks.elevation), current: ride.raw.elevation },
    },
    {
      icon: Gauge,
      label: 'Avg Speed',
      value: ride.speed,
      trend: { points: tp(benchmarks.speed), current: ride.raw.speed },
    },
  ]

  const secondaryStats: StatTileProps[] = []
  if (ride.maxSpeed) secondaryStats.push({ icon: Gauge, label: 'Max Speed', value: ride.maxSpeed })
  if (hasStoppedTime)
    secondaryStats.push({ icon: Timer, label: 'Elapsed', value: ride.elapsedTime })
  if (ride.heartrate)
    secondaryStats.push({
      icon: Heart,
      label: 'Avg HR',
      value: ride.heartrate,
      accent: 'rose',
    })
  if (ride.maxHeartrate)
    secondaryStats.push({ icon: Heart, label: 'Max HR', value: ride.maxHeartrate, accent: 'rose' })
  if (ride.watts)
    secondaryStats.push({
      icon: Zap,
      label: 'Avg Power',
      value: ride.watts,
      accent: 'blue',
      trend:
        benchmarks.power && ride.raw.power
          ? { points: tp(benchmarks.power), current: ride.raw.power }
          : undefined,
    })
  if (ride.maxWatts)
    secondaryStats.push({ icon: Zap, label: 'Max Power', value: ride.maxWatts, accent: 'blue' })
  if (ride.cadence)
    secondaryStats.push({
      icon: RotateCw,
      label: 'Avg Cadence',
      value: ride.cadence,
      accent: 'emerald',
      trend:
        benchmarks.cadence && ride.raw.cadence
          ? { points: tp(benchmarks.cadence), current: ride.raw.cadence }
          : undefined,
    })
  if (ride.calories) secondaryStats.push({ icon: Flame, label: 'Calories', value: ride.calories })

  return (
    <>
      <div className="mb-5">
        <p className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-br bg-clip-text text-3xl font-bold tracking-tight text-transparent">
          {ride.distance}
        </p>
        {ride.terrain && (
          <div className="mt-3">
            <TerrainInline terrain={ride.terrain} />
          </div>
        )}
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2">
        {primaryStats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      {secondaryStats.length > 0 && (
        <div className="mb-5 grid grid-cols-3 gap-2">
          {secondaryStats.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </div>
      )}

      {history.distances.length >= 5 && (
        <div className="border-t border-gray-100 pt-4 dark:border-gray-800">
          <p className="mb-3 text-[10px] font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
            vs recent rides
          </p>
          <RankingBars ride={ride} history={history} />

          <div className="mt-4">
            <AveragesTable benchmarks={benchmarks} />
          </div>
        </div>
      )}
    </>
  )
}
