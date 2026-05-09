'use client'

import { useEffect, useRef } from 'react'
import { Pause, Play } from 'lucide-react'
import { RIDE_TYPE_COLORS, RIDE_TYPE_SHORT_LABELS } from '@/lib/cycling-constants'
import { METERS_TO_FEET, METERS_TO_MILES } from '@/lib/cycling-units'
import { formatDurationShort, type JoinedRide } from '@/lib/cycling-atlas'

interface RideListPanelProps {
  rides: JoinedRide[]
  selectedId: string | null
  /** When set, this row's play button shows a pause icon instead of play. */
  playingRideId: string | null
  onSelect: (id: string) => void
  /** Triggered by the per-row play button — request single-ride playback. */
  onPlayRide: (id: string) => void
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function RideListPanel({
  rides,
  selectedId,
  playingRideId,
  onSelect,
  onPlayRide,
}: RideListPanelProps) {
  const listRef = useRef<HTMLUListElement>(null)
  const selectedRowRef = useRef<HTMLLIElement>(null)

  // When selection changes via the map, scroll the list to the selected row.
  useEffect(() => {
    if (!selectedId) return
    const row = selectedRowRef.current
    if (!row) return
    row.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [selectedId])

  // Newest first.
  const sorted = [...rides].sort((a, b) => b.dateMs - a.dateMs)

  return (
    <div className="pointer-events-auto absolute top-4 right-4 bottom-[12rem] z-10 flex w-[340px] flex-col overflow-hidden rounded-xl bg-white/90 shadow-lg ring-1 ring-gray-200 backdrop-blur dark:bg-gray-900/90 dark:ring-gray-800">
      <header className="flex items-baseline justify-between border-b border-gray-200/70 px-4 py-2 dark:border-gray-800/70">
        <h2 className="text-xs font-semibold tracking-widest text-gray-700 uppercase dark:text-gray-300">
          Rides
        </h2>
        <span className="font-mono text-[11px] text-gray-500 tabular-nums dark:text-gray-400">
          {rides.length.toLocaleString()}
        </span>
      </header>

      {sorted.length === 0 ? (
        <div className="grid flex-1 place-items-center px-4 py-12 text-center text-xs text-gray-500 dark:text-gray-400">
          No rides in this period.
        </div>
      ) : (
        <ul
          ref={listRef}
          className="flex-1 divide-y divide-gray-100 overflow-y-auto dark:divide-gray-800/70"
        >
          {sorted.map((r) => {
            const selected = r.id === selectedId
            const playing = r.id === playingRideId
            const miles = (r.distance * METERS_TO_MILES).toFixed(1)
            const elev = Math.round(r.elevationGain * METERS_TO_FEET).toLocaleString()
            const dur = formatDurationShort(r.movingTime)
            const typeLabel = RIDE_TYPE_SHORT_LABELS[r.sportType] ?? r.sportType
            const typeColor = RIDE_TYPE_COLORS[r.sportType] ?? '#8b8b8b'
            return (
              <li
                key={r.id}
                ref={selected ? selectedRowRef : undefined}
                className={
                  selected
                    ? 'bg-primary-50 dark:bg-primary-950/30'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800/40'
                }
              >
                <div className="group flex w-full items-stretch">
                  <button
                    type="button"
                    onClick={() => onSelect(r.id)}
                    title={r.name}
                    className="flex min-w-0 flex-1 flex-col gap-1 px-4 py-2.5 text-left transition"
                  >
                    <div className="flex w-full items-baseline justify-between gap-3">
                      <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                        {r.name}
                      </span>
                      <span className="shrink-0 text-[10px] text-gray-500 dark:text-gray-400">
                        {formatDate(r.date)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-gray-600 dark:text-gray-400">
                      <span className="font-mono tabular-nums">{miles} mi</span>
                      <span aria-hidden className="text-gray-300 dark:text-gray-700">
                        ·
                      </span>
                      <span className="font-mono tabular-nums">{elev} ft</span>
                      <span aria-hidden className="text-gray-300 dark:text-gray-700">
                        ·
                      </span>
                      <span className="font-mono tabular-nums">{dur}</span>
                      <span
                        className="ml-auto inline-flex items-center gap-1 rounded-full bg-gray-100 px-1.5 py-0.5 text-[9px] font-medium tracking-wide text-gray-600 uppercase dark:bg-gray-800 dark:text-gray-400"
                        title={typeLabel}
                      >
                        <span
                          aria-hidden
                          className="size-1.5 rounded-full"
                          style={{ background: typeColor }}
                        />
                        {typeLabel}
                      </span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      onPlayRide(r.id)
                    }}
                    aria-label={playing ? `Now playing: ${r.name}` : `Play ${r.name}`}
                    title={playing ? 'Now playing' : 'Play this ride'}
                    className={
                      playing
                        ? 'bg-primary-600 dark:bg-primary-500 flex w-9 shrink-0 items-center justify-center text-white'
                        : 'hover:text-primary-600 dark:hover:text-primary-400 flex w-9 shrink-0 items-center justify-center text-gray-400 opacity-0 transition group-hover:opacity-100 focus:opacity-100 dark:text-gray-500'
                    }
                  >
                    {playing ? (
                      <Pause size={12} fill="currentColor" strokeWidth={2.5} />
                    ) : (
                      <Play size={12} fill="currentColor" strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
