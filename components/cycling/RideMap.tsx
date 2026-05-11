'use client'

import 'maplibre-gl/dist/maplibre-gl.css'
import type { Map as MaplibreMap, StyleSpecification } from 'maplibre-gl'
import { Bike, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  STADIA_LIGHT_STYLE as LIGHT_STYLE,
  STADIA_DARK_STYLE as DARK_STYLE,
  isDarkNow,
  readGradientStops,
  gradientExpression,
} from '@/lib/cycling-map-utils'
import { bearingDeg, chaikinSmooth, cumulativeLengths, pointAtProgress } from '@/lib/cycling-atlas'
import { METERS_TO_MILES, MPH_TO_MPS } from '@/lib/cycling-units'

const ROUTE_CASING_LIGHT = '#ffffff'
const ROUTE_CASING_DARK = '#0a0a0c'
const START_COLOR = '#22c55e'
const END_COLOR = '#ef4444'
const IDLE_PITCH = 45

const TRAIL_SOURCE_ID = 'ride-trail'
const TRAIL_LAYER_ID = 'ride-trail'
const DOT_SOURCE_ID = 'ride-dot'
const DOT_LAYER_ID = 'ride-dot'

// Apparent ground speed of the playback dot at 1×. Slower than the atlas
// constant so a single-ride flythrough has a more cinematic pace — a 30-mile
// ride takes ~3.5 min at 1×, ~7 min at 0.5×.
const APPARENT_MPH_AT_1X = 500

const PLAYBACK_SPEEDS = [0.25, 0.5, 1, 2, 4] as const
type PlaybackSpeed = (typeof PLAYBACK_SPEEDS)[number]
const DEFAULT_SPEED: PlaybackSpeed = 0.5

// Slower playback = tighter, more pitched (game-like).
// Faster = farther, more top-down (atlas-like).
const SPEED_CAMERA: Record<number, { pitch: number; zoom: number }> = {
  0.25: { pitch: 65, zoom: 17 },
  0.5: { pitch: 60, zoom: 16.2 },
  1: { pitch: 55, zoom: 15.4 },
  2: { pitch: 45, zoom: 14.6 },
  4: { pitch: 32, zoom: 13.8 },
}
function cameraForSpeed(speed: number): { pitch: number; zoom: number } {
  return SPEED_CAMERA[speed] ?? SPEED_CAMERA[1]!
}

// Slew-rate limit on camera yaw. On sharp turns (switchbacks, U-turns) the
// instantaneous bearing diff can be ~180°, and even after EMA smoothing the
// per-frame step is large enough to spin the camera frantically. Capping
// the angular velocity makes the camera lag through the turn and settle
// onto the new heading after the rider has straightened out.
const MAX_YAW_RATE_DEG_PER_S = 140

interface RideRouteFile {
  slug: string
  id: string
  sportType: string
  startTime: string
  name: string
  // Stored as [lat, lng]; flipped to [lng, lat] on load for MapLibre.
  coordinates: [number, number][]
}

interface RideMapProps {
  slug: string
  className?: string
  // Distance (meters) used to size playback duration. Optional — if absent we
  // fall back to a constant per-ride duration.
  distanceMeters?: number
}

