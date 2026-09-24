import Link from '@/components/Link'
import type { KnowledgeNote } from '@/lib/knowledge'
import clsx from 'clsx'
import type { ReactNode } from 'react'

interface NoteHeaderProps {
  note: KnowledgeNote
  /** Rendered on the breadcrumb row, right-aligned — e.g. "View random note". */
  action?: ReactNode
  className?: string
}

const Separator = () => (
  <li aria-hidden="true" className="text-gray-300 select-none dark:text-gray-700">
    /
  </li>
)

const Dot = () => (
  <span aria-hidden="true" className="text-gray-300 select-none dark:text-gray-700">
    &middot;
  </span>
)

/**
 * Notes carry no `# Heading` — the filename is the title — so the H1 is
 * synthesized here, and the frontmatter summary is promoted to a deck.
 */
const NoteHeader = ({ note, action, className }: NoteHeaderProps) => {
  const topicPath = `/knowledge/${note.topic}`
  const outbound = note.outbound.length
  const inbound = note.backlinks.length

  return (
    <header className={clsx('pt-10 pb-10', className)}>
      {/* The breadcrumb and the action share a row; `gap-y` lets the action wrap
          under a long trail on narrow screens rather than squashing it. */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 font-mono text-xs tracking-wider text-gray-500 uppercase dark:text-gray-400">
            <li>
              <Link
                href="/knowledge"
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                Knowledge
              </Link>
            </li>
            <Separator />
            <li>
              <Link
                href={topicPath}
                className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              >
                {note.topicName}
              </Link>
            </li>
            <Separator />
            <li aria-current="page" className="text-[var(--topic)] dark:text-[var(--topic-dark)]">
              {note.title}
            </li>
          </ol>
        </nav>
        {action}
      </div>

      <h1 className="mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[1] font-semibold tracking-[-0.03em] text-balance text-gray-900 dark:text-gray-100">
        {note.title}
      </h1>

      {note.summary && (
        <p className="mt-6 max-w-2xl border-l-2 border-[var(--topic)] pl-5 font-serif text-2xl leading-snug text-gray-700 italic sm:text-[1.75rem] dark:border-[var(--topic-dark)] dark:text-gray-300">
          {note.summary}
        </p>
      )}

      <div className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-gray-500 dark:text-gray-400">
        <Link
          href={topicPath}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--topic)] px-3 py-0.5 font-sans font-medium text-[var(--topic)] transition-colors hover:bg-[var(--topic)] hover:text-white dark:border-[var(--topic-dark)] dark:text-[var(--topic-dark)] dark:hover:bg-[var(--topic-dark)] dark:hover:text-gray-950"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
          {note.topicName}
        </Link>
        <span>{note.readingTime} min read</span>
        <Dot />
        <span>{note.wordCount} words</span>
        <Dot />
        <span title={`Links to ${outbound} notes; ${inbound} notes link here`}>
          {outbound} out &middot; {inbound} in
        </span>
      </div>

      {note.aliases.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase dark:text-gray-400">
            also called
          </span>
          {note.aliases.map((alias) => (
            <span
              key={alias}
              className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            >
              {alias}
            </span>
          ))}
        </div>
      )}
    </header>
  )
}

export { NoteHeader }
export default NoteHeader
