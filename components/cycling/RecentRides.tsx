'use client'

import { Suspense, useState } from 'react'
import { Card } from '@/components/Card'
import type { RecentRide, RideTerrain } from '@/lib/cycling'
import { RIDE_TYPE_ACCENT, RIDE_TYPE_SHORT_LABELS, TERRAIN_COLORS } from '@/lib/cycling-constants'
import {
  ChevronDown,
  Clock,
  Gauge,
  Heart,
  Milestone,
  Mountain,
  Route,
  TreePine,
  Zap,
} from 'lucide-react'

// --- Config ---

const INITIAL_COUNT = 5
const PAGE_SIZE = 5

// --- Terrain pills ---

const TERRAIN_ICONS: Record<string, typeof Milestone> = {
  road: Milestone,
  pavedPath: Route,
  unpaved: TreePine,
}

function TerrainPills({ terrain }: { terrain: RideTerrain }) {
  const total = terrain.road + terrain.pavedPath + terrain.unpaved
  if (total === 0) return null

  const segments = (['road', 'pavedPath', 'unpaved'] as const)
    .map((key) => ({
      key,
      pct: Math.round((terrain[key] / total) * 100),
      color: TERRAIN_COLORS[key]!,
    }))
    .filter((s) => s.pct > 0)

  return (
    <div className="flex shrink-0 items-center gap-1.5">
      {segments.map((seg) => {
        const Icon = TERRAIN_ICONS[seg.key]
        return (
          <span
            key={seg.key}
            className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[10px] leading-none font-medium tabular-nums"
            style={{ backgroundColor: `${seg.color}14`, color: seg.color }}
          >
            {Icon && <Icon size={10} strokeWidth={2.5} />}
            {seg.pct}%
          </span>
        )
      })}
    </div>
  )
}

// --- Route mini SVG ---

function RouteMini({ points, className }: { points: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  )
}

// --- Ride card ---

function RideCard({ ride, index }: { ride: RecentRide; index: number }) {
  return (
    <Card
      variant="stat"
      role="listitem"
      className="animate-fade-slide-up overflow-hidden px-4 py-3.5 duration-200 hover:shadow-sm dark:hover:shadow-gray-950/50"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex gap-3">
        {ride.routePath ? (
          <div className="text-primary-400/50 dark:text-primary-500/40 flex w-14 shrink-0 items-center justify-center">
            <RouteMini points={ride.routePath} className="h-14 w-14" />
          </div>
        ) : (
          <div className="flex w-14 shrink-0 items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <Gauge size={16} strokeWidth={1.5} className="text-gray-300 dark:text-gray-600" />
            </div>
          </div>
        )}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                  {ride.name}
                </p>
                {ride.sportType !== 'Ride' && (
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${RIDE_TYPE_ACCENT[ride.sportType] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'}`}
                  >
                    {RIDE_TYPE_SHORT_LABELS[ride.sportType] ?? ride.sportType}
                  </span>
                )}
              </div>
              <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">{ride.date}</p>
            </div>
            {ride.terrain && <TerrainPills terrain={ride.terrain} />}
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3.5 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
            <span className="font-semibold text-gray-900 dark:text-gray-200">{ride.distance}</span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} strokeWidth={2} className="text-gray-400 dark:text-gray-500" />
              {ride.duration}
            </span>
            <span className="inline-flex items-center gap-1">
              <Mountain size={11} strokeWidth={2} className="text-gray-400 dark:text-gray-500" />
              {ride.elevation}
            </span>
            <span className="inline-flex items-center gap-1">
              <Gauge size={11} strokeWidth={2} className="text-gray-400 dark:text-gray-500" />
              {ride.speed}
            </span>
            {ride.heartrate && (
              <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400">
                <Heart size={11} strokeWidth={2} />
                {ride.heartrate}
              </span>
            )}
            {ride.watts && (
              <span className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400">
                <Zap size={11} strokeWidth={2} />
                {ride.watts}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}

// --- Skeleton ---

function RideCardSkeleton() {
  return (
    <Card variant="stat" hover={false} role="listitem" className="overflow-hidden px-4 py-3.5">
      <div className="flex animate-pulse gap-3">
        <div className="flex w-14 shrink-0 items-center justify-center">
          <div className="h-14 w-14 rounded bg-gray-100 dark:bg-gray-800" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/5 rounded bg-gray-100 dark:bg-gray-800" />
              <div className="h-3 w-1/4 rounded bg-gray-100 dark:bg-gray-800" />
            </div>
            <div className="flex gap-1.5">
              <div className="h-4 w-9 rounded-full bg-gray-100 dark:bg-gray-800" />
              <div className="h-4 w-9 rounded-full bg-gray-100 dark:bg-gray-800" />
            </div>
          </div>
          <div className="mt-3 flex gap-3">
            <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-3 w-10 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-3 w-14 rounded bg-gray-100 dark:bg-gray-800" />
            <div className="h-3 w-12 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </Card>
  )
}

export function RidesSkeleton({ count = INITIAL_COUNT }: { count?: number }) {
  return (
    <div className="space-y-3" role="list">
      {Array.from({ length: count }, (_, i) => (
        <RideCardSkeleton key={i} />
      ))}
    </div>
  )
}

// --- Main component ---

interface RecentRidesProps {
  rides: RecentRide[]
}

export function RecentRides({ rides }: RecentRidesProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [loadingIndices, setLoadingIndices] = useState(new Set<number>())

  if (rides.length === 0) return null

  const hasMore = visibleCount < rides.length

  function loadMore() {
    const nextCount = Math.min(visibleCount + PAGE_SIZE, rides.length)
    const newLoading = new Set<number>()
    for (let i = visibleCount; i < nextCount; i++) {
      newLoading.add(i)
    }
    setVisibleCount(nextCount)
    setLoadingIndices(newLoading)

    // Stagger skeleton → card reveals
    for (let i = visibleCount; i < nextCount; i++) {
      const idx = i
      setTimeout(
        () => {
          setLoadingIndices((prev) => {
            const next = new Set(prev)
            next.delete(idx)
            return next
          })
        },
        (i - visibleCount) * 120 + 200
      )
    }
  }

  return (
    <section className="animate-on-scroll min-w-0 py-8 md:col-span-2" aria-label="Recent rides">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Recent Rides
      </h2>

      <div className="space-y-3" role="list">
        {rides.slice(0, visibleCount).map((ride, i) => (
          <Suspense key={ride.id} fallback={<RideCardSkeleton />}>
            {loadingIndices.has(i) ? <RideCardSkeleton /> : <RideCard ride={ride} index={i} />}
          </Suspense>
        ))}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          className="hover:border-primary-300 hover:text-primary-600 dark:hover:border-primary-700 dark:hover:text-primary-400 mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-500 transition-all active:scale-[0.99] dark:border-gray-800 dark:text-gray-400"
        >
          <ChevronDown size={14} />
          Show more rides
        </button>
      )}
    </section>
  )
}
