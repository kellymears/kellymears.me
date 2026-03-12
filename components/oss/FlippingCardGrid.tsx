'use client'

import { Card } from '@/components/Card'
import { RepoCardContent } from '@/components/oss/RepositoryCard'
import type { Repository } from '@/lib/github'
import { useCallback, useEffect, useRef, useState } from 'react'

const FLIP_INTERVAL = 5000
const FLIP_DURATION = 300

interface FlippingCardGridProps {
  initialRepos: Repository[]
  pool: Repository[]
}

type FlipPhase = 'idle' | 'out' | 'in'

export function FlippingCardGrid({ initialRepos, pool }: FlippingCardGridProps) {
  const [slots, setSlots] = useState<Repository[]>(initialRepos)
  const [flippingSlot, setFlippingSlot] = useState(-1)
  const [flipPhase, setFlipPhase] = useState<FlipPhase>('idle')
  const [nextSlot, setNextSlot] = useState(0)
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
  const progressBarRef = useRef<HTMLDivElement>(null)
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

  const pickNextSlot = useCallback((current: number, slotCount: number): number => {
    const jitter = 1 + Math.floor(Math.random() * 3)
    let candidate = (current + jitter) % slotCount
    // Skip focused slot
    if (focusedSlotRef.current === candidate) {
      candidate = (candidate + 1) % slotCount
    }
    return candidate
  }, [])

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

      const elapsed = elapsedBeforePauseRef.current + (now - timerStartRef.current)
      const pct = Math.min((elapsed / FLIP_INTERVAL) * 100, 100)
      if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`

      if (elapsed >= FLIP_INTERVAL) {
        doFlip()
        // Reset timer and advance next slot
        timerStartRef.current = performance.now()
        elapsedBeforePauseRef.current = 0
        if (progressBarRef.current) progressBarRef.current.style.width = '0%'
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
          elapsedBeforePauseRef.current += performance.now() - timerStartRef.current
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
    elapsedBeforePauseRef.current += performance.now() - timerStartRef.current
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
      <div ref={containerRef} className="flip-card-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {slots.map((repo, idx) => {
          const isFlipping = idx === flippingSlot
          const isNext = !exhausted && idx === nextSlot && flipPhase === 'idle'

          let animClass = ''
          if (isFlipping && flipPhase === 'out') animClass = 'animate-card-flip-out'
          else if (isFlipping && flipPhase === 'in') animClass = 'animate-card-flip-in'

          return (
            <Card
              as="a"
              key={idx}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flip-card-slot relative h-36 overflow-hidden bg-white break-words dark:bg-gray-900/50 ${animClass} ${isFlipping && flipPhase !== 'idle' ? 'pointer-events-none' : ''}`}
              onFocus={() => onSlotFocus(idx)}
              onBlur={onSlotBlur}
            >
              <div className="flex h-full flex-col px-5 pt-5 pb-3">
                <RepoCardContent repo={repo} />
              </div>
              {isNext && (
                <div className="absolute right-0 bottom-0 left-0 h-0.5">
                  <div
                    ref={progressBarRef}
                    className="bg-primary-400/60 dark:bg-primary-600/50 h-full w-0 transition-none"
                  />
                </div>
              )}
            </Card>
          )
        })}
      </div>
    </>
  )
}