export function RideMap({ slug, className, distanceMeters }: RideMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MaplibreMap | null>(null)
  const lineCoordsRef = useRef<[number, number][] | null>(null)
  const lensRef = useRef<number[] | null>(null)
  const boundsRef = useRef<[[number, number], [number, number]] | null>(null)
  const [missing, setMissing] = useState(false)
  const [ready, setReady] = useState(false)
  // Auto-play on mount — visitors land on a ride page expecting motion. The
  // play/pause button still works the moment the map is ready.
  const [isPlaying, setIsPlaying] = useState(true)
  const [speed, setSpeed] = useState<PlaybackSpeed>(DEFAULT_SPEED)
  const speedRef = useRef<PlaybackSpeed>(DEFAULT_SPEED)
  useEffect(() => {
    speedRef.current = speed
  }, [speed])

  useEffect(() => {
    if (!containerRef.current) return
    let cancelled = false

    async function init() {
      const [{ Map, Marker }, routeRes] = await Promise.all([
        import('maplibre-gl'),
        fetch(`/static/data/rides/${slug}.json`),
      ])
      if (cancelled) return

      if (!routeRes.ok) {
        setMissing(true)
        return
      }
      const route = (await routeRes.json()) as RideRouteFile
      if (cancelled) return
      if (!route.coordinates || route.coordinates.length < 2) {
        setMissing(true)
        return
      }

      // Soften GPS angularity. The imported polyline is Douglas-Peucker
      // simplified, which preserves max-deviation points exactly — including
      // the noisy zig-zags from GPS jitter. Chaikin rounds each interior
      // corner without moving endpoints, producing a smoother visual line
      // and a calmer playback path.
      const flipped: [number, number][] = route.coordinates.map(([lat, lng]) => [lng, lat])
      const lineCoords = chaikinSmooth(flipped, 2)
      lineCoordsRef.current = lineCoords
      lensRef.current = cumulativeLengths(lineCoords)

      let minLng = Infinity
      let maxLng = -Infinity
      let minLat = Infinity
      let maxLat = -Infinity
      for (const [lng, lat] of lineCoords) {
        if (lng < minLng) minLng = lng
        if (lng > maxLng) maxLng = lng
        if (lat < minLat) minLat = lat
        if (lat > maxLat) maxLat = lat
      }
      boundsRef.current = [
        [minLng, minLat],
        [maxLng, maxLat],
      ]

      const map = new Map({
        container: containerRef.current!,
        style: isDarkNow() ? DARK_STYLE : LIGHT_STYLE,
        bounds: boundsRef.current,
        fitBoundsOptions: { padding: 60, duration: 0 },
        attributionControl: { compact: true },
        cooperativeGestures: true,
      })

      function casingColor() {
        return isDarkNow() ? ROUTE_CASING_DARK : ROUTE_CASING_LIGHT
      }
      function trailColor() {
        return isDarkNow() ? '#ffffff' : '#0f172a'
      }

      function addRouteLayers(m: MaplibreMap) {
        if (m.getSource('route')) return
        m.addSource('route', {
          type: 'geojson',
          lineMetrics: true, // required for line-progress / line-gradient
          data: {
            type: 'Feature',
            properties: {},
            geometry: { type: 'LineString', coordinates: lineCoords },
          },
        })
        m.addLayer({
          id: 'route-casing',
          type: 'line',
          source: 'route',
          paint: {
            'line-color': casingColor(),
            'line-width': 8,
          },
          layout: { 'line-cap': 'round', 'line-join': 'round' },
        })
        m.addLayer({
          id: 'route-line',
          type: 'line',
          source: 'route',
          paint: {
            'line-gradient': gradientExpression(readGradientStops()),
            'line-width': 4.5,
          },
          layout: { 'line-cap': 'round', 'line-join': 'round' },
        })

        // Playback layers — empty until the user presses play.
        if (!m.getSource(TRAIL_SOURCE_ID)) {
          m.addSource(TRAIL_SOURCE_ID, {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] },
          })
        }
        if (!m.getLayer(TRAIL_LAYER_ID)) {
          m.addLayer({
            id: TRAIL_LAYER_ID,
            type: 'line',
            source: TRAIL_SOURCE_ID,
            layout: { 'line-cap': 'round', 'line-join': 'round' },
            paint: {
              'line-color': trailColor(),
              'line-width': 5,
              'line-opacity': 1,
            },
          })
        }
        if (!m.getSource(DOT_SOURCE_ID)) {
          m.addSource(DOT_SOURCE_ID, {
            type: 'geojson',
            data: { type: 'FeatureCollection', features: [] },
          })
        }
        if (!m.getLayer(DOT_LAYER_ID)) {
          m.addLayer({
            id: DOT_LAYER_ID,
            type: 'circle',
            source: DOT_SOURCE_ID,
            paint: {
              'circle-radius': 7,
              'circle-color': trailColor(),
              'circle-stroke-color': casingColor(),
              'circle-stroke-width': 2,
            },
          })
        }
      }

      function reapplyRoutePaint(m: MaplibreMap) {
        if (!m.getLayer('route-line')) return
        m.setPaintProperty('route-line', 'line-gradient', gradientExpression(readGradientStops()))
        m.setPaintProperty('route-casing', 'line-color', casingColor())
        if (m.getLayer(TRAIL_LAYER_ID)) {
          m.setPaintProperty(TRAIL_LAYER_ID, 'line-color', trailColor())
        }
        if (m.getLayer(DOT_LAYER_ID)) {
          m.setPaintProperty(DOT_LAYER_ID, 'circle-color', trailColor())
          m.setPaintProperty(DOT_LAYER_ID, 'circle-stroke-color', casingColor())
        }
      }

      map.on('load', () => {
        if (cancelled) return
        // Apply pitch after the bounds fit, otherwise fitBounds resets it to 0.
        map.easeTo({ pitch: IDLE_PITCH, duration: 600 })
        addRouteLayers(map)
        reapplyRoutePaint(map)
        new Marker({ color: START_COLOR, scale: 0.7 }).setLngLat(lineCoords[0]!).addTo(map)
        new Marker({ color: END_COLOR, scale: 0.7 })
          .setLngLat(lineCoords[lineCoords.length - 1]!)
          .addTo(map)
        setReady(true)
      })

      const observer = new MutationObserver(() => {
        const dark = isDarkNow()
        map.setStyle(dark ? DARK_STYLE : LIGHT_STYLE, {
          transformStyle: (previous, next) => {
            if (!previous) return next
            const sources: StyleSpecification['sources'] = { ...next.sources }
            if (previous.sources.route) sources.route = previous.sources.route
            if (previous.sources[TRAIL_SOURCE_ID])
              sources[TRAIL_SOURCE_ID] = previous.sources[TRAIL_SOURCE_ID]
            if (previous.sources[DOT_SOURCE_ID])
              sources[DOT_SOURCE_ID] = previous.sources[DOT_SOURCE_ID]
            const customLayers = previous.layers.filter(
              (l) =>
                l.id === 'route-casing' ||
                l.id === 'route-line' ||
                l.id === TRAIL_LAYER_ID ||
                l.id === DOT_LAYER_ID
            )
            return {
              ...next,
              sources,
              layers: [...next.layers, ...customLayers],
            }
          },
        })
        map.once('idle', () => reapplyRoutePaint(map))
      })
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })

      mapRef.current = map
      ;(map as unknown as { __themeObserver: MutationObserver }).__themeObserver = observer
    }

    init()

    return () => {
      cancelled = true
      const map = mapRef.current
      if (map) {
        const obs = (map as unknown as { __themeObserver?: MutationObserver }).__themeObserver
        obs?.disconnect()
        map.remove()
        mapRef.current = null
      }
    }
  }, [slug])

  // Playback engine. Drives trail + dot sources and tracks the camera
  // (center=dot, bearing=heading, pitch+zoom from speed table). Mirrors the
  // AtlasMap loop but for a single ride.
  useEffect(() => {
    const map = mapRef.current
    const coords = lineCoordsRef.current
    const lens = lensRef.current
    const bounds = boundsRef.current
    if (!map || !coords || !lens || !bounds || !ready) return

    const trailSrc = () => map.getSource(TRAIL_SOURCE_ID) as maplibregl.GeoJSONSource | undefined
    const dotSrc = () => map.getSource(DOT_SOURCE_ID) as maplibregl.GeoJSONSource | undefined
    const emptyFc = { type: 'FeatureCollection' as const, features: [] }

    if (!isPlaying) {
      trailSrc()?.setData(emptyFc)
      dotSrc()?.setData(emptyFc)
      // Restore the idle camera — full route bounds, gentle pitch.
      map.easeTo({ pitch: IDLE_PITCH, duration: 600 })
      map.fitBounds(bounds, { padding: 60, duration: 700, maxZoom: 14, pitch: IDLE_PITCH })
      return
    }

    // Real time = ride distance / apparent ground speed. Distance is in meters;
    // if we don't have it, fall back to a constant 90s ride at 1×.
    const distance = distanceMeters && distanceMeters > 0 ? distanceMeters : 48000
    let progress = 0
    let lastTs = 0
    let raf = 0
    let cancelled = false
    let smoothedBearing: number | null = null
    const initialCam = cameraForSpeed(speedRef.current)
    let smoothedPitch = initialCam.pitch
    let smoothedZoom = initialCam.zoom

    function trailCoordsAt(p: number): [number, number][] {
      if (coords!.length === 0) return []
      if (p <= 0) return [coords![0]!]
      if (p >= 1) return coords!
      const total = lens![lens!.length - 1]!
      const target = p * total
      let lo = 0
      let hi = lens!.length - 1
      while (lo < hi - 1) {
        const mid = (lo + hi) >>> 1
        if (lens![mid]! <= target) lo = mid
        else hi = mid
      }
      const segLen = lens![hi]! - lens![lo]!
      const t = segLen > 0 ? (target - lens![lo]!) / segLen : 0
      const [lng1, lat1] = coords![lo]!
      const [lng2, lat2] = coords![hi]!
      const interp: [number, number] = [lng1 + (lng2 - lng1) * t, lat1 + (lat2 - lat1) * t]
      const out: [number, number][] = coords!.slice(0, lo + 1)
      out.push(interp)
      return out
    }

    function setTrail(slice: [number, number][]) {
      const src = trailSrc()
      if (!src) return
      src.setData({
        type: 'FeatureCollection',
        features:
          slice.length < 2
            ? []
            : [
                {
                  type: 'Feature',
                  properties: {},
                  geometry: { type: 'LineString', coordinates: slice },
                },
              ],
      })
    }

    function setDot(coord: [number, number]) {
      const src = dotSrc()
      if (!src) return
      src.setData({
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: coord } },
        ],
      })
    }

    function trackCamera(slice: [number, number][], dot: [number, number], dt: number) {
      let bearing = smoothedBearing ?? 0
      if (slice.length >= 2) {
        const a = slice[slice.length - 2]!
        const b = slice[slice.length - 1]!
        const target = bearingDeg(a[0], a[1], b[0], b[1])
        if (smoothedBearing == null) bearing = target
        else {
          let diff = target - smoothedBearing
          if (diff > 180) diff -= 360
          if (diff < -180) diff += 360
          let step = diff * 0.18
          const maxStep = MAX_YAW_RATE_DEG_PER_S * (dt / 1000)
          if (step > maxStep) step = maxStep
          else if (step < -maxStep) step = -maxStep
          bearing = (smoothedBearing + step + 360) % 360
        }
        smoothedBearing = bearing
      }
      const tgt = cameraForSpeed(speedRef.current)
      smoothedPitch += (tgt.pitch - smoothedPitch) * 0.12
      smoothedZoom += (tgt.zoom - smoothedZoom) * 0.12
      map!.jumpTo({ center: dot, bearing, pitch: smoothedPitch, zoom: smoothedZoom })
    }

    function tick(ts: number) {
      if (cancelled) return
      if (lastTs === 0) lastTs = ts
      const dt = ts - lastTs
      lastTs = ts

      const liveSpeed = speedRef.current
      const apparentMps = APPARENT_MPH_AT_1X * Math.max(0.001, liveSpeed) * MPH_TO_MPS
      const rideMs = Math.max(1, (distance / apparentMps) * 1000)
      progress += dt / rideMs

      if (progress >= 1) {
        setTrail(coords!)
        setDot(coords![coords!.length - 1]!)
        cancelled = true
        // Auto-stop on completion.
        setIsPlaying(false)
        return
      }

      const slice = trailCoordsAt(progress)
      const dot = pointAtProgress(coords!, lens!, progress)
      setTrail(slice)
      setDot(dot)
      trackCamera(slice, dot, dt)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
    // speed intentionally excluded — read live via speedRef so mid-playback
    // changes don't tear down the RAF loop and reset progress.
  }, [isPlaying, ready, distanceMeters])

  if (missing) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-gray-200 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-600 ${className ?? ''}`}
      >
        <div className="flex flex-col items-center gap-2 py-12">
          <Bike size={28} strokeWidth={1.5} />
          <p className="text-sm">No GPS for this ride</p>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 ${className ?? ''}`}
    >
      {ready && (
        <RidePlaybackControls
          isPlaying={isPlaying}
          speed={speed}
          onToggle={() => setIsPlaying((p) => !p)}
          onSpeedChange={setSpeed}
        />
      )}
    </div>
  )
}

