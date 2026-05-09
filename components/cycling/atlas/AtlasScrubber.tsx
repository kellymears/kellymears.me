'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import type { DensityBucket, JoinedRide } from '@/lib/cycling-atlas'

const DAY_MS = 24 * 60 * 60 * 1000

export const PLAYBACK_SPEEDS = [0.25, 0.5, 1, 2, 4] as const
export type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number]

interface AtlasScrubberProps {
  rangeMin: Date
  rangeMax: Date
  range: [Date, Date]
  density: DensityBucket[]
  onChange: (next: [Date, Date]) => void
  onReset?: () => void
  // Playback
  isPlaying: boolean
  playbackSpeed: PlaybackSpeed
  playingRide: JoinedRide | null
  canPlay: boolean
  onPlayToggle: () => void
  onSpeedChange: (next: PlaybackSpeed) => void
  onUserScrub: () => void
}

type Handle = 'start' | 'end' | 'middle' | null

function snapToDay(ms: number): number {
  return Math.floor(ms / DAY_MS) * DAY_MS
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n))
}

function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatRangeSummary(start: Date, end: Date, totalRides: number): string {
  const days = Math.max(1, Math.round((end.getTime() - start.getTime()) / DAY_MS))
  return `${totalRides} rides · ${days} day${days === 1 ? '' : 's'}`
}

