import Link from '@/components/Link'
import { getNoteBySlug, type KnowledgeNote } from '@/lib/knowledge'
import clsx from 'clsx'

interface BacklinksProps {
  slugs: string[]
  className?: string
}

/**
 * The inbound half of the graph — every note that reaches for this one. It is
 * the reason the vault is worth rendering at all, so it gets full rows with
 * summaries rather than a footer of bare titles.
 */
const Backlinks = ({ slugs, className }: BacklinksProps) => {
  const notes = slugs
    .map((slug) => getNoteBySlug(slug))
    .filter((note): note is KnowledgeNote => note !== undefined)
    .sort((a, b) => a.title.localeCompare(b.title))

  return (
    <section aria-label="Linked from" className={clsx('py-8', className)}>
      <div className="mb-5">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Linked from
          {notes.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-400 dark:text-gray-500">
              {notes.length}
            </span>
          )}
        </h2>
      </div>

      {notes.length === 0 ? (
        <p className="rounded-xl border border-dashed border-gray-200 px-5 py-6 text-sm text-gray-500 dark:border-gray-800 dark:text-gray-400">
          Nothing links here yet — this note is a leaf.
        </p>
      ) : (
        <ul className="divide-y divide-gray-200 overflow-hidden rounded-xl border border-gray-200 dark:divide-gray-800 dark:border-gray-800">
          {notes.map((note) => (
            <li key={note.slug}>
              <Link
                href={note.path}
                data-wikilink={note.slug}
                className="group block px-5 py-4 transition-colors hover:bg-gray-50/80 dark:hover:bg-gray-900/50"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 font-semibold text-gray-900 transition-colors dark:text-gray-100">
                    {note.title}
                  </span>
                  <span className="shrink-0 text-xs font-medium text-gray-400 uppercase dark:text-gray-500">
                    {note.topicName}
                  </span>
                </div>
                {note.summary && (
                  <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {note.summary}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export { Backlinks }
export default Backlinks
