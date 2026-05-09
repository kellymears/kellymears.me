'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import {
  computeWeeklyDensity,
  joinRides,
  type JoinedRide,
  type RawMetric,
  type RawRoutesFile,
} from '@/lib/cycling-atlas'
import { AtlasMap } from './AtlasMap'
import { AtlasScrubber, type PlaybackSpeed } from './AtlasScrubber'
import { RideListPanel } from './RideListPanel'
import { PeriodStatsPanel } from './PeriodStatsPanel'

export function Atlas() {
  const [routesFile, setRoutesFile] = useState<RawRoutesFile | null>(null)
  const [metrics, setMetrics] = useState<RawMetric[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId] = useState<string | null>(null)
  const [flyKey, setFlyKey] = useState(0)
  const [range, setRange] = useState<[Date, Date] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackSpeed, setPlaybackSpeed] = useState<PlaybackSpeed>(1)
  const [playingRideId, setPlayingRideId] = useState<string | null>(null)
  // When set, playback is constrained to just this ride. Cleared on natural
  // end, on reset, or when another ride is play-triggered. Pause keeps it set.
  const [singlePlayId, setSinglePlayId] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    Promise.all([
      fetch('/static/data/activities-routes.json').then((r) => r.json()),
      fetch('/static/data/activities-metrics.json').then((r) => r.json()),
    ])
      .then(([r, m]) => {
        if (cancelled) return
        setRoutesFile(r)
        setMetrics(m)
      })
      .catch((e) => !cancelled && setError(String(e)))
    return () => {
      cancelled = true
    }
  }, [])

  const allRides: JoinedRide[] = useMemo(
    () => (routesFile && metrics ? joinRides(routesFile.rides, metrics) : []),
    [routesFile, metrics]
  )

  // Default range = full span, set once when data lands.
  useEffect(() => {
    if (allRides.length === 0 || range) return
    setRange([allRides[0]!.date, allRides[allRides.length - 1]!.date])
  }, [allRides, range])

  const density = useMemo(() => computeWeeklyDensity(allRides), [allRides])

  const filteredRides = useMemo(() => {
    if (!range) return allRides
    const startMs = range[0].getTime()
    const endMs = range[1].getTime()
    return allRides.filter((r) => r.dateMs >= startMs && r.dateMs <= endMs)
  }, [allRides, range])

  const handleSelectId = (id: string | null) => {
    // Clicking a ride during playback pauses playback so the user can inspect.
    if (isPlaying) setIsPlaying(false)
    setSelectedId(id)
    if (id) setFlyKey((k) => k + 1)
  }

  const handlePlayToggle = () => {
    // Pool of rides to play — single mode (one ride) or full filtered range.
    const pool = singlePlayId ? allRides.filter((r) => r.id === singlePlayId) : filteredRides
    if (pool.length === 0) return
    if (!isPlaying) {
      // Starting from scratch (or resuming) — pick a ride if none yet or if
      // the previous one isn't in the current pool.
      if (!playingRideId || !pool.some((r) => r.id === playingRideId)) {
        setPlayingRideId(pool[0]!.id)
      }
      setSelectedId(null)
    }
    setIsPlaying((p) => !p)
  }

  const handlePlayingRideChange = (id: string | null) => {
    setPlayingRideId(id)
  }

  const handlePlaybackEnd = () => {
    setIsPlaying(false)
    // Single-ride playback is one-shot: clear so the next play press goes
    // back to the full filtered range.
    setSinglePlayId(null)
  }

  const handleUserScrub = () => {
    if (isPlaying) setIsPlaying(false)
    // Scrubbing implies the user wants to browse the range, not the single ride.
    if (singlePlayId) setSinglePlayId(null)
  }

  const handlePlaySingle = (id: string) => {
    setSelectedId(null)
    setSinglePlayId(id)
    setPlayingRideId(id)
    setIsPlaying(true)
  }

  const playingRide = useMemo(
    () => (playingRideId ? (allRides.find((r) => r.id === playingRideId) ?? null) : null),
    [allRides, playingRideId]
  )

  // The pool of rides the playback engine should iterate. In single-play mode
  // it's a one-element array; otherwise it's the full filtered range.
  const playableRides = useMemo(() => {
    if (!singlePlayId) return filteredRides
    const ride = allRides.find((r) => r.id === singlePlayId)
    return ride ? [ride] : filteredRides
  }, [singlePlayId, allRides, filteredRides])

  if (error) {
    return (
      <div className="grid h-full place-items-center text-sm text-red-600">
        Failed to load: {error}
      </div>
    )
  }

  if (!routesFile || !metrics || !range || allRides.length === 0) {
    return (
      <div className="grid h-full place-items-center text-sm text-gray-500 dark:text-gray-400">
        Loading atlas…
      </div>
    )
  }

  const allTimeStart = allRides[0]!.date
  const allTimeEnd = allRides[allRides.length - 1]!.date

  return (
    <div className="relative h-full w-full">
      <AtlasMap
        rides={allRides}
        playableRides={playableRides}
        bounds={routesFile.bounds}
        range={range}
        selectedId={selectedId}
        hoveredId={hoveredId}
        onSelectId={handleSelectId}
        onPlayRide={handlePlaySingle}
        flyKey={flyKey}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        playingRideId={playingRideId}
        onPlayingRideChange={handlePlayingRideChange}
        onPlaybackEnd={handlePlaybackEnd}
      />

      <Link
        href="/cycling"
        className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm ring-1 ring-gray-200 backdrop-blur transition hover:bg-white hover:text-gray-900 dark:bg-gray-900/90 dark:text-gray-300 dark:ring-gray-800 dark:hover:bg-gray-900"
      >
        <ArrowLeft size={14} />
        Cycling
      </Link>

      <PeriodStatsPanel rides={filteredRides} />

      <RideListPanel
        rides={filteredRides}
        selectedId={isPlaying ? playingRideId : selectedId}
        playingRideId={isPlaying ? playingRideId : null}
        onSelect={handleSelectId}
        onPlayRide={handlePlaySingle}
      />

      <AtlasScrubber
        rangeMin={allTimeStart}
        rangeMax={allTimeEnd}
        range={range}
        density={density}
        onChange={(next) => {
          handleUserScrub()
          setRange(next)
        }}
        onReset={() => {
          setIsPlaying(false)
          setPlayingRideId(null)
          setSinglePlayId(null)
          setRange([allTimeStart, allTimeEnd])
        }}
        isPlaying={isPlaying}
        playbackSpeed={playbackSpeed}
        playingRide={playingRide}
        canPlay={filteredRides.length > 0}
        onPlayToggle={handlePlayToggle}
        onSpeedChange={setPlaybackSpeed}
        onUserScrub={handleUserScrub}
      />
    </div>
  )
}
