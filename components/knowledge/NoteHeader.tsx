import Link from '@/components/Link'
import type { KnowledgeNote } from '@/lib/knowledge'
import clsx from 'clsx'

interface NoteHeaderProps {
  note: KnowledgeNote
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
 * synthesised here, and the frontmatter summary is promoted to a deck.
 */
const NoteHeader = ({ note, className }: NoteHeaderProps) => {
  const topicPath = `/knowledge/${note.topic}`
  const outbound = note.outbound.length
  const inbound = note.backlinks.length

  return (
    <header className={clsx('pt-8 pb-8', className)}>
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
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
          <li aria-current="page" className="text-gray-700 dark:text-gray-300">
            {note.title}
          </li>
        </ol>
      </nav>

      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-gray-100">
        {note.title}
      </h1>

      {note.summary && (
        <p className="border-primary-300 dark:border-primary-700 mt-5 max-w-2xl border-l-2 pl-4 text-lg leading-relaxed font-light text-gray-600 sm:text-xl dark:text-gray-400">
          {note.summary}
        </p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
        <Link
          href={topicPath}
          className="bg-primary-100 text-primary-700 dark:bg-primary-900/80 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-900 rounded-full px-3 py-0.5 text-xs font-semibold transition-colors"
        >
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
          <span className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
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
