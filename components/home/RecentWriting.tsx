import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import type { BlogPost, CoreContent } from '@/lib/content'
import { formatDate } from '@/lib/format-date'

interface Props {
  posts: CoreContent<BlogPost>[]
}

export default function RecentWriting({ posts }: Props) {
  if (posts.length === 0) return null

  return (
    <section aria-label="Recent blog posts" className="py-16">
      <div className="mb-10 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Recent Writing
        </h2>
        <Link
          href="/blog"
          className="hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
        >
          All writing <span aria-hidden="true">&rarr;</span>
          <span className="sr-only">blog posts</span>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(0, 3).map((post, i) => {
          const { slug, date, title, summary, tags } = post
          return (
            <article
              key={slug}
              className="group hover:border-primary-300 dark:hover:border-primary-700 flex flex-col rounded-xl border border-gray-200 p-6 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800"
              style={{ animationDelay: `${i * 75}ms` }}
            >
              <time dateTime={date} className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                {formatDate(date, siteMetadata.locale)}
              </time>
              <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 mb-2 text-lg leading-snug font-semibold text-gray-900 transition-colors dark:text-gray-100">
                <Link href={`/blog/${slug}`}>{title}</Link>
              </h3>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {summary}
              </p>
              <div className="flex flex-wrap gap-1" role="list" aria-label="Tags">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
