import { Card } from '@/components/Card'
import { CalendarIcon } from '@/components/icons'
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
    <Card as="article" className="relative p-6 duration-200">
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <CalendarIcon className="opacity-50" />
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
    </Card>
  )
}
