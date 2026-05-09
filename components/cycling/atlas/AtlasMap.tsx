'use client'

import 'maplibre-gl/dist/maplibre-gl.css'
import type {
  FilterSpecification,
  Map as MaplibreMap,
  Popup,
  StyleSpecification,
} from 'maplibre-gl'
import { useEffect, useRef } from 'react'
import {
  STADIA_DARK_STYLE,
  STADIA_LIGHT_STYLE,
  holographicLineColor,
  isDarkNow,
} from '@/lib/cycling-map-utils'
import {
  bearingDeg,
  cumulativeLengths,
  pointAtProgress,
  type JoinedRide,
} from '@/lib/cycling-atlas'
import { METERS_TO_FEET, METERS_TO_MILES, MPH_TO_MPS } from '@/lib/cycling-units'

const SOURCE_ID = 'all-rides'
const GLOW_LAYER_ID = 'all-rides-glow'
const BASE_LAYER_ID = 'all-rides-base'
// "Played" variants — same source, different paint (per-ride color via ['get','color'])
// and a filter that lists only completed-during-playback ride ids. Hidden when idle.
const GLOW_PLAYED_LAYER_ID = 'played-rides-glow'
const BASE_PLAYED_LAYER_ID = 'played-rides-base'
const SELECTED_LAYER_ID = 'all-rides-selected'
const HOVER_LAYER_ID = 'all-rides-hover'
const PLAYBACK_TRAIL_SOURCE_ID = 'playback-trail'
const PLAYBACK_TRAIL_LAYER_ID = 'playback-trail'
const PLAYBACK_DOT_SOURCE_ID = 'playback-dot'
const PLAYBACK_DOT_LAYER_ID = 'playback-dot'

// Apparent ground speed of the playback dot at 1× playback. The dot moves at
// this constant speed regardless of ride length, so a 5-mile ride finishes
// in 1/10th the real time of a 50-mile ride. Tunable: 1200 mph at 1× makes
// a 10-mile ride take ~30s at 1×, ~7.5s at 4×, ~2 min at 0.25×.
const APPARENT_MPH_AT_1X = 1200

// Speed → camera. Slower playback = tighter, more pitched (game-like).
// Faster = farther, more top-down (atlas-like).
const SPEED_CAMERA: Record<number, { pitch: number; zoom: number }> = {
  0.25: { pitch: 65, zoom: 16 },
  0.5: { pitch: 60, zoom: 15.2 },
  1: { pitch: 55, zoom: 14.4 },
  2: { pitch: 45, zoom: 13.6 },
  4: { pitch: 32, zoom: 12.8 },
}
function cameraForSpeed(speed: number): { pitch: number; zoom: number } {
  return SPEED_CAMERA[speed] ?? SPEED_CAMERA[1]!
}

interface AtlasMapProps {
  rides: JoinedRide[]
  // The pool of rides the playback engine should iterate (single ride or
  // the full filtered range). Atlas owns this distinction; the map just plays
  // whatever it gets.
  playableRides: JoinedRide[]
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number }
  range: [Date, Date]
  selectedId: string | null
  hoveredId: string | null
  onSelectId: (id: string | null) => void
  // Triggered from the popup's "Play this ride" button.
  onPlayRide: (id: string) => void
  // Bumping this counter tells the map to fly to the currently-selected ride.
  // Used so external "click in list" actions trigger a camera move even when
  // selectedId hasn't changed (e.g. clicking the same ride twice).
  flyKey: number
  // Playback
  isPlaying: boolean
  playbackSpeed: number
  playingRideId: string | null
  onPlayingRideChange: (rideId: string | null) => void
  onPlaybackEnd: () => void
}

function ridesToFeatureCollection(rides: JoinedRide[]) {
  return {
    type: 'FeatureCollection' as const,
    features: rides.map((r) => ({
      type: 'Feature' as const,
      id: r.id,
      properties: {
        id: r.id,
        dateMs: r.dateMs,
        name: r.name,
        distance: r.distance,
        sportType: r.sportType,
        color: r.color,
      },
      geometry: {
        type: 'LineString' as const,
        coordinates: r.coordinates,
      },
    })),
  }
}