export function AtlasScrubber({
  rangeMin,
  rangeMax,
  range,
  density,
  onChange,
  onReset,
  isPlaying,
  playbackSpeed,
  playingRide,
  canPlay,
  onPlayToggle,
  onSpeedChange,
  onUserScrub,
}: AtlasScrubberProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{
    handle: Handle
    startX: number
    startRange: [number, number]
    trackWidth: number
  } | null>(null)
  const [activeHandle, setActiveHandle] = useState<Handle>(null)

  const minMs = rangeMin.getTime()
  const maxMs = rangeMax.getTime()
  const span = Math.max(1, maxMs - minMs)

  const startMs = range[0].getTime()
  const endMs = range[1].getTime()

  const startPct = ((startMs - minMs) / span) * 100
  const endPct = ((endMs - minMs) / span) * 100

  // Pre-compute density positions.
  const histogram = useMemo(() => {
    if (density.length === 0) return [] as { x: number; h: number; weekStartMs: number }[]
    const max = Math.max(1, ...density.map((d) => d.count))
    return density.map((d) => ({
      x: ((d.weekStartMs - minMs) / span) * 100,
      h: d.count / max,
      weekStartMs: d.weekStartMs,
    }))
  }, [density, minMs, span])

  // Active rides count = sum of weekly buckets within range
  const ridesInRange = useMemo(() => {
    let n = 0
    for (const d of density) {
      if (d.weekStartMs + 7 * DAY_MS >= startMs && d.weekStartMs <= endMs) n += d.count
    }
    return n
  }, [density, startMs, endMs])

  function startDrag(handle: Handle, clientX: number) {
    const rect = trackRef.current?.getBoundingClientRect()
    if (!rect) return
    onUserScrub()
    dragRef.current = {
      handle,
      startX: clientX,
      startRange: [startMs, endMs],
      trackWidth: rect.width,
    }
    setActiveHandle(handle)
  }

  useEffect(() => {
    function onMove(e: PointerEvent) {
      const drag = dragRef.current
      if (!drag) return
      const dx = e.clientX - drag.startX
      const deltaPct = (dx / drag.trackWidth) * 100
      const deltaMs = (deltaPct / 100) * span
      let nextStart = drag.startRange[0]
      let nextEnd = drag.startRange[1]
      if (drag.handle === 'start') {
        nextStart = clamp(snapToDay(drag.startRange[0] + deltaMs), minMs, nextEnd - DAY_MS)
      } else if (drag.handle === 'end') {
        nextEnd = clamp(snapToDay(drag.startRange[1] + deltaMs), nextStart + DAY_MS, maxMs)
      } else if (drag.handle === 'middle') {
        const width = drag.startRange[1] - drag.startRange[0]
        let s = snapToDay(drag.startRange[0] + deltaMs)
        s = clamp(s, minMs, maxMs - width)
        nextStart = s
        nextEnd = s + width
      }
      onChange([new Date(nextStart), new Date(nextEnd)])
    }
    function onUp() {
      if (dragRef.current) {
        dragRef.current = null
        setActiveHandle(null)
      }
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [maxMs, minMs, onChange, span])

  // Keyboard support: ←/→ nudges focused handle by a day
  function onHandleKey(handle: 'start' | 'end', e: React.KeyboardEvent) {
    const step = e.shiftKey ? 7 * DAY_MS : DAY_MS
    let dir = 0
    if (e.key === 'ArrowLeft') dir = -1
    else if (e.key === 'ArrowRight') dir = 1
    else return
    e.preventDefault()
    if (handle === 'start') {
      const next = clamp(snapToDay(startMs + dir * step), minMs, endMs - DAY_MS)
      onChange([new Date(next), range[1]])
    } else {
      const next = clamp(snapToDay(endMs + dir * step), startMs + DAY_MS, maxMs)
      onChange([range[0], new Date(next)])
    }
  }

  const dragging = activeHandle

  return (
    <div className="pointer-events-auto absolute inset-x-4 bottom-4 z-10 rounded-xl bg-white/90 p-3 shadow-lg ring-1 ring-gray-200 backdrop-blur dark:bg-gray-900/90 dark:ring-gray-800">
      <div className="mb-2 flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <PlaybackControls
            isPlaying={isPlaying}
            speed={playbackSpeed}
            canPlay={canPlay}
            onToggle={onPlayToggle}
            onSpeedChange={onSpeedChange}
          />
          {isPlaying && playingRide ? (
            <div className="flex items-baseline gap-2">
              <span className="text-primary-700 dark:text-primary-300 max-w-[260px] truncate text-sm font-medium">
                {playingRide.name}
              </span>
              <span className="font-mono text-[11px] text-gray-500 tabular-nums dark:text-gray-400">
                {formatDate(playingRide.date)}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-gray-700 tabular-nums dark:text-gray-300">
                {formatDate(range[0])} <span className="text-gray-400">→</span>{' '}
                {formatDate(range[1])}
              </span>
              <span className="text-gray-500 dark:text-gray-400">
                {formatRangeSummary(range[0], range[1], ridesInRange)}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full px-2 py-0.5 text-[11px] text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        >
          Reset
        </button>
      </div>

      <div
        ref={trackRef}
        className="relative h-16 w-full rounded-md bg-gray-100 select-none dark:bg-gray-800/60"
      >
        {/* Histogram */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          {histogram.map((b, i) => {
            const next = histogram[i + 1]
            const w = next ? next.x - b.x : 100 - b.x
            const inRange = b.weekStartMs + 7 * DAY_MS >= startMs && b.weekStartMs <= endMs
            return (
              <rect
                key={b.weekStartMs}
                x={b.x}
                y={100 - b.h * 100}
                width={Math.max(0.15, w * 0.95)}
                height={b.h * 100}
                className={
                  inRange
                    ? 'fill-primary-500/85 dark:fill-primary-400/85'
                    : 'fill-gray-300 dark:fill-gray-700'
                }
              />
            )
          })}
        </svg>

        {/* Selection band */}
        <div
          className={`border-primary-600/70 bg-primary-500/10 dark:border-primary-400/70 dark:bg-primary-400/10 absolute top-0 bottom-0 cursor-grab touch-none border-x-2 ${
            dragging === 'middle' ? 'cursor-grabbing' : ''
          }`}
          style={{ left: `${startPct}%`, right: `${100 - endPct}%` }}
          onPointerDown={(e) => {
            // Only start a "middle" drag if the click landed on the band itself,
            // not on a handle (handles re-emit pointerdown via their own listener).
            if (e.target !== e.currentTarget) return
            ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
            startDrag('middle', e.clientX)
          }}
        />

        {/* Start handle */}
        <button
          type="button"
          aria-label={`Range start: ${formatDate(range[0])}`}
          className="absolute top-0 bottom-0 -translate-x-1/2 cursor-ew-resize touch-none focus:outline-none"
          style={{ left: `${startPct}%`, width: 18 }}
          onPointerDown={(e) => {
            ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
            startDrag('start', e.clientX)
          }}
          onKeyDown={(e) => onHandleKey('start', e)}
        >
          <span className="bg-primary-600 dark:bg-primary-400 pointer-events-none absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full shadow-[0_0_0_1px_white] dark:shadow-[0_0_0_1px_#0a0a0c]" />
        </button>

        {/* End handle */}
        <button
          type="button"
          aria-label={`Range end: ${formatDate(range[1])}`}
          className="absolute top-0 bottom-0 -translate-x-1/2 cursor-ew-resize touch-none focus:outline-none"
          style={{ left: `${endPct}%`, width: 18 }}
          onPointerDown={(e) => {
            ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
            startDrag('end', e.clientX)
          }}
          onKeyDown={(e) => onHandleKey('end', e)}
        >
          <span className="bg-primary-600 dark:bg-primary-400 pointer-events-none absolute top-0 bottom-0 left-1/2 w-[3px] -translate-x-1/2 rounded-full shadow-[0_0_0_1px_white] dark:shadow-[0_0_0_1px_#0a0a0c]" />
        </button>
      </div>

      <div className="mt-1.5 flex justify-between font-mono text-[10px] text-gray-400 tabular-nums dark:text-gray-500">
        <span>{rangeMin.getFullYear()}</span>
        <span>{rangeMax.getFullYear()}</span>
      </div>
    </div>
  )
}

interface PlaybackControlsProps {
  isPlaying: boolean
  speed: PlaybackSpeed
  canPlay: boolean
  onToggle: () => void
  onSpeedChange: (next: PlaybackSpeed) => void
}

function PlaybackControls({
  isPlaying,
  speed,
  canPlay,
  onToggle,
  onSpeedChange,
}: PlaybackControlsProps) {
  const idx = PLAYBACK_SPEEDS.indexOf(speed)
  const slower = () => onSpeedChange(PLAYBACK_SPEEDS[Math.max(0, idx - 1)]!)
  const faster = () =>
    onSpeedChange(PLAYBACK_SPEEDS[Math.min(PLAYBACK_SPEEDS.length - 1, idx + 1)]!)

  const btn =
    'flex h-7 w-7 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100'

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Slow down"
        title="Slow down (½×)"
        onClick={slower}
        disabled={idx <= 0}
        className={btn}
      >
        <ChevronLeft size={16} strokeWidth={2.5} />
      </button>
      <button
        type="button"
        aria-label={isPlaying ? 'Pause' : 'Play'}
        title={isPlaying ? 'Pause' : 'Play'}
        onClick={onToggle}
        disabled={!canPlay}
        className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 disabled:hover:bg-primary-600 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isPlaying ? (
          <Pause size={14} strokeWidth={2.5} fill="currentColor" />
        ) : (
          <Play size={14} strokeWidth={2.5} fill="currentColor" className="translate-x-[1px]" />
        )}
      </button>
      <button
        type="button"
        aria-label="Speed up"
        title="Speed up (2×)"
        onClick={faster}
        disabled={idx >= PLAYBACK_SPEEDS.length - 1}
        className={btn}
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
      <span className="ml-1 inline-flex items-center rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] font-medium text-gray-700 tabular-nums dark:bg-gray-800 dark:text-gray-300">
        {speed}×
      </span>
    </div>
  )
}
