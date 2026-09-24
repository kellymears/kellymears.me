import { Accent, SectionHeading } from '@/components/home/SectionHeading'
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
    <section aria-label="Recent blog posts" className="py-16 sm:py-20">
      <SectionHeading index="05" href="/blog" linkLabel="All writing" srLabel="blog posts">
        Recent <Accent>writing</Accent>
      </SectionHeading>

      <ol className="border-t border-gray-200 dark:border-gray-800">
        {posts.slice(0, 3).map((post) => {
          const { slug, date, title, summary, tags, readingTime } = post
          return (
            <li key={slug} className="border-b border-gray-200 dark:border-gray-800">
              <article className="group/post hover:bg-primary-50/60 dark:hover:bg-primary-950/30 relative -mx-4 grid gap-3 px-4 py-8 transition-colors sm:-mx-6 sm:px-6 md:grid-cols-[9rem_minmax(0,1fr)_auto] md:gap-8 md:rounded-lg">
                <div className="font-mono text-xs text-gray-500 tabular-nums md:pt-2 dark:text-gray-400">
                  <time dateTime={date}>{formatDate(date, siteMetadata.locale)}</time>
                  {readingTime && (
                    <p className="mt-1 text-gray-400 dark:text-gray-500">
                      {Math.max(1, Math.round(readingTime.minutes))} min read
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-2xl leading-tight font-semibold tracking-tight text-gray-900 sm:text-3xl dark:text-gray-100">
                    <Link
                      href={`/blog/${slug}`}
                      className="group-hover/post:text-primary-700 dark:group-hover/post:text-primary-300 transition-colors after:absolute after:inset-0 after:content-['']"
                    >
                      {title}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-400">
                    {summary}
                  </p>
                  <div className="relative z-10 mt-4 flex flex-wrap" role="list" aria-label="Tags">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                </div>
                <span
                  aria-hidden="true"
                  className="group-hover/post:border-primary-500 group-hover/post:bg-primary-500 hidden h-11 w-11 items-center justify-center self-center rounded-full border border-gray-300 text-gray-500 transition-all duration-300 group-hover/post:-rotate-45 group-hover/post:text-white md:flex dark:border-gray-700 dark:text-gray-400"
                >
                  &rarr;
                </span>
              </article>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
