'use client'

import {
  BranchIcon,
  CommentIcon,
  GitCommitIcon,
  IssueClosedIcon,
  IssueOpenIcon,
  PrClosedIcon,
  PrMergedIcon,
  PrOpenIcon,
  ReviewIcon,
} from '@/components/icons'
import type { ActivityEvent, ActivityGroup, ActivityKind, RecentActivity } from '@/lib/github'
import type { ComponentType, SVGProps } from 'react'
import { useState } from 'react'

interface CommitTimelineProps {
  activity: RecentActivity
}

export function CommitTimeline({ activity }: CommitTimelineProps) {
  const [visibleGroups, setVisibleGroups] = useState(3)

  if (activity.groups.length === 0) return null

  const groups = activity.groups.slice(0, visibleGroups)
  const hasMore = visibleGroups < activity.groups.length

  return (
    <section className="animate-on-scroll py-8" aria-label="Recent GitHub activity">
      <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Recent Activity
      </h2>
      <p className="mb-8 text-sm text-gray-500 dark:text-gray-400">
        {activity.totalEvents} events in the last 90 days
      </p>

      <div className="relative" role="list" aria-label="Activity timeline">
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
    <div className={`relative pl-8 ${isLast ? 'pb-0' : 'pb-8'}`} role="listitem">
      {!isLast && (
        <div className="absolute top-1 left-0 h-full w-px bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900" />
      )}
      <div className="animate-timeline-pulse bg-primary-400 dark:bg-primary-500 absolute top-1.5 left-[-4px] h-2 w-2 rounded-full" />

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
  const KindIcon = KIND_ICONS[event.kind]
  return (
    <div className="flex items-center gap-2 text-sm">
      <KindIcon className="text-gray-500 dark:text-gray-400" />
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
      <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400">{event.repo}</span>
    </div>
  )
}

const KIND_ICONS: Record<ActivityKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  push: GitCommitIcon,
  pr_opened: PrOpenIcon,
  pr_merged: PrMergedIcon,
  pr_closed: PrClosedIcon,
  review: ReviewIcon,
  comment: CommentIcon,
  issue_opened: IssueOpenIcon,
  issue_closed: IssueClosedIcon,
  branch_created: BranchIcon,
}
