'use client'

import { FIELD_H as H, FIELD_W as W } from '@/lib/route-field-frame'
import { useEffect, useRef } from 'react'

interface Props {
  /** `/constellation/rides-<group>.txt`: one path per line, newest first. */
  src: string
  focus: 'center' | 'right'
}

/**
 * Edge fade as [cx, cy, rx, ry], fractions of the root box: the radial mask
 * the CSS fallback puts on `.rf-root` (and `.rf-root--right` at ≥1024px).
 */
const FADE = [0.5, 0.5, 0.7, 0.75] as const
const FADE_RIGHT = [0.64, 0.5, 0.58, 0.8] as const

/** Matches `kc-drift`'s peak scale, so the zoomed-in field stays crisp. */
const DRIFT_MAX = 1.1
const MAX_PIXELS = 16e6
/** Per-task budget for stroking the field, so first paint never blocks input. */
const CHUNK_MS = 6

const STREAKS = 9
const STREAK_PERIOD = 14000
const STREAK_STAGGER = 1700
const STREAK_LEN = 0.07
const RING_PERIOD = 2800
const DRAW_IN_MS = 3200

type Polyline = { pts: Float32Array; cum: Float32Array; len: number }

function parsePolyline(d: string): Polyline {
  // `M x y` then relative `l dx dy` runs, as written by `toPath()`.
  const nums = d.slice(1).split(/[ l]/).map(Number)
  const pts = new Float32Array(nums.length)
  const cum = new Float32Array(nums.length / 2)
  let x = 0
  let y = 0
  let len = 0
  for (let i = 0; i < nums.length; i += 2) {
    const nx = i === 0 ? nums[0]! : x + nums[i]!
    const ny = i === 0 ? nums[1]! : y + nums[i + 1]!
    if (i) len += Math.hypot(nx - x, ny - y)
    pts[i] = x = nx
    pts[i + 1] = y = ny
    cum[i / 2] = len
  }
  return { pts, cum, len }
}

/** Index of the last vertex at or before distance `s`. */
function vertexAt(cum: Float32Array, s: number) {
  let lo = 0
  let hi = cum.length - 1
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1
    if (cum[mid]! <= s) lo = mid
    else hi = mid - 1
  }
  return lo
}

interface Box {
  x0: number
  y0: number
  x1: number
  y1: number
}

/** Adds the stretch of `line` between distances `a` and `b` to the current path. */
function trace(
  ctx: CanvasRenderingContext2D,
  { pts, cum }: Polyline,
  a: number,
  b: number,
  box: Box
) {
  const point = (s: number) => {
    const i = Math.min(vertexAt(cum, s), cum.length - 2)
    const t = Math.min(1, Math.max(0, (s - cum[i]!) / (cum[i + 1]! - cum[i]! || 1)))
    return [
      pts[i * 2]! + (pts[i * 2 + 2]! - pts[i * 2]!) * t,
      pts[i * 2 + 1]! + (pts[i * 2 + 3]! - pts[i * 2 + 1]!) * t,
    ] as const
  }
  const grow = (x: number, y: number) => {
    if (x < box.x0) box.x0 = x
    if (x > box.x1) box.x1 = x
    if (y < box.y0) box.y0 = y
    if (y > box.y1) box.y1 = y
  }
  const [sx, sy] = point(a)
  ctx.moveTo(sx, sy)
  grow(sx, sy)
  for (let i = vertexAt(cum, a) + 1; i < cum.length && cum[i]! < b; i++) {
    ctx.lineTo(pts[i * 2]!, pts[i * 2 + 1]!)
    grow(pts[i * 2]!, pts[i * 2 + 1]!)
  }
  const [ex, ey] = point(b)
  ctx.lineTo(ex, ey)
  grow(ex, ey)
}

/** CSS `cubic-bezier(0.65, 0, 0.35, 1)`, near enough: an in-out cubic. */
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2)
const easeOut = (t: number) => 1 - (1 - t) ** 2

const nextTask = () => new Promise<void>((r) => setTimeout(r, 0))

/**
 * The route heat field, painted once into a static canvas, plus the recent
 * routes' travelling streaks on a second canvas that redraws only while on
 * screen.
 *
 * The CSS version (a 520-path SVG as a mask, a blurred copy for glow, and the
 * streaks as animated `stroke-dashoffset`) kept the GPU busy for most of every
 * frame: each streak repaint re-rastered tiles that replayed the mask SVG, and
 * the drift re-ran the blur and mask passes. Here the glow, the gradient and
 * the edge fade are baked into one bitmap, so the drift moves static
 * textures and each frame strokes only a few short streaks.
 */