function inIdsFilter(ids: string[]): FilterSpecification {
  return ['in', ['get', 'id'], ['literal', ids]] as FilterSpecification
}

function dateRangeFilter(range: [Date, Date]): FilterSpecification {
  return [
    'all',
    ['>=', ['get', 'dateMs'], range[0].getTime()],
    ['<=', ['get', 'dateMs'], range[1].getTime()],
  ] as FilterSpecification
}

function idEqualsFilter(id: string | null): FilterSpecification {
  return ['==', ['get', 'id'], id ?? '__none__'] as FilterSpecification
}

function applyPaintColors(map: MaplibreMap, minDateMs: number, maxDateMs: number) {
  const dark = isDarkNow()
  const holo = holographicLineColor(minDateMs, maxDateMs, dark)
  const selectedColor = dark ? '#ffffff' : '#0f172a'
  const casingColor = dark ? '#000000' : '#ffffff'
  if (map.getLayer(GLOW_LAYER_ID)) {
    map.setPaintProperty(GLOW_LAYER_ID, 'line-color', holo as never)
    map.setPaintProperty(GLOW_LAYER_ID, 'line-opacity', dark ? 0.22 : 0.18)
  }
  if (map.getLayer(BASE_LAYER_ID)) {
    map.setPaintProperty(BASE_LAYER_ID, 'line-color', holo as never)
    map.setPaintProperty(BASE_LAYER_ID, 'line-opacity', dark ? 0.78 : 0.7)
  }
  if (map.getLayer(HOVER_LAYER_ID)) {
    map.setPaintProperty(HOVER_LAYER_ID, 'line-color', holo as never)
  }
  if (map.getLayer(SELECTED_LAYER_ID + '-casing')) {
    map.setPaintProperty(SELECTED_LAYER_ID + '-casing', 'line-color', casingColor)
  }
  if (map.getLayer(SELECTED_LAYER_ID)) {
    map.setPaintProperty(SELECTED_LAYER_ID, 'line-color', selectedColor)
  }
  if (map.getLayer(PLAYBACK_TRAIL_LAYER_ID)) {
    map.setPaintProperty(PLAYBACK_TRAIL_LAYER_ID, 'line-color', selectedColor)
  }
  if (map.getLayer(PLAYBACK_DOT_LAYER_ID)) {
    map.setPaintProperty(PLAYBACK_DOT_LAYER_ID, 'circle-color', selectedColor)
    map.setPaintProperty(PLAYBACK_DOT_LAYER_ID, 'circle-stroke-color', casingColor)
  }
}