interface RidePlaybackControlsProps {
  isPlaying: boolean
  speed: PlaybackSpeed
  onToggle: () => void
  onSpeedChange: (next: PlaybackSpeed) => void
}

function RidePlaybackControls({
  isPlaying,
  speed,
  onToggle,
  onSpeedChange,
}: RidePlaybackControlsProps) {
  const idx = PLAYBACK_SPEEDS.indexOf(speed)
  const slower = () => onSpeedChange(PLAYBACK_SPEEDS[Math.max(0, idx - 1)]!)
  const faster = () =>
    onSpeedChange(PLAYBACK_SPEEDS[Math.min(PLAYBACK_SPEEDS.length - 1, idx + 1)]!)

  const btn =
    'flex h-7 w-7 items-center justify-center rounded-full text-gray-700 transition hover:bg-gray-100 hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100'

  return (
    <div className="pointer-events-auto absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full bg-white/90 p-1 shadow-lg ring-1 ring-gray-200 backdrop-blur dark:bg-gray-900/90 dark:ring-gray-800">
      <button
        type="button"
        aria-label="Slow down"
        title="Slow down"
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
        className="bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-400 flex h-8 w-8 items-center justify-center rounded-full text-white shadow-sm transition"
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
        title="Speed up"
        onClick={faster}
        disabled={idx >= PLAYBACK_SPEEDS.length - 1}
        className={btn}
      >
        <ChevronRight size={16} strokeWidth={2.5} />
      </button>
      <span className="mr-2 ml-1 inline-flex items-center font-mono text-[11px] font-medium text-gray-700 tabular-nums dark:text-gray-300">
        {speed}×
      </span>
    </div>
  )
}

declare namespace maplibregl {
  type GeoJSONSource = import('maplibre-gl').GeoJSONSource
}
