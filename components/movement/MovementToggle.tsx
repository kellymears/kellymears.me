'use client'

import type { ActivityGroup } from '@/lib/cycling-constants'
import Link from 'next/link'

const OPTIONS: { group: ActivityGroup; label: string }[] = [
  { group: 'cycling', label: 'Cycling' },
  { group: 'foot', label: 'Walk & Run' },
]

interface MovementToggleProps {
  active: ActivityGroup
}

export function MovementToggle({ active }: MovementToggleProps) {
  // Persist the choice so a later visit to a bare /movement restores this view.
  // The server reads this cookie when no ?type= param is present.
  function remember(group: ActivityGroup) {
    document.cookie = `movement-view=${group}; path=/; max-age=31536000; samesite=lax`
  }

  return (
    <div
      role="tablist"
      aria-label="Activity type"
      className="inline-flex rounded-full bg-gray-100 p-1 dark:bg-gray-800"
    >
      {OPTIONS.map(({ group, label }) => {
        const isActive = group === active
        return (
          <Link
            key={group}
            href={`/movement?type=${group}`}
            onClick={() => remember(group)}
            role="tab"
            aria-selected={isActive}
            className={
              isActive
                ? 'rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
                : 'rounded-full px-4 py-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
            }
          >
            {label}
          </Link>
        )
      })}
    </div>
  )
}
