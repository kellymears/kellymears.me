'use client'

import type { ContributionData, ContributionStats } from '@/lib/github'
import { useEffect, useRef, useState } from 'react'

interface Props {
  data: ContributionData
  stats: ContributionStats
}

// ——— Projection (unit space; scaled to fit at draw time) ———
//
// Weeks run right and slightly down, weekdays run toward the viewer (left and
// down). Both axes descend the screen, so sorting prisms by base screen-y is a
// correct painter's order, and only the top, +day (front) and +week (right)
// faces can ever be seen.

const WV = { x: 26, y: 4 }
const DV = { x: -10, y: 9 }
const FOOT = 0.8 // footprint as a share of the cell
const MIN_SCALE = 0.72 // below this, show fewer weeks rather than shrink
const PAD = { top: 84, right: 40, bottom: 44, left: 40 }

const height = (count: number) => (count === 0 ? 2 : 8 + Math.sqrt(count) * 18)

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

interface Prism {
  w: number
  d: number
  date: string
  count: number
  level: number
  h: number
  /** Growth delay in ms. */
  delay: number
}

interface Pt {
  x: number
  y: number
}

function quartiles(counts: number[]): [number, number, number] {
  const nz = counts.filter((c) => c > 0).sort((a, b) => a - b)
  if (!nz.length) return [1, 2, 3]
  const q = (p: number) => nz[Math.floor((nz.length - 1) * p)]!
  return [q(0.25), q(0.5), q(0.75)]
}

function levelOf(count: number, [q1, q2, q3]: [number, number, number]) {
  if (count === 0) return 0
  if (count <= q1) return 1
  if (count <= q2) return 2
  if (count <= q3) return 3
  return 4
}

/** Face colors per level, [top, front, right], read from the live tokens. */
function readPalette(isDark: boolean): string[][] {
  const css = getComputedStyle(document.documentElement)
  const v = (name: string) => css.getPropertyValue(`--color-${name}`).trim()
  const rows = isDark
    ? [
        ['gray-800', 'gray-900', 'gray-950'],
        ['primary-900', 'primary-950', 'primary-950'],
        ['primary-700', 'primary-800', 'primary-900'],
        ['primary-500', 'primary-700', 'primary-800'],
        ['primary-300', 'primary-500', 'primary-700'],
      ]
    : [
        ['gray-200', 'gray-300', 'gray-400'],
        ['primary-200', 'primary-300', 'primary-400'],
        ['primary-300', 'primary-400', 'primary-600'],
        ['primary-400', 'primary-600', 'primary-700'],
        ['primary-500', 'primary-700', 'primary-800'],
      ]
  return rows.map((r) => r.map(v))
}

const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

