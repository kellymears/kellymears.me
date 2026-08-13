'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export interface WanderProps {
  /** Note paths to choose between. */
  paths: string[]
  label?: string
  className?: string
}

/**
 * Sends the reader to a random note. The draw happens in the click handler and
 * never during render — a random pick at render time would differ between the
 * server and client passes and blow up hydration.
 */
export function Wander({ paths, label = 'Take me somewhere', className }: WanderProps) {
  const router = useRouter()

  const wander = useCallback(() => {
    if (paths.length === 0) return
    const destination = paths[Math.floor(Math.random() * paths.length)]
    if (destination) router.push(destination)
  }, [paths, router])

  if (paths.length === 0) return null

  return (
    <button
      type="button"
      onClick={wander}
      className={clsx(
        'group hover:border-primary-400 hover:text-primary-600 dark:hover:border-primary-500 dark:hover:text-primary-400 inline-flex items-center gap-2 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors dark:border-gray-600 dark:text-gray-300',
        className
      )}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0 transition-transform duration-300 group-hover:rotate-45"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" />
        <path d="m15.5 8.5-2 5-5 2 2-5z" />
      </svg>
      {label}
    </button>
  )
}

export default Wander
