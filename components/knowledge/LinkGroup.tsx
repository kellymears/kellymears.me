import NoteCard from '@/components/knowledge/NoteCard'
import Link from '@/components/Link'
import { getNoteBySlug, type KnowledgeNote } from '@/lib/knowledge'
import clsx from 'clsx'

type LinkGroupVariant = 'cards' | 'chips'

interface LinkGroupProps {
  /** Section heading, e.g. "See also". */
  title: string
  /** One line of UI copy explaining what this particular group means. */
  hint?: string
  slugs: string[]
  variant?: LinkGroupVariant
  className?: string
}

const Chip = ({ note }: { note: KnowledgeNote }) => (
  <Link
    href={note.path}
    data-wikilink={note.slug}
    title={note.summary}
    className="hover:border-primary-300 hover:text-primary-700 dark:hover:border-primary-700 dark:hover:text-primary-300 inline-flex items-center rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-sm text-gray-600 transition-all hover:-translate-y-px dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400"
  >
    {note.title}
  </Link>
)

/**
 * `See also` (hand-picked in the note) and `Related` (graph-derived) are
 * different claims, so they get different weight: cards with summaries versus
 * a quiet row of chips.
 */
const LinkGroup = ({ title, hint, slugs, variant = 'cards', className }: LinkGroupProps) => {
  const notes = slugs
    .map((slug) => getNoteBySlug(slug))
    .filter((note): note is KnowledgeNote => note !== undefined)

  if (notes.length === 0) return null

  return (
    <section aria-label={title} className={clsx('py-8', className)}>
      <div className="mb-5">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {title}
          <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
            {notes.length}
          </span>
        </h2>
        {hint && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{hint}</p>}
      </div>

      {variant === 'cards' ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <NoteCard key={note.slug} note={note} />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {notes.map((note) => (
            <Chip key={note.slug} note={note} />
          ))}
        </div>
      )}
    </section>
  )
}

export { LinkGroup }
export default LinkGroup