export function ContributionSkyline({ data, stats }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [tip, setTip] = useState<{ x: number; y: number; date: string; count: number } | null>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = canvasRef.current
    if (!wrap || !canvas) return
    const ctx = canvas.getContext('2d')!

    const allDays = data.weeks.flatMap((wk) => wk.contributionDays)
    const qs = quartiles(allDays.map((d) => d.contributionCount))
    const peakCount = Math.max(...allDays.map((d) => d.contributionCount))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let isDark = document.documentElement.classList.contains('dark')
    let palette = readPalette(isDark)
    let monoFont = ''
    let prisms: Prism[] = []
    let latest: Prism | undefined
    let scale = 1
    let origin: Pt = { x: 0, y: 0 }
    let cssW = 0
    let cssH = 0
    let start = performance.now()
    let raf = 0
    let visible = true
    let hover: Prism | null = null
    let growDone = reduced

    const layout = () => {
      cssW = wrap.clientWidth
      if (!cssW) return
      // How many weeks fit at a legible scale; always keep the most recent.
      const perWeek = WV.x
      const maxWeeks = Math.floor((cssW / MIN_SCALE - PAD.left - PAD.right - 70) / perWeek)
      const weeks = data.weeks.slice(-Math.max(8, Math.min(data.weeks.length, maxWeeks)))

      prisms = weeks.flatMap((wk, w) =>
        wk.contributionDays.map((day) => ({
          w,
          d: day.weekday,
          date: day.date,
          count: day.contributionCount,
          level: levelOf(day.contributionCount, qs),
          h: height(day.contributionCount),
          delay: w * 22 + day.weekday * 30,
        }))
      )
      latest = prisms.reduce<Prism | undefined>(
        (m, p) => (!m || p.date > m.date ? p : m),
        undefined
      )
      prisms.sort((a, b) => a.w * WV.y + a.d * DV.y - (b.w * WV.y + b.d * DV.y) || a.w - b.w)

      // Bounds in unit space at full height.
      let minX = Infinity
      let maxX = -Infinity
      let minY = Infinity
      let maxY = -Infinity
      for (const p of prisms) {
        const bx = p.w * WV.x + p.d * DV.x
        const by = p.w * WV.y + p.d * DV.y
        minX = Math.min(minX, bx + DV.x)
        maxX = Math.max(maxX, bx + WV.x)
        minY = Math.min(minY, by - p.h)
        maxY = Math.max(maxY, by + WV.y + DV.y)
      }
      const unitW = maxX - minX
      scale = Math.min(1.25, (cssW - PAD.left - PAD.right) / unitW)
      cssH = Math.round((maxY - minY) * scale + PAD.top + PAD.bottom)
      origin = {
        x: (cssW - unitW * scale) / 2 - minX * scale,
        y: PAD.top - minY * scale,
      }

      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(cssW * dpr)
      canvas.height = Math.round(cssH * dpr)
      canvas.style.width = `${cssW}px`
      canvas.style.height = `${cssH}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const probe = getComputedStyle(wrap)
      monoFont = probe.getPropertyValue('--font-jetbrains-mono').trim() || 'ui-monospace'
    }

    const project = (w: number, d: number, z: number): Pt => ({
      x: origin.x + (w * WV.x + d * DV.x) * scale,
      y: origin.y + (w * WV.y + d * DV.y - z) * scale,
    })

    /** The prism's corners: a=back-left, b=back-right(+w), c=front-right, e=front-left(+d). */
    const corners = (p: Prism, h: number) => {
      const inset = (1 - FOOT) / 2
      const w0 = p.w + inset
      const w1 = p.w + 1 - inset
      const d0 = p.d + inset
      const d1 = p.d + 1 - inset
      return {
        ta: project(w0, d0, h),
        tb: project(w1, d0, h),
        tc: project(w1, d1, h),
        te: project(w0, d1, h),
        bb: project(w1, d0, 0),
        bc: project(w1, d1, 0),
        be: project(w0, d1, 0),
      }
    }

    const poly = (pts: Pt[], fill: string) => {
      ctx.beginPath()
      ctx.moveTo(pts[0]!.x, pts[0]!.y)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i]!.x, pts[i]!.y)
      ctx.closePath()
      ctx.fillStyle = fill
      ctx.fill()
    }

    const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 3)

    const label = (text: string, at: Pt, sub?: string, align: CanvasTextAlign = 'left') => {
      ctx.textAlign = align
      ctx.textBaseline = 'alphabetic'
      ctx.lineJoin = 'round'
      ctx.lineWidth = 5
      ctx.strokeStyle = isDark
        ? getComputedStyle(document.documentElement).getPropertyValue('--color-gray-950')
        : getComputedStyle(document.documentElement).getPropertyValue('--color-paper')
      ctx.font = `500 10px ${monoFont}`
      ctx.fillStyle = palette[4]![isDark ? 0 : 1]!
      if (sub) {
        ctx.strokeText(sub.toUpperCase(), at.x, at.y - 16)
        ctx.fillText(sub.toUpperCase(), at.x, at.y - 16)
      }
      ctx.font = `600 13px ${monoFont}`
      ctx.fillStyle = isDark ? '#f4f5f7' : '#16181d'
      ctx.strokeText(text, at.x, at.y)
      ctx.fillText(text, at.x, at.y)
    }

    const draw = (now: number) => {
      const t = now - start
      ctx.clearRect(0, 0, cssW, cssH)
      const lastW = prisms.reduce((m, p) => Math.max(m, p.w), 0)
      // Light sweep: a soft band that crosses the weeks every ~9s once built.
      const sweep = growDone && !reduced ? ((t / 9000) % 1.4) * (lastW + 12) - 6 : -99

      for (const p of prisms) {
        const g = reduced ? 1 : ease((t - p.delay) / 700)
        const h = Math.max(p.h * g, p.count === 0 ? 2 : 1)
        const c = corners(p, h)
        const [top, front, right] = palette[p.level]!
        poly([c.tb, c.tc, c.bc, c.bb], right!)
        poly([c.te, c.tc, c.bc, c.be], front!)
        poly([c.ta, c.tb, c.tc, c.te], top!)

        const glow = Math.max(0, 1 - Math.abs(p.w - sweep) / 3.5) * (p.count ? 1 : 0.3)
        if (glow > 0 || p === hover) {
          ctx.globalAlpha = p === hover ? 0.55 : glow * (isDark ? 0.35 : 0.45)
          poly([c.ta, c.tb, c.tc, c.te], '#ffffff')
          ctx.globalAlpha = 1
        }
      }

      // Month labels along the front row.
      ctx.font = `500 10px ${monoFont}`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      let lastMonth = -1
      for (const p of prisms) {
        if (p.d !== 6) continue
        const m = new Date(`${p.date}T12:00:00Z`).getUTCMonth()
        if (m !== lastMonth && lastMonth !== -1) {
          const at = project(p.w + 0.5, 7.4, 0)
          ctx.fillStyle = isDark ? '#8a8f99' : '#6b7280'
          ctx.fillText(MONTHS[m]!, at.x, at.y)
        }
        lastMonth = m
      }

      if (growDone || reduced || t > 2600) {
        growDone = true
        // Callouts ride above the local skyline on a leader line, so they
        // never sit on a building; a second callout stacks above the first
        // if their boxes would collide.
        const LABEL_W = 150
        /** Highest roof (smallest y) under a horizontal span of the canvas. */
        const skylineOver = (x0: number, x1: number) =>
          prisms.reduce((m, q) => {
            const r = project(q.w + 0.5, q.d + 0.5, q.h)
            return r.x >= x0 - 14 && r.x <= x1 + 14 ? Math.min(m, r.y - 10 * scale) : m
          }, Infinity)
        const leader = (from: Pt, toY: number) => {
          ctx.strokeStyle = palette[4]![isDark ? 0 : 1]!
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(from.x, from.y - 4)
          ctx.lineTo(from.x, toY)
          ctx.stroke()
        }

        let peakBox: { x0: number; x1: number; y: number } | null = null
        const peak = prisms.find((p) => p.count === peakCount)
        if (peak) {
          const top = project(peak.w + 0.5, peak.d + 0.5, peak.h)
          const y = Math.max(28, Math.min(top.y, skylineOver(top.x, top.x + LABEL_W)) - 22)
          leader(top, y + 4)
          label(`${peak.count} · ${fmtDate(peak.date)}`, { x: top.x + 6, y }, 'Peak day')
          peakBox = { x0: top.x, x1: top.x + LABEL_W, y }
        }

        const today = latest
        if (today) {
          const top = project(today.w + 0.5, today.d + 0.5, today.h)
          const pulse = reduced ? 0 : (t % 2000) / 2000
          ctx.strokeStyle = palette[4]![0]!
          ctx.globalAlpha = 1 - pulse
          ctx.lineWidth = 1.5
          ctx.beginPath()
          ctx.ellipse(top.x, top.y, 6 + pulse * 16, (6 + pulse * 16) * 0.55, 0, 0, Math.PI * 2)
          ctx.stroke()
          ctx.globalAlpha = 1

          const x0 = top.x - LABEL_W
          let y = Math.max(28, Math.min(top.y, skylineOver(x0, top.x)) - 22)
          if (peakBox && x0 < peakBox.x1 && top.x > peakBox.x0 && Math.abs(y - peakBox.y) < 40) {
            y = Math.max(28, peakBox.y - 42)
          }
          leader(top, y + 4)
          label(`${stats.currentStreak}-day streak`, { x: top.x - 6, y }, 'Today', 'right')
        }
      }
    }

    const loop = (now: number) => {
      if (visible) draw(now)
      raf = requestAnimationFrame(loop)
    }

    layout()
    if (reduced) draw(performance.now())
    else raf = requestAnimationFrame(loop)

    // ——— Hover: topmost prism under the pointer (reverse paint order) ———
    const inPoly = (pt: Pt, pts: Pt[]) => {
      let inside = false
      for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
        const a = pts[i]!
        const b = pts[j]!
        if (a.y > pt.y !== b.y > pt.y && pt.x < ((b.x - a.x) * (pt.y - a.y)) / (b.y - a.y) + a.x)
          inside = !inside
      }
      return inside
    }
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      const pt = { x: e.clientX - r.left, y: e.clientY - r.top }
      let hit: Prism | null = null
      for (let i = prisms.length - 1; i >= 0 && !hit; i--) {
        const p = prisms[i]!
        const c = corners(p, p.h)
        if (
          inPoly(pt, [c.ta, c.tb, c.tc, c.te]) ||
          inPoly(pt, [c.te, c.tc, c.bc, c.be]) ||
          inPoly(pt, [c.tb, c.tc, c.bc, c.bb])
        )
          hit = p
      }
      hover = hit
      if (hit) {
        const top = project(hit.w + 0.5, hit.d + 0.5, hit.h)
        setTip({ x: top.x, y: top.y, date: hit.date, count: hit.count })
      } else setTip(null)
      if (reduced) draw(performance.now())
    }
    const onLeave = () => {
      hover = null
      setTip(null)
      if (reduced) draw(performance.now())
    }
    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerleave', onLeave)

    let resizeTimer: ReturnType<typeof setTimeout>
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        layout()
        if (reduced) draw(performance.now())
      }, 120)
    })
    ro.observe(wrap)

    const mo = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains('dark')
      palette = readPalette(isDark)
      if (reduced) draw(performance.now())
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry?.isIntersecting ?? true
      // Re-run the rise when it first scrolls into view below the fold.
      if (visible && !was && !growDone) start = performance.now()
    })
    io.observe(wrap)

    // Fonts load after first paint; the labels need JetBrains Mono.
    document.fonts?.ready.then(() => reduced && draw(performance.now()))

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      canvas.removeEventListener('pointermove', onMove)
      canvas.removeEventListener('pointerleave', onLeave)
      ro.disconnect()
      mo.disconnect()
      io.disconnect()
    }
  }, [data, stats.currentStreak])

  return (
    <div ref={wrapRef} className="relative w-full">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={`Contribution skyline: ${stats.totalContributions.toLocaleString()} contributions over the past year, one building per day. Peak ${stats.maxDay} in a day; current streak ${stats.currentStreak} days.`}
        className="block"
      />
      {tip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-lg border border-gray-200 bg-white/95 px-3 py-1.5 font-mono text-xs whitespace-nowrap text-gray-900 shadow-lg dark:border-gray-700 dark:bg-gray-900/95 dark:text-gray-100"
          style={{ left: tip.x, top: tip.y - 10 }}
        >
          <span className="text-primary-600 dark:text-primary-400 font-semibold">
            {tip.count.toLocaleString()}
          </span>{' '}
          {tip.count === 1 ? 'contribution' : 'contributions'}
          <span className="text-gray-400 dark:text-gray-500"> · {fmtDate(tip.date)}</span>
        </div>
      )}
    </div>
  )
}
