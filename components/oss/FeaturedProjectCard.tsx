import Link from '@/components/Link'
import type { FeaturedRepository } from '@/lib/github'
import { LANGUAGE_COLORS } from '@/lib/github'

interface FeaturedProjectCardProps {
  repo: FeaturedRepository
  index?: number
}

export function FeaturedProjectCard({ repo, index = 0 }: FeaturedProjectCardProps) {
  return (
    <Link
      href={repo.html_url}
      className="group border-primary-200 bg-primary-50/60 hover:border-primary-300 dark:border-primary-800/60 dark:bg-primary-950/40 dark:hover:border-primary-700 relative flex flex-col overflow-hidden rounded-2xl border p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-8"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="from-primary-100/40 dark:from-primary-900/20 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent" />

      <div className="relative">
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <h3 className="group-hover:text-primary-700 dark:group-hover:text-primary-300 text-xl font-bold tracking-tight text-gray-900 transition-colors dark:text-gray-100">
            {repo.full_name}
          </h3>
          <span className="bg-primary-100 text-primary-700 dark:bg-primary-900/80 dark:text-primary-300 rounded-full px-3 py-0.5 text-xs font-semibold">
            {repo.role}
          </span>
        </div>

        <p className="mb-5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {repo.highlight}
        </p>

        <div className="flex flex-wrap items-center gap-5 text-sm">
          <span className="flex items-center gap-1.5 font-medium text-gray-800 dark:text-gray-200">
            <svg
              width="16"
              height="16"
              className="shrink-0 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {repo.stargazers_count.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
            <svg
              width="16"
              height="16"
              className="shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {repo.forks_count.toLocaleString()} forks
          </span>
          {repo.language && (
            <span className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
              <span
                className="inline-block h-3 w-3 shrink-0 rounded-full shadow-sm"
                style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#8b8b8b' }}
              />
              {repo.language}
            </span>
          )}
          <span className="text-primary-600 group-hover:text-primary-700 dark:text-primary-400 dark:group-hover:text-primary-300 ml-auto inline-flex items-center gap-1 text-sm font-medium transition-colors">
            View
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </span>
        </div>
      </div>
    </Link>
  )
}
