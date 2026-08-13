import { Card } from '@/components/Card'
import Link from '@/components/Link'
import { topicVars } from '@/components/knowledge/NoteCard'
import type { KnowledgeNote, KnowledgeTopic } from '@/lib/knowledge'
import clsx from 'clsx'
import type { CSSProperties } from 'react'

export interface TopicCardProps {
  topic: KnowledgeTopic
  /** A few representative notes, shown as plain titles rather than links. */
  preview?: KnowledgeNote[]
  /** Card occupies a full grid row — lays the preview titles out in two columns. */
  wide?: boolean
  className?: string
  style?: CSSProperties
}

/**
 * A domain, previewed. The whole card links to the topic page, so the preview
 * titles are deliberately not links — one destination per card.
 */
export function TopicCard({ topic, preview = [], wide = false, className, style }: TopicCardProps) {
  return (
    <Card
      as={Link}
      href={topic.path}
      className={clsx('relative flex h-full flex-col overflow-hidden p-6', className)}
      style={{ ...topicVars(topic.slug), ...style }}
    >
      <span
        className="absolute inset-x-0 top-0 h-[3px] bg-[var(--topic)] opacity-70 transition-opacity group-hover:opacity-100 dark:bg-[var(--topic-dark)]"
        aria-hidden="true"
      />

      <div className="flex items-baseline justify-between gap-3">
        <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-lg font-semibold text-gray-900 transition-colors dark:text-gray-100">
          {topic.name}
        </h3>
        <span className="shrink-0 rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-700 tabular-nums dark:bg-gray-800 dark:text-gray-300">
          {topic.noteCount}
          <span className="sr-only"> notes</span>
        </span>
      </div>

      {topic.blurb && (
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {topic.blurb}
        </p>
      )}

      {preview.length > 0 && (
        <ul
          className={clsx(
            'mt-4 border-t border-gray-100 pt-4 dark:border-gray-800',
            wide ? 'grid gap-x-8 gap-y-1.5 sm:grid-cols-2' : 'space-y-1.5'
          )}
        >
          {preview.map((note) => (
            <li
              key={note.slug}
              className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
            >
              <span
                className="inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
                aria-hidden="true"
              />
              <span className="truncate">{note.title}</span>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-auto pt-5 text-xs font-medium text-gray-500 dark:text-gray-400">
        Explore{' '}
        <span
          aria-hidden="true"
          className="inline-block transition-transform group-hover:translate-x-0.5"
        >
          &rarr;
        </span>
      </p>
    </Card>
  )
}

export default TopicCard
