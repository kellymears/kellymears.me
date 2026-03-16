'use client'

import type {
  PeriodAverages,
  RecentRide,
  RideBenchmarks,
  RideHistory,
  RideTerrain,
} from '@/lib/cycling'
import { TERRAIN_COLORS, TERRAIN_LABELS } from '@/lib/cycling-constants'
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import {
  Clock,
  Flame,
  Gauge,
  Heart,
  Milestone,
  Mountain,
  Route,
  Timer,
  TreePine,
  X,
  Zap,
} from 'lucide-react'
import { Fragment, type ReactNode } from 'react'

// --- Terrain icons ---

const TERRAIN_ICONS: Record<string, typeof Milestone> = {
  road: Milestone,
  pavedPath: Route,
  unpaved: TreePine,
}

// --- Helpers ---

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

function TrendSpark({
  points,
  current,
}: {
  points: (number | null)[] // [year, 90d, 30d]
  current: number
}) {
  const valid = [...points.filter((p): p is number => p !== null), current]
  if (valid.length < 2) return null

  const min = Math.min(...valid)
  const max = Math.max(...valid)
  const range = max - min || 1

  const W = 36
  const H = 14
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
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="ml-1.5 inline-block shrink-0">
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
      <circle cx={lastPt.x} cy={lastPt.y} r="2" fill={color} />
    </svg>
  )
}

// --- Period averages pills ---

function PeriodPills({ averages, unit }: { averages: PeriodAverages; unit: string }) {
  const items = [
    { label: '30d', value: averages.d30 },
    { label: '90d', value: averages.d90 },
    { label: 'Year', value: averages.year },
  ].filter((i) => i.value !== null)

  if (items.length === 0) return null

  return (
    <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-[10px] text-gray-400 dark:text-gray-500">
      {items.map((item) => (
        <span key={item.label}>
          {item.label} avg: {item.value!.toFixed(1)} {unit}
        </span>
      ))}
    </div>
  )
}

// --- Sub-components ---

