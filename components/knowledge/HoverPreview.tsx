'use client'

import { FALLBACK_TOPIC_COLOR, TOPIC_COLORS, topicLabel } from '@/components/knowledge/graph-colors'
import type { SearchEntry } from '@/components/knowledge/search'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from 'react'
import { createPortal } from 'react-dom'

/** `useLayoutEffect` warns during SSR; this component only ever paints client-side. */
const useIsomorphicLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

const topicVars = (topic: string): CSSProperties => {
  const color = TOPIC_COLORS[topic] ?? FALLBACK_TOPIC_COLOR
  return { '--topic': color.light, '--topic-dark': color.dark } as CSSProperties
}

/** Long enough that crossing a paragraph of links never opens one. */
const OPEN_DELAY = 350
/** Short enough to feel closed, long enough to travel from link to card. */
const CLOSE_DELAY = 160
const GAP = 8
const MARGIN = 8
const WIDTH = 320

interface Target {
  entry: SearchEntry
  rect: DOMRect
}

export interface HoverPreviewProps {
  index: SearchEntry[]
}

export function HoverPreview({ index }: HoverPreviewProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [coarse, setCoarse] = useState(true)
  const [target, setTarget] = useState<Target | null>(null)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const [visible, setVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement | null>(null)
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const bySlug = useMemo(() => {
    const map = new Map<string, SearchEntry>()
    for (const entry of index) map.set(entry.s, entry)
    return map
  }, [index])

  useEffect(() => {
    setMounted(true)
    // Not theme detection — pointer coarseness genuinely is a media query.
    const query = window.matchMedia('(pointer: coarse)')
    const sync = () => setCoarse(query.matches)
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  const clearTimers = useCallback(() => {
    if (openTimer.current) clearTimeout(openTimer.current)
    if (closeTimer.current) clearTimeout(closeTimer.current)
    openTimer.current = null
    closeTimer.current = null
  }, [])

  const close = useCallback(() => {
    clearTimers()
    setTarget(null)
    setCoords(null)
    setVisible(false)
  }, [clearTimers])

  /* --- delegated intent tracking --------------------------------------- */

  useEffect(() => {
    if (!mounted || coarse) return

    const linkFor = (node: EventTarget | null): HTMLElement | null => {
      if (!(node instanceof Element)) return null
      return node.closest<HTMLElement>('[data-wikilink]')
    }

    const scheduleOpen = (link: HTMLElement) => {
      const slug = link.dataset.wikilink
      const entry = slug ? bySlug.get(slug) : undefined
      if (!entry) return
      clearTimers()
      openTimer.current = setTimeout(() => {
        // The link may have been unmounted while we waited.
        if (!link.isConnected) return
        setCoords(null)
        setTarget({ entry, rect: link.getBoundingClientRect() })
      }, OPEN_DELAY)
    }

    const scheduleClose = () => {
      if (openTimer.current) clearTimeout(openTimer.current)
      openTimer.current = null
      if (closeTimer.current) clearTimeout(closeTimer.current)
      closeTimer.current = setTimeout(close, CLOSE_DELAY)
    }

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const link = linkFor(event.target)
      if (link) return scheduleOpen(link)
      if (cardRef.current?.contains(event.target as Node)) {
        if (closeTimer.current) clearTimeout(closeTimer.current)
        closeTimer.current = null
      }
    }

    const onPointerOut = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const from =
        linkFor(event.target) ??
        (cardRef.current?.contains(event.target as Node) ? cardRef.current : null)
      if (!from) return
      const to = event.relatedTarget
      // Moving between the link and the card should not dismiss.
      if (to instanceof Node && (linkFor(to) || cardRef.current?.contains(to))) return
      scheduleClose()
    }

    const onFocusIn = (event: FocusEvent) => {
      const link = linkFor(event.target)
      if (link) scheduleOpen(link)
    }

    const onFocusOut = (event: FocusEvent) => {
      if (linkFor(event.target)) scheduleClose()
    }

    document.addEventListener('pointerover', onPointerOver)
    document.addEventListener('pointerout', onPointerOut)
    document.addEventListener('focusin', onFocusIn)
    document.addEventListener('focusout', onFocusOut)
    return () => {
      document.removeEventListener('pointerover', onPointerOver)
      document.removeEventListener('pointerout', onPointerOut)
      document.removeEventListener('focusin', onFocusIn)
      document.removeEventListener('focusout', onFocusOut)
    }
  }, [mounted, coarse, bySlug, clearTimers, close])

  /* --- dismissal -------------------------------------------------------- */

  useEffect(() => close(), [pathname, close])

  useEffect(() => {
    if (!target) return
    const dismiss = () => close()
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('scroll', dismiss, { passive: true, capture: true })
    window.addEventListener('resize', dismiss, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('scroll', dismiss, { capture: true })
      window.removeEventListener('resize', dismiss)
      window.removeEventListener('keydown', onKey)
    }
  }, [target, close])

  useEffect(() => () => clearTimers(), [clearTimers])

  /* --- positioning ------------------------------------------------------ */

  useIsomorphicLayoutEffect(() => {
    const card = cardRef.current
    if (!target || !card) return

    const { rect } = target
    const height = card.offsetHeight
    const width = card.offsetWidth

    const below = rect.bottom + GAP
    const above = rect.top - GAP - height
    const fitsBelow = below + height <= window.innerHeight - MARGIN
    const top = fitsBelow
      ? below
      : above >= MARGIN
        ? above
        : Math.max(MARGIN, window.innerHeight - MARGIN - height)

    const preferred = rect.left + rect.width / 2 - width / 2
    const left = Math.min(
      Math.max(MARGIN, preferred),
      Math.max(MARGIN, window.innerWidth - MARGIN - width)
    )

    setCoords({ top, left })
  }, [target])

  // Fade in only once the card is measured and placed, so it never animates
  // from the off-screen staging position.
  useEffect(() => {
    if (!coords) {
      setVisible(false)
      return
    }
    const frame = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(frame)
  }, [coords])

  if (!mounted || coarse || !target) return null

  const { entry } = target

  return createPortal(
    <div
      ref={cardRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: coords?.top ?? -9999,
        left: coords?.left ?? -9999,
        width: WIDTH,
        maxWidth: `calc(100vw - ${MARGIN * 2}px)`,
        ...topicVars(entry.k),
      }}
      className={clsx(
        'z-50 rounded-xl border border-gray-200 bg-white p-4 shadow-lg transition-all duration-150 motion-reduce:transition-none dark:border-gray-800 dark:bg-gray-900',
        visible ? 'translate-y-0 opacity-100' : '-translate-y-0.5 opacity-0'
      )}
    >
      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{entry.t}</p>
      {entry.d && (
        <p className="mt-1.5 line-clamp-3 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
          {entry.d}
        </p>
      )}
      <p className="mt-2.5 flex items-center gap-1.5 text-[11px] font-medium text-gray-500 dark:text-gray-400">
        <span
          className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
          aria-hidden="true"
        />
        {topicLabel(entry.k)}
      </p>
    </div>,
    document.body
  )
}

export default HoverPreview
