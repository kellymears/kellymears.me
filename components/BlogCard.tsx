import Link from '@/components/Link'
import Tag from '@/components/Tag'
import type { BlogPost, CoreContent } from '@/lib/content'
import { formatDate } from '@/lib/format-date'
import siteMetadata from '@/data/siteMetadata'

interface BlogCardProps {
  post: CoreContent<BlogPost>
}

export default function BlogCard({ post }: BlogCardProps) {
  const { path, date, title, summary, tags } = post

  return (
    <article className="group hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-gray-200 p-6 transition-all hover:shadow-sm dark:border-gray-800">
      <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
        <time dateTime={date} suppressHydrationWarning>
          {formatDate(date, siteMetadata.locale)}
        </time>
      </div>

      <h2 className="mb-2 text-xl font-semibold tracking-tight">
        <Link
          href={`/${path}`}
          className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-gray-900 dark:text-gray-100"
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
