'use client'

import { useEffect, useRef, useMemo } from 'react'
import type { RidesData, RideBounds } from '@/lib/rides'

interface RideHeatmapProps {
  data: RidesData
}

function mercatorY(lat: number): number {
  const rad = (lat * Math.PI) / 180
  return Math.log(Math.tan(Math.PI / 4 + rad / 2))
}

function percentile(sorted: number[], p: number): number {
  const idx = Math.floor(sorted.length * p)
  return sorted[Math.min(idx, sorted.length - 1)]!
}

function computeVisibleBounds(rides: RidesData['rides']): RideBounds {
  const centroids = rides.map((r) => {
    let sumLat = 0
    let sumLng = 0
    for (const [lat, lng] of r.coordinates) {
      sumLat += lat
      sumLng += lng
    }
    return {
      lat: sumLat / r.coordinates.length,
      lng: sumLng / r.coordinates.length,
    }
  })

  const sortedLats = centroids.map((c) => c.lat).sort((a, b) => a - b)
  const sortedLngs = centroids.map((c) => c.lng).sort((a, b) => a - b)

  const q1Lat = percentile(sortedLats, 0.25)
  const q3Lat = percentile(sortedLats, 0.75)
  const q1Lng = percentile(sortedLngs, 0.25)
  const q3Lng = percentile(sortedLngs, 0.75)

  const iqrLat = q3Lat - q1Lat
  const iqrLng = q3Lng - q1Lng

  const fenceLat = Math.max(iqrLat * 1.5, 0.08)
  const fenceLng = Math.max(iqrLng * 1.5, 0.12)

  const loLat = q1Lat - fenceLat
  const hiLat = q3Lat + fenceLat
  const loLng = q1Lng - fenceLng
  const hiLng = q3Lng + fenceLng

  const inlierRides = rides.filter((_, i) => {
    const c = centroids[i]!
    return c.lat >= loLat && c.lat <= hiLat && c.lng >= loLng && c.lng <= hiLng
  })

  let minLat = Infinity
  let maxLat = -Infinity
  let minLng = Infinity
  let maxLng = -Infinity

  for (const ride of inlierRides) {
    for (const [lat, lng] of ride.coordinates) {
      if (lat < minLat) minLat = lat
      if (lat > maxLat) maxLat = lat
      if (lng < minLng) minLng = lng
      if (lng > maxLng) maxLng = lng
    }
  }

  const latSpan = maxLat - minLat
  const lngSpan = maxLng - minLng
  const pad = 0.03

  return {
    minLat: minLat - latSpan * pad,
    maxLat: maxLat + latSpan * pad,
    minLng: minLng - lngSpan * pad,
    maxLng: maxLng + lngSpan * pad,
  }
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

function createProjection(bounds: RideBounds, width: number, height: number, padding: number) {
  const minY = mercatorY(bounds.minLat)
  const maxY = mercatorY(bounds.maxLat)
  const minX = toRad(bounds.minLng)
  const maxX = toRad(bounds.maxLng)
  const xSpan = maxX - minX
  const ySpan = maxY - minY

  const drawW = width - padding * 2
  const drawH = height - padding * 2

  const scaleX = drawW / xSpan
  const scaleY = drawH / ySpan
  const scale = Math.min(scaleX, scaleY)

  const projectedW = xSpan * scale
  const projectedH = ySpan * scale
  const offsetX = padding + (drawW - projectedW) / 2
  const offsetY = padding + (drawH - projectedH) / 2

  return (lat: number, lng: number): [number, number] => {
    const x = (toRad(lng) - minX) * scale + offsetX
    const y = (maxY - mercatorY(lat)) * scale + offsetY
    return [x, y]
  }
}

function formatDateRange(rides: RidesData['rides']): string {
  if (rides.length === 0) return ''
  const first = new Date(rides[0]!.date)
  const last = new Date(rides[rides.length - 1]!.date)
  const fmt = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return `${fmt(first)} – ${fmt(last)}`
}

export function RideHeatmap({ data }: RideHeatmapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)

  const visibleBounds = useMemo(() => computeVisibleBounds(data.rides), [data])

  useEffect(() => {
    const canvasEl = canvasRef.current
    const container = containerRef.current
    if (!canvasEl || !container) return

    const ctx = canvasEl.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dpr = window.devicePixelRatio || 1

    function sizeCanvas() {
      const rect = container!.getBoundingClientRect()
      dpr = window.devicePixelRatio || 1
      canvasEl!.width = rect.width * dpr
      canvasEl!.height = rect.height * dpr
    }
    sizeCanvas()

    const BG_LIGHT = '#ffffff'
    // gray-950: oklch(0.14 0.01 60) ≈ rgb(12, 8, 6)
    const BG_DARK = '#0c0806'
    let isDark = document.documentElement.classList.contains('dark')

    function bg() {
      return isDark ? BG_DARK : BG_LIGHT
    }

    let currentColorShift = 0
    const obs = new MutationObserver(() => {
      const wasDark = isDark
      isDark = document.documentElement.classList.contains('dark')
      if (wasDark !== isDark) drawAll(currentColorShift)
    })
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    // Holographic palettes (match WaveBackground)
    const HOLO_DARK = [
      { h: 15, s: 65, l: 52 },
      { h: 40, s: 70, l: 50 },
      { h: 170, s: 45, l: 45 },
      { h: 280, s: 38, l: 52 },
      { h: 210, s: 48, l: 50 },
      { h: 350, s: 55, l: 52 },
      { h: 15, s: 65, l: 52 },
    ]

    const HOLO_LIGHT = [
      { h: 15, s: 80, l: 72 },
      { h: 40, s: 85, l: 70 },
      { h: 170, s: 55, l: 60 },
      { h: 280, s: 45, l: 68 },
      { h: 210, s: 55, l: 68 },
      { h: 350, s: 70, l: 72 },
      { h: 15, s: 80, l: 72 },
    ]

    function holoColor(t: number, alpha: number): string {
      const palette = isDark ? HOLO_DARK : HOLO_LIGHT
      const tt = ((t % 1) + 1) % 1
      const scaled = tt * (palette.length - 1)
      const i = Math.floor(scaled)
      const f = scaled - i
      const a = palette[i]!
      const b = palette[Math.min(i + 1, palette.length - 1)]!
      let dh = b.h - a.h
      if (dh > 180) dh -= 360
      if (dh < -180) dh += 360
      return `hsla(${a.h + dh * f}, ${a.s + (b.s - a.s) * f}%, ${a.l + (b.l - a.l) * f}%, ${alpha})`
    }

    function project() {
      return createProjection(visibleBounds, canvasEl!.width / dpr, canvasEl!.height / dpr, 24)
    }

    let projected = data.rides.map((r) => {
      const p = project()
      return r.coordinates.map(([lat, lng]) => p(lat, lng))
    })

    // Normalized centroids (0–1) for proximity calculations
    let centroids: [number, number][] = []
    function computeCentroids() {
      const w = canvasEl!.width / dpr
      const h = canvasEl!.height / dpr
      centroids = projected.map((pts) => {
        let cx = 0
        let cy = 0
        for (const [x, y] of pts) {
          cx += x
          cy += y
        }
        return [cx / pts.length / w, cy / pts.length / h] as [number, number]
      })
    }

    function reproject() {
      const p = project()
      projected = data.rides.map((r) => r.coordinates.map(([lat, lng]) => p(lat, lng)))
      computeCentroids()
    }

    computeCentroids()

    // Gentle autonomous drift — sine wave simulating slow vertical sweep
    let driftY = 0.5
    function stepDrift(time: number) {
      driftY = 0.5 + Math.sin(time * 0.56) * 0.3
    }

    // Gaussian radius for proximity influence
    const PROXIMITY_RADIUS = 0.22
    const PROXIMITY_INV = 1 / (2 * PROXIMITY_RADIUS * PROXIMITY_RADIUS)

    function drawRoutes(start: number, end: number, colorShift: number) {
      ctx!.lineWidth = 1.5
      ctx!.lineCap = 'round'
      ctx!.lineJoin = 'round'
      ctx!.globalCompositeOperation = isDark ? 'lighter' : 'multiply'

      const baseAlpha = isDark ? 0.1 : 0.15

      for (let i = start; i < end; i++) {
        const pts = projected[i]!
        if (pts.length < 2) continue
        const t = i / projected.length

        let extraShift = 0
        let alpha = baseAlpha
        if (centroids[i]) {
          const dy = centroids[i]![1] - driftY
          const proximity = Math.exp(-(dy * dy) * PROXIMITY_INV)
          extraShift = proximity * 0.3
          alpha = baseAlpha + proximity * 0.04
        }

        ctx!.strokeStyle = holoColor(t * 0.8 + 0.05 + colorShift + extraShift, alpha)
        ctx!.beginPath()
        ctx!.moveTo(pts[0]![0], pts[0]![1])
        for (let j = 1; j < pts.length; j++) {
          ctx!.lineTo(pts[j]![0], pts[j]![1])
        }
        ctx!.stroke()
      }
      ctx!.globalCompositeOperation = 'source-over'
    }

    // Reusable offscreen canvas for glow blur
    const glowCanvas = document.createElement('canvas')
    const glowCtx = glowCanvas.getContext('2d')!

    function glow(alpha = 0.35) {
      if (alpha <= 0) return
      glowCanvas.width = canvasEl!.width
      glowCanvas.height = canvasEl!.height
      glowCtx.filter = `blur(${5 * dpr}px)`
      glowCtx.drawImage(canvasEl!, 0, 0)

      ctx!.globalCompositeOperation = isDark ? 'lighter' : 'multiply'
      ctx!.globalAlpha = alpha
      ctx!.setTransform(1, 0, 0, 1, 0, 0)
      ctx!.drawImage(glowCanvas, 0, 0)
      ctx!.globalAlpha = 1.0
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.globalCompositeOperation = 'source-over'
    }

    function fadeEdges() {
      const w = canvasEl!.width / dpr
      const h = canvasEl!.height / dpr
      // Use rgba with alpha 0 of the SAME color to avoid interpolation through black
      // ('transparent' is rgba(0,0,0,0) which causes visible gray/dark banding)
      const solid = isDark ? 'rgba(12,8,6,1)' : 'rgba(255,255,255,1)'
      const clear = isDark ? 'rgba(12,8,6,0)' : 'rgba(255,255,255,0)'

      ctx!.globalCompositeOperation = 'source-over'

      // Top fade
      const top = ctx!.createLinearGradient(0, 0, 0, h * 0.14)
      top.addColorStop(0, solid)
      top.addColorStop(1, clear)
      ctx!.fillStyle = top
      ctx!.fillRect(0, 0, w, h * 0.14)

      // Bottom fade
      const bot = ctx!.createLinearGradient(0, h * 0.86, 0, h)
      bot.addColorStop(0, clear)
      bot.addColorStop(1, solid)
      ctx!.fillStyle = bot
      ctx!.fillRect(0, h * 0.86, w, h * 0.14)

      // Left fade
      const left = ctx!.createLinearGradient(0, 0, w * 0.07, 0)
      left.addColorStop(0, solid)
      left.addColorStop(1, clear)
      ctx!.fillStyle = left
      ctx!.fillRect(0, 0, w * 0.07, h)

      // Right fade
      const right = ctx!.createLinearGradient(w * 0.93, 0, w, 0)
      right.addColorStop(0, clear)
      right.addColorStop(1, solid)
      ctx!.fillStyle = right
      ctx!.fillRect(w * 0.93, 0, w * 0.07, h)
    }

    // Location labels — near-future tactical HUD style
    interface MapLabel {
      name: string
      lat: number
      lng: number
      anchor: 'tl' | 'tr' | 'bl' | 'br'
      sub?: string
    }

    const LABELS: MapLabel[] = [
      { name: 'GREENSBORO', lat: 36.0726, lng: -79.792, anchor: 'tr', sub: '→ 26 MI  E' },
      { name: 'SALEM LAKE', lat: 36.0951, lng: -80.1914, anchor: 'br' },
      { name: 'PILOT MTN', lat: 36.3401, lng: -80.4742, anchor: 'tl', sub: '↑ 2398 FT' },
      { name: 'YADKIN RIVER', lat: 36.012, lng: -80.405, anchor: 'bl' },
      { name: 'SAURATOWN MTNS', lat: 36.3746, lng: -80.3714, anchor: 'tr', sub: '↑ 2552 FT' },
    ]

    const dateRange = formatDateRange(data.rides)
    const statsText = `${data.totalRides} RIDES${dateRange ? `  ·  ${dateRange.toUpperCase()}` : ''}`

    function drawLabels() {
      const w = canvasEl!.width / dpr
      const h = canvasEl!.height / dpr
      const proj = project()
      const alpha = isDark ? 0.3 : 0.25
      const subAlpha = isDark ? 0.18 : 0.15
      const lineAlpha = isDark ? 0.2 : 0.15
      const fg = isDark ? '255,255,255' : '0,0,0'

      // — Geographic labels with leader lines —
      for (const label of LABELS) {
        let [x, y] = proj(label.lat, label.lng)

        const margin = 40
        const offScreen = x < 0 || x > w || y < 0 || y > h
        if (offScreen) {
          x = Math.max(margin, Math.min(w - margin, x))
          y = Math.max(margin, Math.min(h - margin, y))
        }

        const dx = label.anchor.includes('r') ? 1 : -1
        const dy = label.anchor.includes('b') ? 1 : -1

        const ms = 3
        ctx!.fillStyle = `rgba(${fg},${alpha})`
        ctx!.beginPath()
        ctx!.moveTo(x, y - ms)
        ctx!.lineTo(x + ms, y)
        ctx!.lineTo(x, y + ms)
        ctx!.lineTo(x - ms, y)
        ctx!.closePath()
        ctx!.fill()

        const diagLen = 28
        const horizLen = 16
        const ex = x + dx * diagLen * 0.7
        const ey = y + dy * diagLen * 0.7
        const fx = ex + dx * horizLen

        ctx!.strokeStyle = `rgba(${fg},${lineAlpha})`
        ctx!.lineWidth = 0.75
        ctx!.setLineDash([3, 2])
        ctx!.beginPath()
        ctx!.moveTo(x, y)
        ctx!.lineTo(ex, ey)
        ctx!.lineTo(fx, ey)
        ctx!.stroke()
        ctx!.setLineDash([])

        const tx = fx + dx * 5
        ctx!.textAlign = dx > 0 ? 'left' : 'right'

        ctx!.font = '600 8.5px var(--font-space-grotesk), sans-serif'
        ctx!.letterSpacing = '1.5px'
        ctx!.fillStyle = `rgba(${fg},${alpha})`
        ctx!.textBaseline = 'alphabetic'
        ctx!.fillText(label.name, tx, ey - 1)

        if (label.sub) {
          ctx!.font = '300 7px var(--font-space-grotesk), sans-serif'
          ctx!.letterSpacing = '0.8px'
          ctx!.fillStyle = `rgba(${fg},${subAlpha})`
          ctx!.fillText(label.sub, tx, ey + 8)
        }

        ctx!.letterSpacing = '0px'
      }

      // — WINSTON-SALEM title, upper right —
      const pad = 20
      const boxPadX = 10
      const boxPadY = 8
      const titleSize = 14
      const coordSize = 9
      const lineGap = 14

      ctx!.textAlign = 'right'
      ctx!.textBaseline = 'alphabetic'

      // Measure text for box
      ctx!.font = `600 ${titleSize}px var(--font-space-grotesk), sans-serif`
      ctx!.letterSpacing = '4px'
      const titleW = ctx!.measureText('WINSTON-SALEM').width + 4 // account for letter-spacing
      ctx!.font = `300 ${coordSize}px var(--font-space-grotesk), sans-serif`
      ctx!.letterSpacing = '1.5px'
      const coordW = ctx!.measureText('36.10°N  80.24°W').width + 1.5

      const boxW = Math.max(titleW, coordW) + boxPadX * 2
      const boxH = titleSize + coordSize + lineGap - 4 + boxPadY * 2
      const boxX = w - pad - boxW
      const boxY = pad

      // Tactical border
      ctx!.strokeStyle = `rgba(${fg},${lineAlpha})`
      ctx!.lineWidth = 0.75
      ctx!.strokeRect(boxX, boxY, boxW, boxH)

      // Title
      const textX = w - pad - boxPadX
      ctx!.font = `600 ${titleSize}px var(--font-space-grotesk), sans-serif`
      ctx!.letterSpacing = '4px'
      ctx!.fillStyle = `rgba(${fg},${alpha})`
      ctx!.fillText('WINSTON-SALEM', textX, boxY + boxPadY + titleSize)

      // Coordinates
      ctx!.font = `300 ${coordSize}px var(--font-space-grotesk), sans-serif`
      ctx!.letterSpacing = '1.5px'
      ctx!.fillStyle = `rgba(${fg},${subAlpha})`
      ctx!.fillText('36.10°N  80.24°W', textX, boxY + boxPadY + titleSize + lineGap)

      ctx!.letterSpacing = '0px'

      // — Ride stats, lower left —
      ctx!.textAlign = 'left'
      ctx!.textBaseline = 'alphabetic'

      ctx!.font = '600 8px var(--font-space-grotesk), sans-serif'
      ctx!.letterSpacing = '1.5px'
      ctx!.fillStyle = `rgba(${fg},${subAlpha})`
      ctx!.fillText(statsText, pad, h - pad)

      ctx!.letterSpacing = '0px'
    }

    function drawAll(colorShift: number) {
      const w = canvasEl!.width / dpr
      const h = canvasEl!.height / dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx!.fillStyle = bg()
      ctx!.fillRect(0, 0, w, h)
      drawRoutes(0, projected.length, colorShift)
      glow()
      fadeEdges()
      drawLabels()
    }

    // Resize handler
    let resizeTimer: ReturnType<typeof setTimeout>
    let shimmerTime = 0
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        sizeCanvas()
        reproject()
        drawAll(shimmerTime * 0.06)
      }, 150)
    }
    window.addEventListener('resize', onResize)

    // Render
    if (reducedMotion || projected.length === 0) {
      drawAll(0)
    } else {
      let lastTime = performance.now()

      const tick = (now: number) => {
        const dt = Math.min((now - lastTime) / 1000, 0.05)
        lastTime = now
        shimmerTime += dt
        stepDrift(shimmerTime)
        currentColorShift = shimmerTime * 0.06
        drawAll(currentColorShift)
        rafRef.current = requestAnimationFrame(tick)
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
      obs.disconnect()
      clearTimeout(resizeTimer)
    }
  }, [data, visibleBounds])

  if (data.totalRides === 0) return null

  return (
    <div ref={containerRef} className="h-full w-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Heatmap of ${data.totalRides} cycling routes`}
        className="block h-full w-full"
      />
    </div>
  )
}