export function RouteFieldCanvas({ src, focus }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const fieldRef = useRef<HTMLCanvasElement>(null)
  const motionRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const field = fieldRef.current
    const motion = motionRef.current
    const root = wrap?.closest<HTMLElement>('.rf-root')
    if (!wrap || !field || !motion || !root) return
    const fctx = field.getContext('2d')
    const mctx = motion.getContext('2d')
    if (!fctx || !mctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const wide = window.matchMedia('(min-width: 1024px)')
    let isDark = document.documentElement.classList.contains('dark')
    let lines: string[] | null = null
    let streaks: Polyline[] = []
    let latest: Polyline | null = null
    let visible = false
    let raf = 0
    let generation = 0
    let drawInStart = -1

    // Layout, refreshed on resize: bitmap size and the frame → bitmap mapping.
    let bw = 0
    let bh = 0
    let px = 1 // bitmap px per CSS px
    let s = 1 // bitmap px per frame unit
    let ox = 0
    let oy = 0
    let fadeGradient: CanvasGradient | null = null
    let ellipse: [number, number, number, number] = [0, 0, 1, 1]
    let colors = { streak: '', glow: '', latest: '', ring: '' }

    const token = (name: string) =>
      getComputedStyle(document.documentElement).getPropertyValue(`--color-${name}`).trim()

    const readColors = () => {
      colors = {
        streak: token(isDark ? 'primary-300' : 'primary-500'),
        glow: token('primary-400'),
        latest: token(isDark ? 'primary-200' : 'primary-700'),
        ring: token('primary-500'),
      }
    }

    const layout = () => {
      const cw = wrap.offsetWidth
      const ch = wrap.offsetHeight
      if (!cw || !ch) return false
      px = (window.devicePixelRatio || 1) * DRIFT_MAX
      px = Math.min(px, Math.sqrt(MAX_PIXELS / (cw * ch)))
      bw = Math.round(cw * px)
      bh = Math.round(ch * px)
      s = Math.max(bw / W, bh / H)
      ox = (bw - W * s) / 2
      oy = (bh - H * s) / 2
      // Assigning a size clears a canvas, so leave it alone on a theme change.
      for (const c of [field, motion]) {
        if (c.width !== bw) c.width = bw
        if (c.height !== bh) c.height = bh
      }
      // The fade is placed against the root, which the drift box may be
      // offset inside (`focus="right"`), then expressed in bitmap px.
      const [fx, fy, frx, fry] = focus === 'right' && wide.matches ? FADE_RIGHT : FADE
      const rw = root.offsetWidth
      const rh = root.offsetHeight
      let left = 0
      let top = 0
      for (
        let el: HTMLElement | null = wrap;
        el && el !== root;
        el = el.offsetParent as HTMLElement | null
      ) {
        left += el.offsetLeft
        top += el.offsetTop
      }
      ellipse = [(fx * rw - left) * px, (fy * rh - top) * px, frx * rw * px, fry * rh * px]
      fadeGradient = fctx.createRadialGradient(0, 0, 0, 0, 0, 1)
      fadeGradient.addColorStop(0.4, '#000')
      fadeGradient.addColorStop(1, 'rgba(0,0,0,0)')
      return true
    }

    /** Masks everything already drawn in `rect` (bitmap px) to the edge fade. */
    const applyFade = (ctx: CanvasRenderingContext2D, rect: Box) => {
      const [cx, cy, rx, ry] = ellipse
      ctx.save()
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.beginPath()
      ctx.rect(rect.x0, rect.y0, rect.x1 - rect.x0, rect.y1 - rect.y0)
      ctx.clip()
      ctx.globalCompositeOperation = 'destination-in'
      ctx.setTransform(rx, 0, 0, ry, cx, cy)
      ctx.fillStyle = fadeGradient!
      ctx.fillRect(
        (rect.x0 - cx) / rx,
        (rect.y0 - cy) / ry,
        (rect.x1 - rect.x0) / rx,
        (rect.y1 - rect.y0) / ry
      )
      ctx.restore()
    }

    /** Every route, stroked in time-boxed chunks; the glow and fade are baked in. */
    const paintField = async () => {
      if (!lines) return
      const gen = ++generation
      const heat = document.createElement('canvas')
      heat.width = bw
      heat.height = bh
      const hctx = heat.getContext('2d')!
      hctx.setTransform(s, 0, 0, s, ox, oy)
      hctx.lineWidth = 1.6
      hctx.lineCap = 'round'
      hctx.lineJoin = 'round'
      hctx.globalAlpha = 0.2
      hctx.strokeStyle = '#000'
      // One stroke per route, so overlaps compound into heat.
      let i = 0
      while (i < lines.length) {
        const until = performance.now() + CHUNK_MS
        while (i < lines.length && performance.now() < until) hctx.stroke(new Path2D(lines[i++]))
        if (i < lines.length) {
          await nextTask()
          if (gen !== generation) return
        }
      }

      // Color: the same 135° ramp the page's primary tokens give the CSS version.
      const cw = bw / px
      const ch = bh / px
      const half = ((cw + ch) * Math.SQRT1_2 * px) / 2
      const ramp = hctx.createLinearGradient(
        bw / 2 - half * Math.SQRT1_2,
        bh / 2 - half * Math.SQRT1_2,
        bw / 2 + half * Math.SQRT1_2,
        bh / 2 + half * Math.SQRT1_2
      )
      const stops = isDark ? ['200', '400', '600'] : ['400', '600', '800']
      ramp.addColorStop(0, token(`primary-${stops[0]}`))
      ramp.addColorStop(0.55, token(`primary-${stops[1]}`))
      ramp.addColorStop(1, token(`primary-${stops[2]}`))
      hctx.setTransform(1, 0, 0, 1, 0, 0)
      hctx.globalAlpha = 1
      hctx.globalCompositeOperation = 'source-in'
      hctx.fillStyle = ramp
      hctx.fillRect(0, 0, bw, bh)

      await nextTask()
      if (gen !== generation) return
      fctx.clearRect(0, 0, bw, bh)
      fctx.globalAlpha = isDark ? 0.8 : 0.55
      blurInto(fctx, heat, 7 * px)
      fctx.globalAlpha = 1
      fctx.drawImage(heat, 0, 0)
      applyFade(fctx, { x0: 0, y0: 0, x1: bw, y1: bh })
      heat.width = heat.height = 0
      wrap.dataset.ready = ''
    }

    const frame = (now: number) => {
      mctx.setTransform(1, 0, 0, 1, 0, 0)
      mctx.clearRect(0, 0, bw, bh)
      if (!latest) return
      mctx.setTransform(s, 0, 0, s, ox, oy)
      mctx.lineCap = 'round'
      mctx.lineJoin = 'round'
      const box: Box = { x0: Infinity, y0: Infinity, x1: -Infinity, y1: -Infinity }

      if (!reduced.matches) {
        streaks.forEach((line, i) => {
          const head = (((now + i * STREAK_STAGGER) / STREAK_PERIOD) % 1) * line.len
          const tail = head + STREAK_LEN * line.len
          mctx.beginPath()
          trace(mctx, line, head, Math.min(tail, line.len), box)
          if (tail > line.len) trace(mctx, line, 0, tail - line.len, box)
          mctx.globalAlpha = 0.25
          mctx.strokeStyle = colors.glow
          mctx.lineWidth = 9
          mctx.stroke()
          mctx.globalAlpha = 1
          mctx.strokeStyle = colors.streak
          mctx.lineWidth = 2.5
          mctx.stroke()
        })
      }

      const drawn = reduced.matches
        ? 1
        : easeInOut(Math.min(1, Math.max(0, (now - drawInStart) / DRAW_IN_MS)))
      if (drawn > 0) {
        mctx.beginPath()
        trace(mctx, latest, 0, drawn * latest.len, box)
        mctx.strokeStyle = colors.latest
        mctx.lineWidth = 3
        mctx.stroke()
      }

      // kc-ring: grows 0.6 → 1.8 and fades out over the first 80% of each beat.
      const beat = reduced.matches ? 0 : Math.min(1, (now % RING_PERIOD) / RING_PERIOD / 0.8)
      const grow = reduced.matches ? 1 : 0.6 + 1.2 * easeOut(beat)
      const ex = latest.pts[latest.pts.length - 2]!
      const ey = latest.pts[latest.pts.length - 1]!
      mctx.beginPath()
      mctx.arc(ex, ey, 18 * grow, 0, Math.PI * 2)
      mctx.globalAlpha = reduced.matches ? 1 : 0.9 * (1 - easeOut(beat))
      mctx.strokeStyle = colors.ring
      mctx.lineWidth = 2 * grow
      mctx.stroke()
      mctx.globalAlpha = 1
      const r = 18 * 1.8 + 2
      box.x0 = Math.min(box.x0, ex - r)
      box.y0 = Math.min(box.y0, ey - r)
      box.x1 = Math.max(box.x1, ex + r)
      box.y1 = Math.max(box.y1, ey + r)

      // Box is in frame units; pad by the widest stroke, then fade that region.
      const pad = 6
      applyFade(mctx, {
        x0: Math.max(0, Math.floor((box.x0 - pad) * s + ox)),
        y0: Math.max(0, Math.floor((box.y0 - pad) * s + oy)),
        x1: Math.min(bw, Math.ceil((box.x1 + pad) * s + ox)),
        y1: Math.min(bh, Math.ceil((box.y1 + pad) * s + oy)),
      })
    }

    const loop = (now: number) => {
      frame(now)
      raf = requestAnimationFrame(loop)
    }

    const sync = () => {
      cancelAnimationFrame(raf)
      raf = 0
      if (!latest || !visible) return
      if (drawInStart < 0) drawInStart = performance.now()
      if (reduced.matches) frame(performance.now())
      else raf = requestAnimationFrame(loop)
    }

    const redraw = () => {
      if (!layout()) return
      readColors()
      void paintField()
      // Resizing a canvas clears it; repaint the motion layer even if paused.
      if (latest) frame(performance.now())
    }

    let fetched = false
    const load = async () => {
      fetched = true
      const res = await fetch(src)
      if (!res.ok) return
      lines = (await res.text()).split('\n').filter(Boolean)
      latest = lines[0] ? parsePolyline(lines[0]) : null
      streaks = lines.slice(1, 1 + STREAKS).map(parsePolyline)
      redraw()
      sync()
    }

    // Fetch a screen ahead; animate only while actually on screen.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || fetched) return
        near.disconnect()
        void load()
      },
      { rootMargin: '100% 0px' }
    )
    near.observe(wrap)
    const io = new IntersectionObserver(([entry]) => {
      visible = !!entry?.isIntersecting
      sync()
    })
    io.observe(wrap)

    let resizeTimer: ReturnType<typeof setTimeout>
    let lastSize = ''
    const ro = new ResizeObserver(() => {
      const size = `${wrap.offsetWidth}x${wrap.offsetHeight}x${window.devicePixelRatio}`
      if (size === lastSize) return
      const first = !lastSize
      lastSize = size
      clearTimeout(resizeTimer)
      if (!first) resizeTimer = setTimeout(redraw, 150)
    })
    ro.observe(wrap)

    const mo = new MutationObserver(() => {
      const dark = document.documentElement.classList.contains('dark')
      if (dark === isDark) return
      isDark = dark
      redraw()
    })
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    reduced.addEventListener('change', sync)

    return () => {
      generation++
      cancelAnimationFrame(raf)
      clearTimeout(resizeTimer)
      near.disconnect()
      io.disconnect()
      ro.disconnect()
      mo.disconnect()
      reduced.removeEventListener('change', sync)
    }
  }, [src, focus])

  return (
    <div ref={wrapRef} className="rf-canvas absolute inset-0">
      <canvas ref={fieldRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={motionRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}

/** `blur()` via the canvas filter, or a downscale/upscale pass where unsupported (Safari < 18). */
function blurInto(ctx: CanvasRenderingContext2D, img: HTMLCanvasElement, radius: number) {
  // Checked at runtime: the DOM types declare `filter` unconditionally.
  if (typeof (ctx as { filter?: unknown }).filter === 'string') {
    ctx.filter = `blur(${radius}px)`
    ctx.drawImage(img, 0, 0)
    ctx.filter = 'none'
    return
  }
  const k = Math.max(1, radius / 2)
  const small = document.createElement('canvas')
  small.width = Math.max(1, Math.round(img.width / k))
  small.height = Math.max(1, Math.round(img.height / k))
  const sctx = small.getContext('2d')!
  sctx.imageSmoothingQuality = 'high'
  sctx.drawImage(img, 0, 0, small.width, small.height)
  ctx.imageSmoothingQuality = 'high'
  ctx.drawImage(small, 0, 0, img.width, img.height)
  small.width = small.height = 0
}
