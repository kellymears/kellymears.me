'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Repository } from '@/lib/github'
import { LANGUAGE_COLORS } from '@/lib/github'

const FLIP_INTERVAL = 5000
const FLIP_DURATION = 300

interface FlippingCardGridProps {
  initialRepos: Repository[]
  pool: Repository[]
}

type FlipPhase = 'idle' | 'out' | 'in'

function CardContent({ repo }: { repo: Repository }) {
  return (
    <>
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-base font-semibold text-gray-900 transition-colors dark:text-gray-100">
          {repo.name}
        </h3>
        {repo.stargazers_count > 0 && (
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <svg
              width="14"
              height="14"
              className="shrink-0 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {repo.stargazers_count.toLocaleString()}
          </span>
        )}
      </div>

      {repo.description && (
        <p className="mb-3 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {repo.description}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#8b8b8b' }}
            />
            {repo.language}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <svg width="12" height="12" className="shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {repo.forks_count.toLocaleString()}
          </span>
        )}
      </div>
    </>
  )
}

export function FlippingCardGrid({ initialRepos, pool }: FlippingCardGridProps) {
  const [slots, setSlots] = useState<Repository[]>(initialRepos)
  const [flippingSlot, setFlippingSlot] = useState(-1)
  const [flipPhase, setFlipPhase] = useState<FlipPhase>('idle')
  const [nextSlot, setNextSlot] = useState(0)
  const [progress, setProgress] = useState(0)

  const [exhausted, setExhausted] = useState(pool.length === 0)
  const queueRef = useRef<Repository[]>([...pool])
  const nextSlotRef = useRef(nextSlot)
  const pausedRef = useRef(false)
  const visibleRef = useRef(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const focusedSlotRef = useRef<number | null>(null)

  const timerStartRef = useRef(0)
  const elapsedBeforePauseRef = useRef(0)
  const rafRef = useRef(0)
  const reducedMotionRef = useRef(false)

  // Keep nextSlotRef in sync
  useEffect(() => {
    nextSlotRef.current = nextSlot
  }, [nextSlot])

  // Check reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotionRef.current = mq.matches
    const handler = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const pickNextSlot = useCallback(
    (current: number, slotCount: number): number => {
      const jitter = 1 + Math.floor(Math.random() * 3)
      let candidate = (current + jitter) % slotCount
      // Skip focused slot
      if (focusedSlotRef.current === candidate) {
        candidate = (candidate + 1) % slotCount
      }
      return candidate
    },
    []
  )

  const doFlip = useCallback(() => {
    if (queueRef.current.length === 0) return

    const slotIdx = nextSlotRef.current

    // Phase 1: flip out
    setFlippingSlot(slotIdx)
    setFlipPhase('out')

    setTimeout(() => {
      // At midpoint: swap data — evicted repo is dropped (not recycled)
      const incoming = queueRef.current.shift()!
      setSlots((prev) => {
        const next = [...prev]
        next[slotIdx] = incoming
        return next
      })

      if (queueRef.current.length === 0) {
        setExhausted(true)
      }

      // Phase 2: flip in
      setFlipPhase('in')

      setTimeout(() => {
        setFlippingSlot(-1)
        setFlipPhase('idle')
      }, FLIP_DURATION)
    }, FLIP_DURATION)
  }, [])

  // Main rAF loop
  useEffect(() => {
    if (exhausted || reducedMotionRef.current) return

    const isPaused = () => pausedRef.current || !visibleRef.current

    timerStartRef.current = performance.now()
    elapsedBeforePauseRef.current = 0

    const tick = (now: number) => {
      if (isPaused()) {
        rafRef.current = requestAnimationFrame(tick)
        return
      }

      const elapsed =
        elapsedBeforePauseRef.current + (now - timerStartRef.current)
      const pct = Math.min((elapsed / FLIP_INTERVAL) * 100, 100)
      setProgress(pct)

      if (elapsed >= FLIP_INTERVAL) {
        doFlip()
        // Reset timer and advance next slot
        timerStartRef.current = performance.now()
        elapsedBeforePauseRef.current = 0
        setProgress(0)
        setNextSlot((prev) => pickNextSlot(prev, slots.length))
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [exhausted, doFlip, pickNextSlot, slots.length])

  // IntersectionObserver for visibility
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visibleRef.current
        visibleRef.current = entry!.isIntersecting

        if (entry!.isIntersecting && !wasVisible) {
          // Resuming — reset timer start, keep elapsed
          timerStartRef.current = performance.now()
        } else if (!entry!.isIntersecting && wasVisible) {
          // Pausing — accumulate elapsed
          elapsedBeforePauseRef.current +=
            performance.now() - timerStartRef.current
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Hover pause handlers
  const onMouseEnter = useCallback(() => {
    pausedRef.current = true
    elapsedBeforePauseRef.current +=
      performance.now() - timerStartRef.current
  }, [])

  const onMouseLeave = useCallback(() => {
    pausedRef.current = false
    timerStartRef.current = performance.now()
  }, [])

  const onSlotFocus = useCallback((idx: number) => {
    focusedSlotRef.current = idx
  }, [])

  const onSlotBlur = useCallback(() => {
    focusedSlotRef.current = null
  }, [])

  const announceRef = useRef<HTMLDivElement>(null)

  // Announce card swaps for screen readers
  useEffect(() => {
    if (flipPhase === 'in' && flippingSlot >= 0) {
      const repo = slots[flippingSlot]
      if (repo && announceRef.current) {
        announceRef.current.textContent = `Now showing ${repo.name} repository`
      }
    }
  }, [flipPhase, flippingSlot, slots])

  return (
    <>
      <div aria-live="polite" className="sr-only" ref={announceRef} />
      <div
        ref={containerRef}
        className="flip-card-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3"


      >
        {slots.map((repo, idx) => {
          const isFlipping = idx === flippingSlot
          const isNext = !exhausted && idx === nextSlot && flipPhase === 'idle'

          let animClass = ''
          if (isFlipping && flipPhase === 'out') animClass = 'animate-card-flip-out'
          else if (isFlipping && flipPhase === 'in') animClass = 'animate-card-flip-in'

          return (
            <a
              key={idx}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group hover:border-primary-300 dark:hover:border-primary-700 dark:hover:shadow-primary-950/20 relative overflow-hidden rounded-xl border border-gray-200 bg-white break-words transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 flip-card-slot ${animClass} ${isFlipping && flipPhase !== 'idle' ? 'pointer-events-none' : ''}`}
              onFocus={() => onSlotFocus(idx)}
              onBlur={onSlotBlur}
            >
              <div className="flex flex-col p-5">
                <CardContent repo={repo} />
              </div>
              {isNext && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5">
                  <div
                    className="bg-primary-400/60 dark:bg-primary-600/50 h-full transition-none"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              )}
            </a>
          )
        })}
      </div>
    </>
  )
}
