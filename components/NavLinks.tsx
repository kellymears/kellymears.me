'use client'

import headerNavLinks from '@/data/headerNavLinks'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

interface PillStyle {
  left: number
  width: number
  opacity: number
}

function resolveActiveHref(pathname: string): string | null {
  for (const link of headerNavLinks) {
    if (pathname === link.href || pathname.startsWith(link.href + '/')) return link.href
  }
  return null
}

export default function NavLinks() {
  const pathname = usePathname()
  const activeHref = resolveActiveHref(pathname)
  const containerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef(new Map<string, HTMLAnchorElement>())
  const [pill, setPill] = useState<PillStyle | null>(null)
  const isInitialRef = useRef(true)
  const [isInitial, setIsInitial] = useState(true)
  const reducedMotionRef = useRef(false)

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const setLinkRef = useCallback(
    (href: string) => (el: HTMLAnchorElement | null) => {
      if (el) linkRefs.current.set(href, el)
      else linkRefs.current.delete(href)
    },
    []
  )

  const measure = useCallback(() => {
    if (!activeHref || !containerRef.current) {
      setPill((prev) => (prev ? { ...prev, opacity: 0 } : null))
      return
    }
    const linkEl = linkRefs.current.get(activeHref)
    if (!linkEl || !containerRef.current) return
    const containerRect = containerRef.current.getBoundingClientRect()
    const linkRect = linkEl.getBoundingClientRect()
    setPill({
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      opacity: 1,
    })
  }, [activeHref])

  useLayoutEffect(() => {
    measure()
  }, [measure])

  useEffect(() => {
    if (isInitialRef.current) {
      requestAnimationFrame(() => {
        isInitialRef.current = false
        setIsInitial(false)
      })
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    const ro = new ResizeObserver(() => measure())
    ro.observe(container)
    return () => ro.disconnect()
  }, [measure])

  const pillTransition =
    isInitial || reducedMotionRef.current
      ? 'none'
      : 'left 500ms cubic-bezier(0.34, 1.56, 0.64, 1), width 500ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease'

  return (
    <div ref={containerRef} className="relative hidden items-center gap-x-5 sm:flex">
      {pill && (
        <div
          className="bg-primary-200/60 dark:bg-primary-800/40 absolute top-1/2 -z-1 h-[calc(100%+8px)] -translate-y-1/2 rounded-full"
          style={{
            left: pill.left - 10,
            width: pill.width + 20,
            opacity: pill.opacity,
            transition: pillTransition,
          }}
          aria-hidden="true"
        />
      )}
      {headerNavLinks.map((link) => {
        const isActive = link.href === activeHref
        return (
          <Link
            key={link.title}
            href={link.href}
            ref={setLinkRef(link.href)}
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
              'relative font-medium transition-colors duration-500',
              isActive
                ? 'text-gray-900 dark:text-gray-100'
                : 'hover:text-primary-600 dark:hover:text-primary-400 text-gray-600 dark:text-gray-300'
            )}
          >
            {link.title}
          </Link>
        )
      })}
    </div>
  )
}
