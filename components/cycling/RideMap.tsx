'use client'

import 'maplibre-gl/dist/maplibre-gl.css'
import type { Map as MaplibreMap, StyleSpecification } from 'maplibre-gl'
import { Bike } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const LIGHT_STYLE = 'https://tiles.stadiamaps.com/styles/stamen_toner_lite.json'
const DARK_STYLE = 'https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json'

const ROUTE_CASING_LIGHT = '#ffffff'
const ROUTE_CASING_DARK = '#0a0a0c'
const START_COLOR = '#22c55e'
const END_COLOR = '#ef4444'
const MAP_PITCH = 45

interface RideRouteFile {
  slug: string
  id: string
  sportType: string
  startTime: string
  name: string
  coordinates: [number, number][] // [lat, lng]
}

interface RideMapProps {
  slug: string
  className?: string
}

interface GradientStops {
  start: string
  mid: string
  end: string
}

function isDarkNow(): boolean {
  return document.documentElement.classList.contains('dark')
}

// OKLCH → sRGB. MapLibre's color parser doesn't accept oklch(), and
// getComputedStyle preserves the OKLCH color space verbatim in modern
// browsers, so we convert directly.
function oklchToRgb(L: number, C: number, h: number): string {
  const hRad = (h * Math.PI) / 180
  const a = C * Math.cos(hRad)
  const b = C * Math.sin(hRad)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s
  const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s
  const gamma = (c: number) => (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055)
  const ch = (c: number) => Math.round(Math.max(0, Math.min(1, gamma(c))) * 255)
  return `rgb(${ch(r)}, ${ch(g)}, ${ch(bl)})`
}

const OKLCH_RE = /^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*[\d.]+)?\s*\)$/i

function resolveColor(cssValue: string, fallback: string): string {
  if (!cssValue) return fallback
  const v = cssValue.trim()
  const m = OKLCH_RE.exec(v)
  if (m) {
    const L = parseFloat(m[1]!) > 1 ? parseFloat(m[1]!) / 100 : parseFloat(m[1]!)
    return oklchToRgb(L, parseFloat(m[2]!), parseFloat(m[3]!))
  }
  return v
}

function readGradientStops(): GradientStops {
  const styles = getComputedStyle(document.documentElement)
  const read = (token: string, fallback: string) =>
    resolveColor(styles.getPropertyValue(token).trim(), fallback)
  return {
    start: read('--color-primary-200', '#fed7aa'),
    mid: read('--color-primary-600', '#ea580c'),
    end: read('--color-primary-950', '#431407'),
  }
}

function gradientExpression(stops: GradientStops) {
  return [
    'interpolate',
    ['linear'],
    ['line-progress'],
    0,
    stops.start,
    0.5,
    stops.mid,
    1,
    stops.end,
  ] as const
}

export function RideMap({ slug, className }: RideMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<MaplibreMap | null>(null)
  const [missing, setMissing] = useState(false)

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

      // GeoJSON expects [lng, lat]; our data is [lat, lng].
      const lineCoords: [number, number][] = route.coordinates.map(([lat, lng]) => [lng, lat])

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

      const map = new Map({
        container: containerRef.current!,
        style: isDarkNow() ? DARK_STYLE : LIGHT_STYLE,
        bounds: [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        fitBoundsOptions: { padding: 60, duration: 0 },
        attributionControl: { compact: true },
        cooperativeGestures: true,
      })

      function casingColor() {
        return isDarkNow() ? ROUTE_CASING_DARK : ROUTE_CASING_LIGHT
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            'line-gradient': gradientExpression(readGradientStops()) as any,
            'line-width': 4.5,
          },
          layout: { 'line-cap': 'round', 'line-join': 'round' },
        })
      }

      function reapplyRoutePaint(m: MaplibreMap) {
        if (!m.getLayer('route-line')) return
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        m.setPaintProperty(
          'route-line',
          'line-gradient',
          gradientExpression(readGradientStops()) as any
        )
        m.setPaintProperty('route-casing', 'line-color', casingColor())
      }

      map.on('load', () => {
        if (cancelled) return
        // Apply pitch after the bounds fit, otherwise fitBounds resets it to 0.
        map.easeTo({ pitch: MAP_PITCH, duration: 600 })
        addRouteLayers(map)
        reapplyRoutePaint(map)
        new Marker({ color: START_COLOR, scale: 0.7 }).setLngLat(lineCoords[0]!).addTo(map)
        new Marker({ color: END_COLOR, scale: 0.7 })
          .setLngLat(lineCoords[lineCoords.length - 1]!)
          .addTo(map)
      })

      // Theme swap — preserve custom source + layers, then re-apply paint
      // (gradient stops + casing depend on the active theme/palette).
      const observer = new MutationObserver(() => {
        const dark = isDarkNow()
        map.setStyle(dark ? DARK_STYLE : LIGHT_STYLE, {
          transformStyle: (previous, next) => {
            if (!previous) return next
            const sources: StyleSpecification['sources'] = { ...next.sources }
            if (previous.sources.route) sources.route = previous.sources.route
            const customLayers = previous.layers.filter(
              (l) => l.id === 'route-casing' || l.id === 'route-line'
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
      className={`overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 ${className ?? ''}`}
    />
  )
}