function attachLayers(
  map: MaplibreMap,
  fc: ReturnType<typeof ridesToFeatureCollection>,
  minDateMs: number,
  maxDateMs: number
) {
  if (!map.getSource(SOURCE_ID)) {
    map.addSource(SOURCE_ID, {
      type: 'geojson',
      data: fc,
      promoteId: 'id',
    })
  } else {
    const src = map.getSource(SOURCE_ID) as maplibregl.GeoJSONSource
    src.setData(fc)
  }

  if (!map.getLayer(GLOW_LAYER_ID)) {
    map.addLayer({
      id: GLOW_LAYER_ID,
      type: 'line',
      source: SOURCE_ID,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ea580c',
        'line-width': 6,
        'line-blur': 5,
        'line-opacity': 0.16,
      },
    })
  }

  if (!map.getLayer(BASE_LAYER_ID)) {
    map.addLayer({
      id: BASE_LAYER_ID,
      type: 'line',
      source: SOURCE_ID,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ea580c',
        'line-width': 1.6,
        'line-opacity': 0.65,
      },
    })
  }

  // Played-rides variants — visible only during playback. Each ride uses its
  // stable per-id color from the feature property so adjacent/overlapping
  // rides remain distinguishable.
  if (!map.getLayer(GLOW_PLAYED_LAYER_ID)) {
    map.addLayer({
      id: GLOW_PLAYED_LAYER_ID,
      type: 'line',
      source: SOURCE_ID,
      layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'none' },
      paint: {
        'line-color': ['get', 'color'],
        'line-width': 6,
        'line-blur': 5,
        'line-opacity': 0.25,
      },
      filter: inIdsFilter([]),
    })
  }
  if (!map.getLayer(BASE_PLAYED_LAYER_ID)) {
    map.addLayer({
      id: BASE_PLAYED_LAYER_ID,
      type: 'line',
      source: SOURCE_ID,
      layout: { 'line-cap': 'round', 'line-join': 'round', visibility: 'none' },
      paint: {
        'line-color': ['get', 'color'],
        'line-width': 2,
        'line-opacity': 0.95,
      },
      filter: inIdsFilter([]),
    })
  }

  if (!map.getLayer(HOVER_LAYER_ID)) {
    map.addLayer({
      id: HOVER_LAYER_ID,
      type: 'line',
      source: SOURCE_ID,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ea580c',
        'line-width': 2.5,
        'line-opacity': 0.95,
      },
      filter: idEqualsFilter(null),
    })
  }

  if (!map.getLayer(SELECTED_LAYER_ID + '-casing')) {
    map.addLayer({
      id: SELECTED_LAYER_ID + '-casing',
      type: 'line',
      source: SOURCE_ID,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ffffff',
        'line-width': 6,
        'line-opacity': 0.9,
      },
      filter: idEqualsFilter(null),
    })
  }

  if (!map.getLayer(SELECTED_LAYER_ID)) {
    map.addLayer({
      id: SELECTED_LAYER_ID,
      type: 'line',
      source: SOURCE_ID,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#111827',
        'line-width': 3,
        'line-opacity': 1,
      },
      filter: idEqualsFilter(null),
    })
  }

  // Playback trail: a separate source whose geometry is updated per frame
  // with the ride's coordinates sliced to the current progress.
  if (!map.getSource(PLAYBACK_TRAIL_SOURCE_ID)) {
    map.addSource(PLAYBACK_TRAIL_SOURCE_ID, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    })
  }
  if (!map.getLayer(PLAYBACK_TRAIL_LAYER_ID)) {
    map.addLayer({
      id: PLAYBACK_TRAIL_LAYER_ID,
      type: 'line',
      source: PLAYBACK_TRAIL_SOURCE_ID,
      layout: { 'line-cap': 'round', 'line-join': 'round' },
      paint: {
        'line-color': '#ffffff',
        'line-width': 4,
        'line-opacity': 1,
      },
    })
  }

  // Playback dot: source data is empty when not playing, so no feature renders.
  if (!map.getSource(PLAYBACK_DOT_SOURCE_ID)) {
    map.addSource(PLAYBACK_DOT_SOURCE_ID, {
      type: 'geojson',
      data: { type: 'FeatureCollection', features: [] },
    })
  }
  if (!map.getLayer(PLAYBACK_DOT_LAYER_ID)) {
    map.addLayer({
      id: PLAYBACK_DOT_LAYER_ID,
      type: 'circle',
      source: PLAYBACK_DOT_SOURCE_ID,
      paint: {
        'circle-radius': 6,
        'circle-color': '#ffffff',
        'circle-stroke-color': '#0f172a',
        'circle-stroke-width': 2,
      },
    })
  }

  applyPaintColors(map, minDateMs, maxDateMs)
}

