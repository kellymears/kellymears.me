import { Card } from '@/components/Card'
import Link from '@/components/Link'
import type { KnowledgeNote } from '@/lib/knowledge'

interface NoteFooterNavProps {
  prev?: KnowledgeNote | undefined
  next?: KnowledgeNote | undefined
  topicSlug: string
  topicName: string
}

/** Alphabetical neighbours inside the same topic, plus the way back up. */
const NoteFooterNav = ({ prev, next, topicSlug, topicName }: NoteFooterNavProps) => (
  <footer
    aria-label="Note navigation"
    className="border-t border-gray-200 pt-8 pb-12 dark:border-gray-800"
  >
    {(prev || next) && (
      <div className="grid gap-4 sm:grid-cols-2">
        {prev ? (
          <Card as={Link} href={prev.path} hover={false} className="p-4 hover:shadow-sm">
            <span className="mb-1 block text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
              &larr; Previous
            </span>
            <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-sm font-semibold text-gray-900 transition-colors dark:text-gray-100">
              {prev.title}
            </span>
          </Card>
        ) : (
          <div />
        )}

        {next ? (
          <Card as={Link} href={next.path} hover={false} className="p-4 text-right hover:shadow-sm">
            <span className="mb-1 block text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
              Next &rarr;
            </span>
            <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-sm font-semibold text-gray-900 transition-colors dark:text-gray-100">
              {next.title}
            </span>
          </Card>
        ) : (
          <div />
        )}
      </div>
    )}

    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
      <Link
        href={`/knowledge/${topicSlug}`}
        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
      >
        &larr; All of {topicName}
      </Link>
      <Link
        href="/knowledge"
        className="hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
      >
        Knowledge index
      </Link>
    </div>
  </footer>
)

export { NoteFooterNav }
export default NoteFooterNav
