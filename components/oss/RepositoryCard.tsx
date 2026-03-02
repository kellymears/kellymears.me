import Link from '@/components/Link'
import type { Repository } from '@/lib/github'
import { LANGUAGE_COLORS } from '@/lib/github'

interface RepositoryCardProps {
  repo: Repository
}

export function RepositoryCard({ repo }: RepositoryCardProps) {
  return (
    <Link
      href={repo.html_url}
      className="group hover:border-primary-300 dark:hover:border-primary-700 dark:hover:shadow-primary-950/20 flex flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50"
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-base font-semibold text-gray-900 transition-colors dark:text-gray-100">
          {repo.name}
        </h3>
        {repo.stargazers_count > 0 && (
          <span className="flex shrink-0 items-center gap-1 text-xs font-medium text-gray-500 dark:text-gray-400">
            <svg
              width="14"
              height="14"
              className="shrink-0 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {repo.stargazers_count.toLocaleString()}
          </span>
        )}
      </div>

      {repo.description && (
        <p className="mb-3 line-clamp-2 flex-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
          {repo.description}
        </p>
      )}

      <div className="mt-auto flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: LANGUAGE_COLORS[repo.language] ?? '#8b8b8b' }}
            />
            {repo.language}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <svg
              width="12"
              height="12"
              className="shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            {repo.forks_count.toLocaleString()}
          </span>
        )}
      </div>
    </Link>
  )
}