function popupHtml(ride: JoinedRide): string {
  const miles = (ride.distance * METERS_TO_MILES).toFixed(1)
  const elev = Math.round(ride.elevationGain * METERS_TO_FEET).toLocaleString()
  const date = ride.date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
  const safe = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)
  return `
    <div class="atlas-popup-card">
      <div class="atlas-popup-title">${safe(ride.name)}</div>
      <div class="atlas-popup-date">${date}</div>
      <div class="atlas-popup-stats">
        <span><strong>${miles}</strong>&nbsp;mi</span>
        <span class="atlas-popup-sep">·</span>
        <span><strong>${elev}</strong>&nbsp;ft</span>
      </div>
      <button type="button" class="atlas-popup-play" data-play-ride>
        <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
          <path d="M3 2v12l11-6z" />
        </svg>
        Play this ride
      </button>
    </div>
  `
}

export function AtlasMap({
  rides,
  playableRides,
  bounds,
  range,
  selectedId,
  hoveredId,
  onSelectId,
  onPlayRide,
  flyKey,
  isPlaying,
  playbackSpeed,
  playingRideId,
  onPlayingRideChange,
  onPlaybackEnd,
}: AtlasMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MaplibreMap | null>(null)
  const popupRef = useRef<Popup | null>(null)
  const ridesByIdRef = useRef<Map<string, JoinedRide>>(new Map())
  const featureCollectionRef = useRef<ReturnType<typeof ridesToFeatureCollection>>({
    type: 'FeatureCollection',
    features: [],
  })
  const dateSpanRef = useRef<[number, number]>([0, 1])
  // Live playback speed read by the RAF loop. Kept in a ref so the loop
  // doesn't tear down + restart (losing in-ride progress) when speed changes.
  const playbackSpeedRef = useRef<number>(playbackSpeed)
  useEffect(() => {
    playbackSpeedRef.current = playbackSpeed
  }, [playbackSpeed])

  // Keep refs in sync with current rides so map handlers stay stable.
  useEffect(() => {
    const m = new Map<string, JoinedRide>()
    for (const r of rides) m.set(r.id, r)
    ridesByIdRef.current = m
    featureCollectionRef.current = ridesToFeatureCollection(rides)
    if (rides.length > 0) {
      dateSpanRef.current = [rides[0]!.dateMs, rides[rides.length - 1]!.dateMs]
    }
    const src = mapRef.current?.getSource(SOURCE_ID) as maplibregl.GeoJSONSource | undefined
    if (src) src.setData(featureCollectionRef.current)
  }, [rides])

  // Initialize map once.
  useEffect(() => {
    if (!containerRef.current) return
    let cancelled = false

    async function init() {
      const { Map: MapCtor, Popup: PopupCtor } = await import('maplibre-gl')
      if (cancelled || !containerRef.current) return
      const styleUrl = isDarkNow() ? STADIA_DARK_STYLE : STADIA_LIGHT_STYLE
      const map = new MapCtor({
        container: containerRef.current,
        style: styleUrl,
        bounds: [
          [bounds.minLng, bounds.minLat],
          [bounds.maxLng, bounds.maxLat],
        ],
        fitBoundsOptions: { padding: { top: 80, right: 400, bottom: 140, left: 80 } },
        attributionControl: { compact: true },
        cooperativeGestures: false,
      })
      mapRef.current = map

      map.on('load', () => {
        const [minMs, maxMs] = dateSpanRef.current
        attachLayers(map, featureCollectionRef.current, minMs, maxMs)
        const filter = dateRangeFilter(range)
        map.setFilter(BASE_LAYER_ID, filter)
        map.setFilter(GLOW_LAYER_ID, filter)
      })

      // Click anywhere on a ride line → select it.
      map.on('click', BASE_LAYER_ID, (e) => {
        const f = e.features?.[0]
        if (!f) return
        const id = String(f.properties?.id ?? '')
        if (id) onSelectId(id)
      })
      // Empty-area click clears selection + popup.
      map.on('click', (e) => {
        const hits = map.queryRenderedFeatures(e.point, { layers: [BASE_LAYER_ID] })
        if (hits.length === 0) onSelectId(null)
      })
      // Cursor affordance on hover.
      map.on('mouseenter', BASE_LAYER_ID, () => {
        map.getCanvas().style.cursor = 'pointer'
      })
      map.on('mouseleave', BASE_LAYER_ID, () => {
        map.getCanvas().style.cursor = ''
      })

      // Theme switch — swap style and re-attach layers.
      const observer = new MutationObserver(() => {
        const targetStyle = isDarkNow() ? STADIA_DARK_STYLE : STADIA_LIGHT_STYLE
        map.setStyle(targetStyle as unknown as StyleSpecification, {
          transformStyle: (_prev, next) => next,
        })
        map.once('styledata', () => {
          const [minMs, maxMs] = dateSpanRef.current
          attachLayers(map, featureCollectionRef.current, minMs, maxMs)
          const dateFilter = dateRangeFilter(range)
          map.setFilter(BASE_LAYER_ID, dateFilter)
          map.setFilter(GLOW_LAYER_ID, dateFilter)
          // Re-apply selected/hover filters
          if (mapRef.current?.getLayer(SELECTED_LAYER_ID)) {
            const filter = idEqualsFilter(selectedId)
            mapRef.current.setFilter(SELECTED_LAYER_ID, filter)
            mapRef.current.setFilter(SELECTED_LAYER_ID + '-casing', filter)
          }
        })
      })
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

      return () => {
        observer.disconnect()
      }
    }

    let cleanup: (() => void) | undefined
    init().then((c) => {
      cleanup = c
    })

    return () => {
      cancelled = true
      cleanup?.()
      popupRef.current?.remove()
      mapRef.current?.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Filter the idle BASE/GLOW layers. Selecting a single ride mutes the rest;
  // otherwise just respect the scrubber's date range. Skipped during playback
  // (the played-rides layers are visible then, with their own filter).
  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.getLayer(BASE_LAYER_ID)) return
    if (isPlaying) return
    const filter = selectedId ? idEqualsFilter(selectedId) : dateRangeFilter(range)
    map.setFilter(BASE_LAYER_ID, filter)
    if (map.getLayer(GLOW_LAYER_ID)) map.setFilter(GLOW_LAYER_ID, filter)
  }, [range, selectedId, isPlaying])

  // Camera fits the bbox of currently-visible (date-filtered) rides.
  // Skipped while a single ride is selected (its own effect owns the camera)
  // or while playback is active (the playback effect drives the camera).
  useEffect(() => {
    const map = mapRef.current
    if (!map || rides.length === 0) return
    if (selectedId || isPlaying) return
    const startMs = range[0].getTime()
    const endMs = range[1].getTime()
    let minLng = Infinity
    let minLat = Infinity
    let maxLng = -Infinity
    let maxLat = -Infinity
    let count = 0
    for (const r of rides) {
      if (r.dateMs < startMs || r.dateMs > endMs) continue
      if (r.bbox[0] < minLng) minLng = r.bbox[0]
      if (r.bbox[1] < minLat) minLat = r.bbox[1]
      if (r.bbox[2] > maxLng) maxLng = r.bbox[2]
      if (r.bbox[3] > maxLat) maxLat = r.bbox[3]
      count++
    }
    if (count === 0) return
    const fit = () =>
      map.fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        {
          padding: { top: 96, right: 376, bottom: 200, left: 60 },
          duration: 600,
          maxZoom: 13,
          essential: true,
        }
      )
    if (map.isStyleLoaded()) fit()
    else map.once('load', fit)
    // selectedId/isPlaying in deps so we re-fit when those toggle off.
  }, [range, rides, selectedId, isPlaying])

  // Apply selected filter + show popup when selectedId changes or fly is requested.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const setSelectedFilter = () => {
      const filter = idEqualsFilter(selectedId)
      if (map.getLayer(SELECTED_LAYER_ID)) {
        map.setFilter(SELECTED_LAYER_ID, filter)
        map.setFilter(SELECTED_LAYER_ID + '-casing', filter)
      }
    }
    if (map.isStyleLoaded()) setSelectedFilter()
    else map.once('styledata', setSelectedFilter)

    popupRef.current?.remove()
    popupRef.current = null

    if (!selectedId) return
    const ride = ridesByIdRef.current.get(selectedId)
    if (!ride) return

    // Fly to the ride bounds. During playback the playback effect owns the
    // camera, so skip this fitBounds.
    if (!isPlaying) {
      map.fitBounds(
        [
          [ride.bbox[0], ride.bbox[1]],
          [ride.bbox[2], ride.bbox[3]],
        ],
        { padding: { top: 80, right: 400, bottom: 200, left: 80 }, duration: 700, maxZoom: 14 }
      )
    }

    // Skip the popup during playback — too much chrome on top of the
    // animated trail + dot.
    if (isPlaying) return

    // Place popup at midpoint of the ride.
    const mid = ride.coordinates[Math.floor(ride.coordinates.length / 2)]!
    const rideId = ride.id
    import('maplibre-gl').then(({ Popup: PopupCtor }) => {
      if (mapRef.current !== map) return
      const popup = new PopupCtor({
        closeButton: true,
        closeOnClick: false,
        offset: 14,
        className: 'atlas-popup',
        maxWidth: '260px',
        anchor: 'bottom',
      })
        .setLngLat(mid)
        .setHTML(popupHtml(ride))
        .addTo(map)
      // Delegated handler for the "Play this ride" button inside the popup.
      const el = popup.getElement()
      el?.addEventListener('click', (e) => {
        const target = e.target as HTMLElement | null
        if (target?.closest('[data-play-ride]')) {
          popup.remove()
          onPlayRide(rideId)
        }
      })
      popup.on('close', () => {
        if (popupRef.current === popup) {
          popupRef.current = null
          onSelectId(null)
        }
      })
      popupRef.current = popup
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, flyKey, isPlaying])

  // Apply hover filter.
  useEffect(() => {
    const map = mapRef.current
    if (!map || !map.getLayer(HOVER_LAYER_ID)) return
    map.setFilter(HOVER_LAYER_ID, idEqualsFilter(hoveredId))
  }, [hoveredId])

  // Toggle layer visibility between idle (HOLOGRAPHIC) and playback (PLAYED)
  // modes. Also reset the played-rides filter when entering playback.
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const setVis = (id: string, vis: 'visible' | 'none') => {
      if (map.getLayer(id)) map.setLayoutProperty(id, 'visibility', vis)
    }
    if (isPlaying) {
      setVis(GLOW_LAYER_ID, 'none')
      setVis(BASE_LAYER_ID, 'none')
      setVis(GLOW_PLAYED_LAYER_ID, 'visible')
      setVis(BASE_PLAYED_LAYER_ID, 'visible')
      // Reset played list — playback always starts fresh from the current
      // playingRideId (which Atlas resets to the first ride when you press play).
      if (map.getLayer(GLOW_PLAYED_LAYER_ID)) {
        map.setFilter(GLOW_PLAYED_LAYER_ID, inIdsFilter([]))
        map.setFilter(BASE_PLAYED_LAYER_ID, inIdsFilter([]))
      }
    } else {
      setVis(GLOW_PLAYED_LAYER_ID, 'none')
      setVis(BASE_PLAYED_LAYER_ID, 'none')
      setVis(GLOW_LAYER_ID, 'visible')
      setVis(BASE_LAYER_ID, 'visible')
    }
  }, [isPlaying])

  // Playback animation loop. Drives the trail + dot sources, accumulates
  // played-ride ids on the BASE_PLAYED/GLOW_PLAYED filters, and tracks the
  // camera (center=dot, bearing=heading, pitch+zoom from speed table).
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const trailSrc = () =>
      map.getSource(PLAYBACK_TRAIL_SOURCE_ID) as maplibregl.GeoJSONSource | undefined
    const dotSrc = () =>
      map.getSource(PLAYBACK_DOT_SOURCE_ID) as maplibregl.GeoJSONSource | undefined
    const emptyFc = { type: 'FeatureCollection' as const, features: [] }

    if (!isPlaying) {
      trailSrc()?.setData(emptyFc)
      dotSrc()?.setData(emptyFc)
      // Restore camera pitch when leaving playback so the user gets a flat
      // map back. Center/zoom are left wherever playback ended.
      map.easeTo({ pitch: 0, duration: 600 })
      return
    }

    // The playable pool comes from Atlas — either the full filtered range or
    // a single ride (when the user pressed a per-ride play button).
    const playable = playableRides
    if (playable.length === 0) return

    // Resolve starting index from playingRideId (or 0 if not in playable).
    let idx = playable.findIndex((r) => r.id === playingRideId)
    if (idx < 0) {
      idx = 0
      onPlayingRideChange(playable[0]!.id)
    }

    // Played-ride id accumulator. Filtered into BASE/GLOW PLAYED layers.
    const playedIds: string[] = []
    const updatePlayedFilter = () => {
      const f = inIdsFilter(playedIds)
      if (map.getLayer(GLOW_PLAYED_LAYER_ID)) map.setFilter(GLOW_PLAYED_LAYER_ID, f)
      if (map.getLayer(BASE_PLAYED_LAYER_ID)) map.setFilter(BASE_PLAYED_LAYER_ID, f)
    }
    updatePlayedFilter()

    // Cumulative arc-length cache (per ride) for fast progress→point lookup.
    const lensCache = new Map<string, number[]>()
    const lensFor = (id: string, coords: [number, number][]) => {
      let lens = lensCache.get(id)
      if (!lens) {
        lens = cumulativeLengths(coords)
        lensCache.set(id, lens)
      }
      return lens
    }

    let progress = 0
    let lastTs = 0
    let raf = 0
    let cancelled = false
    // Smoothed bearing so the camera doesn't whip around on jagged GPS.
    let smoothedBearing: number | null = null
    // Smoothed pitch/zoom so a speed change eases into the new camera tier
    // instead of snapping. Initialized to the starting speed's target.
    const initialCam = cameraForSpeed(playbackSpeedRef.current)
    let smoothedPitch = initialCam.pitch
    let smoothedZoom = initialCam.zoom

    // Trail layer color follows the current ride's color so it stands out.
    const setTrailColor = (color: string) => {
      if (map.getLayer(PLAYBACK_TRAIL_LAYER_ID)) {
        map.setPaintProperty(PLAYBACK_TRAIL_LAYER_ID, 'line-color', color)
      }
      if (map.getLayer(PLAYBACK_DOT_LAYER_ID)) {
        map.setPaintProperty(PLAYBACK_DOT_LAYER_ID, 'circle-color', color)
      }
    }
    setTrailColor(playable[idx]!.color)

    function trailCoordsAt(
      coords: [number, number][],
      lens: number[],
      p: number
    ): [number, number][] {
      if (coords.length === 0) return []
      if (p <= 0) return [coords[0]!]
      if (p >= 1) return coords
      const total = lens[lens.length - 1]!
      const target = p * total
      let lo = 0
      let hi = lens.length - 1
      while (lo < hi - 1) {
        const mid = (lo + hi) >>> 1
        if (lens[mid]! <= target) lo = mid
        else hi = mid
      }
      const segLen = lens[hi]! - lens[lo]!
      const t = segLen > 0 ? (target - lens[lo]!) / segLen : 0
      const [lng1, lat1] = coords[lo]!
      const [lng2, lat2] = coords[hi]!
      const interp: [number, number] = [lng1 + (lng2 - lng1) * t, lat1 + (lat2 - lat1) * t]
      const out: [number, number][] = coords.slice(0, lo + 1)
      out.push(interp)
      return out
    }

    function setTrailFor(coords: [number, number][], lens: number[], p: number) {
      const src = trailSrc()
      if (!src) return
      const slice = trailCoordsAt(coords, lens, p)
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

    function setDotAt(coord: [number, number]) {
      const src = dotSrc()
      if (!src) return
      src.setData({
        type: 'FeatureCollection',
        features: [
          { type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: coord } },
        ],
      })
    }

    function trackCamera(slice: [number, number][], dot: [number, number]) {
      // Heading from the last segment of the drawn trail.
      let bearing = smoothedBearing ?? 0
      if (slice.length >= 2) {
        const a = slice[slice.length - 2]!
        const b = slice[slice.length - 1]!
        const target = bearingDeg(a[0], a[1], b[0], b[1])
        // Smooth bearing — circular EMA, picking the shorter way around.
        if (smoothedBearing == null) bearing = target
        else {
          let diff = target - smoothedBearing
          if (diff > 180) diff -= 360
          if (diff < -180) diff += 360
          bearing = (smoothedBearing + diff * 0.18 + 360) % 360
        }
        smoothedBearing = bearing
      }
      // Ease pitch/zoom toward the current speed's target. This makes a speed
      // change blend smoothly into the new camera tier instead of snapping.
      const tgt = cameraForSpeed(playbackSpeedRef.current)
      smoothedPitch += (tgt.pitch - smoothedPitch) * 0.12
      smoothedZoom += (tgt.zoom - smoothedZoom) * 0.12
      map!.jumpTo({ center: dot, bearing, pitch: smoothedPitch, zoom: smoothedZoom })
    }

    function tick(ts: number) {
      if (cancelled) return
      if (lastTs === 0) lastTs = ts
      const dt = ts - lastTs
      lastTs = ts

      const ride = playable[idx]
      if (!ride) {
        cancelled = true
        onPlaybackEnd()
        return
      }

      // Read live speed from the ref so mid-ride speed changes apply without
      // restarting the loop (which would reset progress to 0).
      const liveSpeed = playbackSpeedRef.current
      // Real time to draw this ride = ride distance / apparent ground speed.
      // Floor the divisor at 1ms to keep zero-distance rides from spinning forever.
      const apparentMps = APPARENT_MPH_AT_1X * Math.max(0.001, liveSpeed) * MPH_TO_MPS
      const rideMs = Math.max(1, (ride.distance / apparentMps) * 1000)
      progress += dt / rideMs
      const lens = lensFor(ride.id, ride.coordinates)
      if (progress >= 1) {
        // Finish ride at full visibility for one frame.
        setTrailFor(ride.coordinates, lens, 1)
        const endPoint = pointAtProgress(ride.coordinates, lens, 1)
        setDotAt(endPoint)
        // Add to played list so it joins the base.
        playedIds.push(ride.id)
        updatePlayedFilter()
        // Advance.
        idx++
        progress = 0
        if (idx >= playable.length) {
          cancelled = true
          onPlaybackEnd()
          return
        }
        const next = playable[idx]!
        onPlayingRideChange(next.id)
        setTrailColor(next.color)
        // Reset bearing smoothing for the new ride so the camera doesn't
        // pull from the prior ride's heading.
        smoothedBearing = null
        // Skip drawing this frame so the next-ride first frame uses fresh dt.
        raf = requestAnimationFrame(tick)
        return
      }

      const slice = trailCoordsAt(ride.coordinates, lens, progress)
      const dot = pointAtProgress(ride.coordinates, lens, progress)
      setTrailFor(ride.coordinates, lens, progress)
      setDotAt(dot)
      trackCamera(slice, dot)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
    // playingRideId intentionally excluded — see prior comment in earlier rev.
    // playbackSpeed intentionally excluded — read live via playbackSpeedRef so
    // mid-playback speed changes don't tear down the RAF loop and reset progress.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, playableRides])

  return <div ref={containerRef} className="absolute inset-0 h-full w-full" />
}

// Avoid global maplibregl reference at compile time; declared types only.
declare namespace maplibregl {
  type GeoJSONSource = import('maplibre-gl').GeoJSONSource
}
