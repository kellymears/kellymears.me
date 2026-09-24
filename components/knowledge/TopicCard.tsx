import Link from '@/components/Link'
import { topicVars } from '@/components/knowledge/NoteCard'
import {
  SILHOUETTE_H,
  SILHOUETTE_W,
  type TopicSilhouette,
} from '@/components/knowledge/topic-silhouette'
import type { KnowledgeNote, KnowledgeTopic } from '@/lib/knowledge'
import clsx from 'clsx'
import type { CSSProperties } from 'react'

export interface TopicCardProps {
  topic: KnowledgeTopic
  /** Folio shown above the name, e.g. `03`. */
  index?: string
  /** This domain's own constellation, cropped from the whole-vault layout. */
  silhouette?: TopicSilhouette
  /** A few representative notes, shown as plain titles rather than links. */
  preview?: KnowledgeNote[]
  className?: string
  style?: CSSProperties
}

/**
 * A domain, previewed by its shape in the map. The whole card links to the
 * topic page, so the preview titles are deliberately not links — one
 * destination per card.
 */
export function TopicCard({
  topic,
  index,
  silhouette,
  preview = [],
  className,
  style,
}: TopicCardProps) {
  return (
    <Link
      href={topic.path}
      className={clsx(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--topic)] hover:shadow-[0_18px_40px_-24px_var(--topic)] dark:border-gray-800 dark:hover:border-[var(--topic-dark)]',
        className
      )}
      style={{ ...topicVars(topic.slug), ...style }}
    >
      {silhouette && silhouette.dots.length > 0 && (
        <div
          aria-hidden="true"
          className="relative h-32 overflow-hidden bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--topic)_12%,transparent),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,color-mix(in_oklch,var(--topic-dark)_14%,transparent),transparent_70%)]"
        >
          <svg
            viewBox={`0 0 ${SILHOUETTE_W} ${SILHOUETTE_H}`}
            width={SILHOUETTE_W}
            height={SILHOUETTE_H}
            className="topic-sil absolute inset-0 h-full w-full"
          >
            <path d={silhouette.edges} className="topic-sil-edges" fill="none" strokeWidth="0.5" />
            {silhouette.dots.map((d, i) => (
              <circle
                key={i}
                cx={d.x}
                cy={d.y}
                r={d.r}
                className={d.hub ? 'topic-sil-hub' : undefined}
              />
            ))}
          </svg>
        </div>
      )}

      <div className="flex flex-1 flex-col p-5 pt-4">
        <p className="flex items-center justify-between font-mono text-[0.7rem] tabular-nums">
          <span className="text-[var(--topic)] dark:text-[var(--topic-dark)]">{index}</span>
          <span className="text-gray-500 dark:text-gray-400">{topic.noteCount} notes</span>
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
          {topic.name}
        </h3>
        {topic.blurb && (
          <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            {topic.blurb}
          </p>
        )}
        {preview.length > 0 && (
          <p className="mt-auto line-clamp-2 pt-4 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
            {preview.map((note, i) => (
              <span key={note.slug}>
                {i > 0 && (
                  <span
                    aria-hidden="true"
                    className="px-1.5 text-[var(--topic)] dark:text-[var(--topic-dark)]"
                  >
                    ·
                  </span>
                )}
                {note.title}
              </span>
            ))}
          </p>
        )}
      </div>
    </Link>
  )
}

export default TopicCard
