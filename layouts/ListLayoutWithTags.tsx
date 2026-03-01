'use client'

import BlogCard from '@/components/BlogCard'
import Link from '@/components/Link'
import tagData from 'app/tags.generated.json'
import type { Blog } from 'contentlayer/generated'
import { slug } from 'github-slugger'
import { usePathname } from 'next/navigation'
import { CoreContent } from 'pliny/utils/contentlayer'

interface PaginationProps {
  totalPages: number
  currentPage: number
}

interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
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
    <div className="space-y-2 pt-6 pb-8 md:space-y-5">
      <nav className="flex justify-between">
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
      </nav>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const sortedTags = Object.keys(tagCounts).sort((a, b) => tagCounts[b] - tagCounts[a])
  const activeTag = pathname.startsWith('/tags/') ? decodeURI(pathname.split('/tags/')[1]) : null

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <div>
      <div className="pt-6 pb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
          {title}
        </h1>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <Link
          href="/blog"
          className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
            !activeTag
              ? 'bg-primary-500 dark:bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
          }`}
        >
          All Posts
        </Link>
        {sortedTags.map((tag) => {
          const isActive = activeTag === slug(tag)
          return (
            <Link
              key={tag}
              href={`/tags/${slug(tag)}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-primary-500 dark:bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              aria-label={`View posts tagged ${tag}`}
            >
              {tag} ({tagCounts[tag]})
            </Link>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {displayPosts.map((post) => (
          <BlogCard key={post.path} post={post} />
        ))}
      </div>

      {pagination && pagination.totalPages > 1 && (
        <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
      )}
    </div>
  )
}
