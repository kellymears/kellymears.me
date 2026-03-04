'use client'

import BlogCard from '@/components/BlogCard'
import Link from '@/components/Link'
import type { BlogPost, CoreContent } from '@/lib/content'
import { getTagDisplayName } from '@/lib/tags'
import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<BlogPost>[]
  title: string
  initialDisplayPosts?: CoreContent<BlogPost>[]
  pagination?: PaginationProps
  tagCounts?: Record<string, number>
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname
    .replace(/^\//, '')
    .replace(/\/page\/\d+\/?$/, '')
    .replace(/\/$/, '')
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <nav aria-label="Pagination" className="space-y-2 pt-6 pb-8 md:space-y-5">
      <div className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </div>
    </nav>
  )
}

function EmptyState() {
  return (
    <div className="py-16 text-center">
      <div className="bg-primary-50 dark:bg-primary-950/50 mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary-400 dark:text-primary-500"
          aria-hidden="true"
        >
          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          <path d="m15 5 4 4" />
        </svg>
      </div>
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
        Writing in progress
      </h2>
      <p className="mx-auto max-w-md text-gray-500 dark:text-gray-400">
        New posts are being drafted. Check back soon for thoughts on engineering, open source, and
        building for the web.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link
          href="/"
          className="hover:border-primary-400 hover:text-primary-600 dark:hover:border-primary-500 dark:hover:text-primary-400 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors dark:border-gray-600 dark:text-gray-300"
        >
          Back home
        </Link>
        <Link
          href="/open-source"
          className="bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
        >
          View open source
        </Link>
      </div>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
  tagCounts,
}: ListLayoutProps) {
  const pathname = usePathname()
  const counts = tagCounts ?? {}
  const sortedTags = Object.keys(counts).sort((a, b) => counts[b]! - counts[a]!)
  const activeTag = pathname.startsWith('/tags/') ? decodeURI(pathname.split('/tags/')[1]!) : null

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts
  const hasPosts = displayPosts.length > 0
  const hasTags = sortedTags.length > 0

  return (
    <div>
      {/* Header with decorative flourish */}
      <header className="pt-12 pb-8">
        <p className="text-primary-600 dark:text-primary-400 mb-4 flex items-center gap-2 text-sm font-medium tracking-widest uppercase">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary-500 dark:text-primary-400"
            aria-hidden="true"
          >
            <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
          </svg>
          Writing
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Thoughts on engineering, open source, and building for the web.
        </p>
      </header>

      {/* Tag filter navigation */}
      {hasTags && (
        <nav
          aria-label="Filter posts by tag"
          className="mb-10 rounded-xl border border-gray-100 bg-gray-50/50 p-4 dark:border-gray-800 dark:bg-gray-900/30"
        >
          <p className="mb-3 text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Filter by topic
          </p>
          <div className="flex flex-wrap gap-2" role="list">
            <Link
              href="/blog"
              role="listitem"
              className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                !activeTag
                  ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-sm'
                  : 'hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 bg-white text-gray-700 shadow-sm hover:-translate-y-0.5 hover:shadow dark:bg-gray-800 dark:text-gray-300'
              }`}
              aria-current={!activeTag ? 'page' : undefined}
            >
              All Posts
            </Link>
            {sortedTags.map((tag, i) => {
              const isActive = activeTag === slug(tag)
              return (
                <Link
                  key={tag}
                  href={`/tags/${slug(tag)}`}
                  role="listitem"
                  className={`rounded-full px-3 py-1 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-primary-500 dark:bg-primary-600 text-white shadow-sm'
                      : 'hover:bg-primary-50 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 bg-white text-gray-700 shadow-sm hover:-translate-y-0.5 hover:shadow dark:bg-gray-800 dark:text-gray-300'
                  }`}
                  style={{ animationDelay: `${i * 30}ms` }}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`View posts tagged ${getTagDisplayName(tag)}`}
                >
                  {getTagDisplayName(tag)}
                  <span className="ml-1.5 text-xs opacity-60">({counts[tag]})</span>
                </Link>
              )
            })}
          </div>
        </nav>
      )}

      {/* Post grid or empty state */}
      {hasPosts ? (
        <section aria-label="Blog posts">
          <div className="grid gap-6 md:grid-cols-2">
            {displayPosts.map((post, i) => (
              <div
                key={post.path}
                className="animate-fade-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        </section>
      ) : (
        <EmptyState />
      )}

      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
