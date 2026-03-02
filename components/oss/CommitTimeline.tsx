'use client'

import { useState } from 'react'
import type { ActivityEvent, ActivityGroup, ActivityKind, RecentActivity } from '@/lib/github'

interface CommitTimelineProps {
  activity: RecentActivity
}

export function CommitTimeline({ activity }: CommitTimelineProps) {
  const [visibleGroups, setVisibleGroups] = useState(3)

  if (activity.groups.length === 0) return null

  const groups = activity.groups.slice(0, visibleGroups)
  const hasMore = visibleGroups < activity.groups.length

  return (
    <section className="animate-on-scroll py-8">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Recent Activity
      </h2>
      <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        {activity.totalEvents} events in the last 90 days
      </p>

      <div className="relative">
        {groups.map((group, i) => (
          <DateGroup key={group.date} group={group} isLast={i === groups.length - 1 && !hasMore} />
        ))}
      </div>

      {hasMore && (
        <button
          type="button"
          onClick={() => setVisibleGroups((n) => n + 10)}
          className="hover:text-primary-600 dark:hover:text-primary-400 mt-4 ml-8 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
        >
          Show more activity
        </button>
      )}
    </section>
  )
}

function DateGroup({ group, isLast }: { group: ActivityGroup; isLast: boolean }) {
  const [expanded, setExpanded] = useState(group.events.length <= 3)
  const visible = expanded ? group.events : group.events.slice(0, 3)
  const remaining = group.events.length - 3

  return (
    <div className={`relative pl-8 ${isLast ? 'pb-0' : 'pb-8'}`}>
      {!isLast && (
        <div className="absolute top-1 left-0 h-full w-px bg-gray-200 dark:bg-gray-800" />
      )}
      <div className="absolute top-1.5 left-[-4px] h-2 w-2 rounded-full bg-primary-400 dark:bg-primary-500" />

      <p className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">{group.label}</p>

      <div className="space-y-2">
        {visible.map((event, i) => (
          <EventRow key={`${event.kind}-${event.timestamp}-${i}`} event={event} />
        ))}
      </div>

      {!expanded && remaining > 0 && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="hover:text-primary-600 dark:hover:text-primary-400 mt-2 text-xs font-medium text-gray-500 transition-colors dark:text-gray-400"
        >
          +{remaining} more event{remaining !== 1 ? 's' : ''}
        </button>
      )}
    </div>
  )
}

function EventRow({ event }: { event: ActivityEvent }) {
  if (event.isPrivate) {
    return (
      <div className="flex items-center gap-2 text-sm">
        <KindIcon kind={event.kind} className="text-gray-400 dark:text-gray-500" />
        <span className="text-gray-400 dark:text-gray-500">
          {event.message} · {event.repo}
        </span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2 text-sm">
      <KindIcon kind={event.kind} className="text-gray-500 dark:text-gray-400" />
      {event.sha && (
        <code className="shrink-0 rounded bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
          {event.sha}
        </code>
      )}
      {event.url ? (
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary-600 dark:hover:text-primary-400 min-w-0 flex-1 truncate text-gray-700 transition-colors dark:text-gray-300"
        >
          {event.message}
        </a>
      ) : (
        <span className="min-w-0 flex-1 truncate text-gray-700 dark:text-gray-300">
          {event.message}
        </span>
      )}
      <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">{event.repo}</span>
    </div>
  )
}

function KindIcon({ kind, className }: { kind: ActivityKind; className?: string }) {
  const cn = `shrink-0 ${className ?? ''}`

  switch (kind) {
    case 'push':
      // Git commit icon
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={cn}>
          <path d="M10.5 7.75a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Zm1.43.75a4.002 4.002 0 0 1-7.86 0H.75a.75.75 0 0 1 0-1.5h3.32a4.002 4.002 0 0 1 7.86 0h3.32a.75.75 0 0 1 0 1.5Zm-1.43-.75a2.5 2.5 0 0 0-5 0Z" />
        </svg>
      )
    case 'pr_opened':
      // PR open icon
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={cn}>
          <path d="M1.5 3.25a2.25 2.25 0 1 1 3 2.122v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 1.5 3.25Zm5.677-.177L9.573.677A.25.25 0 0 1 10 .854V2.5h1A2.5 2.5 0 0 1 13.5 5v5.628a2.251 2.251 0 1 1-1.5 0V5a1 1 0 0 0-1-1h-1v1.646a.25.25 0 0 1-.427.177L7.177 3.427a.25.25 0 0 1 0-.354ZM3.75 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm8.25.75a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
        </svg>
      )
    case 'pr_merged':
      // PR merged icon
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={cn}>
          <path d="M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" />
        </svg>
      )
    case 'pr_closed':
      // PR closed icon
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={cn}>
          <path d="M3.25 1A2.25 2.25 0 0 1 4 5.372v5.256a2.251 2.251 0 1 1-1.5 0V5.372A2.25 2.25 0 0 1 3.25 1Zm9.5 5.5a.75.75 0 0 1 .75.75v3.378a2.251 2.251 0 1 1-1.5 0V7.25a.75.75 0 0 1 .75-.75Zm-1.143-2.232a.75.75 0 1 0-1.214-.882l-2.5 3.44a.75.75 0 1 0 1.214.883ZM3.25 2.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm0 9.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM12 13.25a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Z" />
        </svg>
      )
    case 'review':
      // Eye/review icon
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={cn}>
          <path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.824.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z" />
        </svg>
      )
    case 'comment':
      // Comment icon
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={cn}>
          <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
        </svg>
      )
    case 'issue_opened':
      // Issue open icon
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={cn}>
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
        </svg>
      )
    case 'issue_closed':
      // Issue closed icon (checkmark circle)
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={cn}>
          <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0ZM16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z" />
        </svg>
      )
    case 'branch_created':
      // Branch icon
      return (
        <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" className={cn}>
          <path d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" />
        </svg>
      )
  }
}
