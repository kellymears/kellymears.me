import FontSizeControl from '@/components/blog/FontSizeControl'
import ReadingProgress from '@/components/blog/ReadingProgress'
import Link from '@/components/Link'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import SectionContainer from '@/components/SectionContainer'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import type { Author, BlogPost, CoreContent } from '@/lib/content'
import { ReactNode } from 'react'

const editUrl = (path: string) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<BlogPost>
  authorDetails: CoreContent<Author>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  children: ReactNode
}

export default function PostLayout({ content, next, prev, children }: LayoutProps) {
  const { filePath, path, date, title, tags, readingTime } = content
  const basePath = path.split('/')[0]

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <header className="pt-6 pb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={date}>
                {new Date(date).toLocaleDateString(siteMetadata.locale, postDateTemplate)}
              </time>
              {readingTime && (
                <>
                  <span>&middot;</span>
                  <span>{readingTime.text}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
              {title}
            </h1>

            <div className="flex items-center justify-between">
              {tags && tags.length > 0 ? (
                <div className="flex flex-wrap items-center gap-1">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              ) : (
                <div />
              )}
              <FontSizeControl />
            </div>
          </div>
        </header>

        <div className="border-t border-gray-200 dark:border-gray-800">
          <div id="article-prose" className="prose prose-lg dark:prose-invert mx-auto max-w-prose pt-10 pb-8">
            {children}
          </div>
        </div>

        <footer className="border-t border-gray-200 pt-8 pb-8 dark:border-gray-800">
          <div className="mb-8 text-sm text-gray-700 dark:text-gray-300">
            <Link href={editUrl(filePath)}>View on GitHub</Link>
          </div>

          {(prev || next) && (
            <div className="grid gap-4 sm:grid-cols-2">
              {prev && prev.path ? (
                <Link
                  href={`/${prev.path}`}
                  className="group hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-gray-200 p-4 transition-all hover:shadow-sm dark:border-gray-800"
                >
                  <span className="mb-1 block text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    &larr; Previous
                  </span>
                  <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}

              {next && next.path ? (
                <Link
                  href={`/${next.path}`}
                  className="group hover:border-primary-300 dark:hover:border-primary-700 rounded-xl border border-gray-200 p-4 text-right transition-all hover:shadow-sm dark:border-gray-800"
                >
                  <span className="mb-1 block text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                    Next &rarr;
                  </span>
                  <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-sm font-semibold text-gray-900 dark:text-gray-100">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>
          )}

          <div className="mt-8">
            <Link
              href={`/${basePath}`}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium transition-colors"
              aria-label="Back to the blog"
            >
              &larr; Back to the blog
            </Link>
          </div>
        </footer>
      </article>
      <ReadingProgress />
    </SectionContainer>
  )
}
