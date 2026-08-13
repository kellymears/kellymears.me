import { Card } from '@/components/Card'
import Link from '@/components/Link'
import { FALLBACK_TOPIC_COLOR, TOPIC_COLORS } from '@/components/knowledge/graph-colors'
import type { KnowledgeNote } from '@/lib/knowledge'
import clsx from 'clsx'
import type { CSSProperties } from 'react'

/**
 * Expose a topic's hue as `--topic` / `--topic-dark` so utilities can pick the
 * right one per colour scheme — dark mode here is class-based, so a single
 * resolved colour would be wrong half the time.
 */
export function topicVars(topic: string): CSSProperties {
  const color = TOPIC_COLORS[topic] ?? FALLBACK_TOPIC_COLOR
  return {
    '--topic': color.light,
    '--topic-dark': color.dark,
  } as CSSProperties
}

/** Small node-and-edges glyph standing in for "connections". */
function ConnectionsIcon(props: { className?: string }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx('shrink-0', props.className)}
      aria-hidden="true"
    >
      <circle cx="5" cy="6" r="2.5" />
      <circle cx="19" cy="12" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <path d="M7.3 7.1 16.7 11M16.7 13 7.3 16.9" />
    </svg>
  )
}

export interface NoteCardProps {
  note: KnowledgeNote
  compact?: boolean
  className?: string
}

/**
 * One concept note as a card. Accented on the left edge with its domain's
 * colour; `compact` drops the summary for dense lists.
 */
export function NoteCard({ note, compact = false, className }: NoteCardProps) {
  return (
    <Card
      as={Link}
      href={note.path}
      className={clsx(
        'relative flex h-full flex-col overflow-hidden',
        compact ? 'py-3 pr-4 pl-5' : 'py-5 pr-5 pl-6',
        className
      )}
      style={topicVars(note.topic)}
    >
      <span
        className="absolute inset-y-0 left-0 w-[3px] bg-[var(--topic)] opacity-50 transition-opacity group-hover:opacity-100 dark:bg-[var(--topic-dark)]"
        aria-hidden="true"
      />

      <h3
        className={clsx(
          'group-hover:text-primary-600 dark:group-hover:text-primary-400 font-semibold text-gray-900 transition-colors dark:text-gray-100',
          compact ? 'text-base' : 'text-lg'
        )}
      >
        {note.title}
      </h3>

      {!compact && note.summary && (
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {note.summary}
        </p>
      )}

      <p
        className={clsx(
          'flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400',
          compact ? 'mt-1.5' : 'mt-auto pt-4'
        )}
      >
        <span className="inline-flex items-center gap-1.5">
          <span
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
            aria-hidden="true"
          />
          {note.topicName}
        </span>
        <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">
          &middot;
        </span>
        <span className="inline-flex items-center gap-1 tabular-nums">
          <ConnectionsIcon />
          {note.degree}
          <span className="sr-only"> connections</span>
        </span>
      </p>
    </Card>
  )
}

export default NoteCard
