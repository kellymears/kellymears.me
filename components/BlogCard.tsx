import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import type { BlogPost, CoreContent } from '@/lib/content'
import { formatDate } from '@/lib/format-date'

interface BlogCardProps {
  post: CoreContent<BlogPost>
}

export default function BlogCard({ post }: BlogCardProps) {
  const { path, date, title, summary, tags } = post

  return (
    <article className="group hover:border-primary-300 dark:hover:border-primary-700 dark:hover:shadow-primary-950/20 relative rounded-xl border border-gray-200 p-6 transition-all duration-200 hover:-translate-y-0.5 dark:border-gray-800">
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-50"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <time dateTime={date} suppressHydrationWarning>
          {formatDate(date, siteMetadata.locale)}
        </time>
      </div>

      <h2 className="mb-2 text-xl font-semibold tracking-tight">
        <Link
          href={`/${path}`}
          className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-gray-900 transition-colors dark:text-gray-100"
        >
          {title}
        </Link>
      </h2>

      {summary && (
        <p className="mb-4 text-sm leading-relaxed text-gray-600 dark:text-gray-400">{summary}</p>
      )}

      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((tag) => (
            <Tag key={tag} text={tag} />
          ))}
        </div>
      )}
    </article>
  )
}