function ModalRoute({ points }: { points: string }) {
  return (
    <div className="flex items-center justify-center rounded-xl border border-gray-100 bg-gray-50/80 p-4 dark:border-gray-800 dark:bg-gray-800/30">
      <svg viewBox="0 0 64 64" className="text-primary-400/70 dark:text-primary-500/50 h-32 w-32">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

function ModalTerrainBar({ terrain }: { terrain: RideTerrain }) {
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
    <div className="mt-3">
      <div className="mb-2.5 flex h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        {segments.map((seg) => (
          <div
            key={seg.key}
            className="animate-grow-width first:rounded-l-full last:rounded-r-full"
            style={{ width: `${seg.pct}%`, backgroundColor: seg.color, minWidth: '3px' }}
          />
        ))}
      </div>
      <div className="space-y-1">
        {segments.map((seg) => {
          const Icon = TERRAIN_ICONS[seg.key]
          return (
            <div key={seg.key} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="flex h-5 w-5 items-center justify-center rounded"
                  style={{ backgroundColor: `${seg.color}18`, color: seg.color }}
                >
                  {Icon && <Icon size={11} strokeWidth={2.5} />}
                </span>
                <span className="text-xs text-gray-600 dark:text-gray-400">{seg.label}</span>
              </div>
              <span className="text-xs font-medium text-gray-700 tabular-nums dark:text-gray-300">
                {seg.value.toFixed(1)} mi
                <span className="ml-1 text-gray-400 dark:text-gray-500">({seg.pct}%)</span>
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-2 text-[10px] font-medium tracking-widest text-gray-400 uppercase dark:text-gray-500">
      {children}
    </p>
  )
}

interface StatRowProps {
  icon: typeof Clock
  label: string
  value: string
  accent?: 'rose' | 'blue'
  trend?: { points: (number | null)[]; current: number }
}

function StatRow({ icon: Icon, label, value, accent, trend }: StatRowProps) {
  const valueClass =
    accent === 'rose'
      ? 'text-rose-600 dark:text-rose-400'
      : accent === 'blue'
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-gray-900 dark:text-gray-100'

  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <div className="flex items-center gap-2">
        <Icon
          size={13}
          strokeWidth={2}
          className={
            accent === 'rose'
              ? 'text-rose-400 dark:text-rose-500'
              : accent === 'blue'
                ? 'text-blue-400 dark:text-blue-500'
                : 'text-gray-400 dark:text-gray-500'
          }
        />
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      </div>
      <span className={`flex items-center text-sm font-semibold tabular-nums ${valueClass}`}>
        {value}
        {trend && <TrendSpark points={trend.points} current={trend.current} />}
      </span>
    </div>
  )
}

function Divider() {
  return <div className="border-t border-gray-100 pt-3 dark:border-gray-800" />
}

// --- Percentile ranking chart ---

function RankingChart({ ride, history }: { ride: RecentRide; history: RideHistory }) {
  const metrics = [
    {
      label: 'Distance',
      value: ride.raw.distance,
      values: history.distances,
      unit: 'mi',
    },
    {
      label: 'Speed',
      value: ride.raw.speed,
      values: history.speeds,
      unit: 'mph',
    },
    {
      label: 'Elevation',
      value: ride.raw.elevation,
      values: history.elevations,
      unit: 'ft',
    },
  ]

  return (
    <div>
      <SectionLabel>How This Ride Compares</SectionLabel>
      <p className="mb-3 text-[10px] text-gray-400 dark:text-gray-500">
        vs last {history.distances.length} outdoor rides
      </p>
      <div className="space-y-3">
        {metrics.map((m) => {
          const pct = percentile(m.values, m.value)
          const color = pctColor(pct)
          return (
            <div key={m.label}>
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-gray-500 dark:text-gray-400">{m.label}</span>
                <span className="font-semibold tabular-nums" style={{ color }}>
                  {ordinal(pct)} percentile
                </span>
              </div>
              <div className="relative h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div
                  className="animate-grow-width h-full rounded-full"
                  style={{ width: `${pct}%`, backgroundColor: color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// --- Distribution mini chart ---

function DistributionChart({
  values,
  current,
  label,
}: {
  values: number[]
  current: number
  label: string
}) {
  if (values.length < 5) return null

  const sorted = [...values].sort((a, b) => a - b)
  const max = sorted[sorted.length - 1]!
  const barCount = Math.min(sorted.length, 20)
  const step = Math.ceil(sorted.length / barCount)
  const bars = sorted.filter((_, i) => i % step === 0)
  const barMax = Math.max(...bars, current)

  // Find which bar the current ride is closest to
  let closestIdx = 0
  let closestDist = Infinity
  for (let i = 0; i < bars.length; i++) {
    const dist = Math.abs(bars[i]! - current)
    if (dist < closestDist) {
      closestDist = dist
      closestIdx = i
    }
  }

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-[10px]">
        <span className="text-gray-400 dark:text-gray-500">{label} distribution</span>
        <span className="font-medium text-gray-600 dark:text-gray-400">
          You: {current.toFixed(1)}
        </span>
      </div>
      <div className="flex h-10 items-end gap-[2px]">
        {bars.map((v, i) => {
          const height = barMax > 0 ? (v / barMax) * 100 : 0
          const isCurrent = i === closestIdx
          return (
            <div
              key={i}
              className="flex-1 rounded-t-sm transition-all"
              style={{
                height: `${Math.max(height, 4)}%`,
                backgroundColor: isCurrent ? 'var(--color-primary-500)' : undefined,
              }}
              {...(!isCurrent && {
                className: 'flex-1 rounded-t-sm bg-gray-200 dark:bg-gray-700 transition-all',
              })}
            />
          )
        })}
      </div>
    </div>
  )
}

// --- Source label ---

const SOURCE_LABELS: Record<string, string> = {
  sv: 'Strava',
  hk: 'Apple Health',
  zw: 'Zwift',
  fi: 'Fitbit',
  gm: 'Garmin',
}

// --- Main modal ---

interface RideDetailModalProps {
  ride: RecentRide | null
  benchmarks: RideBenchmarks
  history: RideHistory
  open: boolean
  onClose: () => void
}

export function RideDetailModal({
  ride,
  benchmarks,
  history,
  open,
  onClose,
}: RideDetailModalProps) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" onClose={onClose} className="relative z-50">
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40 dark:bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto p-4 sm:p-6">
          <div className="flex min-h-full items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="scale-95 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="ease-in duration-150"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-95 opacity-0"
            >
              <DialogPanel className="w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl dark:border-gray-800 dark:bg-gray-900">
                {ride && (
                  <ModalContent
                    ride={ride}
                    benchmarks={benchmarks}
                    history={history}
                    onClose={onClose}
                  />
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

function ModalContent({
  ride,
  benchmarks,
  history,
  onClose,
}: {
  ride: RecentRide
  benchmarks: RideBenchmarks
  history: RideHistory
  onClose: () => void
}) {
  const hasStoppedTime = ride.elapsedTime !== ride.duration
  const sourceLabel = SOURCE_LABELS[ride.source] ?? ride.source
  const isVirtual = ride.sportType === 'VirtualRide'

  const trendPoints = (pa: PeriodAverages) => [pa.year, pa.d90, pa.d30]

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 pt-5 pb-3">
        <div className="min-w-0">
          <DialogTitle className="truncate text-lg font-bold text-gray-900 dark:text-gray-100">
            {ride.name}
          </DialogTitle>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {ride.date} · {sourceLabel}
          </p>
        </div>
        <button
          onClick={onClose}
          className="shrink-0 rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300"
          aria-label="Close ride details"
        >
          <X size={18} />
        </button>
      </div>

      {/* Body */}
      <div className="space-y-4 px-5 pb-5">
        {/* Route + Terrain visual */}
        {(ride.routePath || ride.terrain) && (
          <div className="grid gap-4 sm:grid-cols-2">
            {ride.routePath && (
              <div className={ride.terrain ? '' : 'sm:col-span-2'}>
                <ModalRoute points={ride.routePath} />
              </div>
            )}
            {ride.terrain && (
              <div
                className={`${ride.routePath ? '' : 'sm:col-span-2'} flex flex-col justify-center`}
              >
                <SectionLabel>Terrain</SectionLabel>
                <ModalTerrainBar terrain={ride.terrain} />
              </div>
            )}
          </div>
        )}

        {/* Distance & Time */}
        <div>
          <SectionLabel>Distance &amp; Time</SectionLabel>
          <div className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 mb-1 bg-gradient-to-br bg-clip-text text-2xl font-bold tracking-tight text-transparent">
            {ride.distance}
          </div>
          {!isVirtual && <PeriodPills averages={benchmarks.distance} unit="mi" />}
          <div className="mt-2 space-y-0.5">
            <StatRow
              icon={Clock}
              label="Moving"
              value={ride.duration}
              trend={
                !isVirtual
                  ? {
                      points: trendPoints(benchmarks.movingTime),
                      current: ride.raw.movingTime / 60,
                    }
                  : undefined
              }
            />
            {hasStoppedTime && <StatRow icon={Timer} label="Elapsed" value={ride.elapsedTime} />}
            <StatRow
              icon={Mountain}
              label="Elevation"
              value={ride.elevation}
              trend={
                !isVirtual
                  ? { points: trendPoints(benchmarks.elevation), current: ride.raw.elevation }
                  : undefined
              }
            />
          </div>
        </div>

        {/* Speed */}
        <Divider />
        <div>
          <SectionLabel>Speed</SectionLabel>
          <StatRow
            icon={Gauge}
            label="Avg"
            value={ride.speed}
            trend={
              !isVirtual
                ? { points: trendPoints(benchmarks.speed), current: ride.raw.speed }
                : undefined
            }
          />
          {!isVirtual && <PeriodPills averages={benchmarks.speed} unit="mph" />}
          {ride.maxSpeed && <StatRow icon={Gauge} label="Max" value={ride.maxSpeed} />}
        </div>

        {/* Heart Rate */}
        {(ride.heartrate || ride.maxHeartrate) && (
          <>
            <Divider />
            <div>
              <SectionLabel>Heart Rate</SectionLabel>
              {ride.heartrate && (
                <StatRow
                  icon={Heart}
                  label="Avg"
                  value={ride.heartrate}
                  accent="rose"
                  trend={
                    benchmarks.heartRate && ride.raw.heartRate
                      ? { points: trendPoints(benchmarks.heartRate), current: ride.raw.heartRate }
                      : undefined
                  }
                />
              )}
              {benchmarks.heartRate && <PeriodPills averages={benchmarks.heartRate} unit="bpm" />}
              {ride.maxHeartrate && (
                <StatRow icon={Heart} label="Max" value={ride.maxHeartrate} accent="rose" />
              )}
            </div>
          </>
        )}

        {/* Power */}
        {(ride.watts || ride.maxWatts) && (
          <>
            <Divider />
            <div>
              <SectionLabel>Power</SectionLabel>
              {ride.watts && (
                <StatRow
                  icon={Zap}
                  label="Avg"
                  value={ride.watts}
                  accent="blue"
                  trend={
                    benchmarks.power && ride.raw.power
                      ? { points: trendPoints(benchmarks.power), current: ride.raw.power }
                      : undefined
                  }
                />
              )}
              {benchmarks.power && <PeriodPills averages={benchmarks.power} unit="W" />}
              {ride.maxWatts && (
                <StatRow icon={Zap} label="Max" value={ride.maxWatts} accent="blue" />
              )}
            </div>
          </>
        )}

        {/* Calories */}
        {ride.calories && (
          <>
            <Divider />
            <div>
              <SectionLabel>Energy</SectionLabel>
              <StatRow icon={Flame} label="Calories" value={ride.calories} />
            </div>
          </>
        )}

        {/* Comparison charts */}
        {!isVirtual && history.distances.length >= 5 && (
          <>
            <Divider />
            <RankingChart ride={ride} history={history} />

            <div className="grid gap-4 sm:grid-cols-2">
              <DistributionChart
                values={history.distances}
                current={ride.raw.distance}
                label="Distance (mi)"
              />
              <DistributionChart
                values={history.speeds}
                current={ride.raw.speed}
                label="Speed (mph)"
              />
            </div>
          </>
        )}
      </div>
    </>
  )
}
