import Link from '@/components/Link'
import { CommitTimeline } from '@/components/oss/CommitTimeline'
import { ContributionGrid } from '@/components/oss/ContributionGrid'
import { FeaturedProjects } from '@/components/oss/FeaturedProjects'
import { LanguageBreakdown } from '@/components/oss/LanguageBreakdown'
import { ProfileStats } from '@/components/oss/ProfileStats'
import { RepositoryGrid } from '@/components/oss/RepositoryGrid'
import { CliProjectCard } from '@/components/projects/CliProjectCard'
import { PackageCard } from '@/components/projects/PackageCard'
import { cliProjects } from '@/data/cliProjects'
import { packages } from '@/data/packages'
import { readGitHubCache } from '@/lib/cache'
import { fetchAllGitHubData } from '@/lib/github'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Open Source',
  description:
    'Open source projects and contributions to the Roots WordPress ecosystem and beyond.',
})

const REVALIDATE = { next: { revalidate: 3600 } } as RequestInit

async function fetchRepoStars(fullName: string): Promise<number> {
  try {
    const h: HeadersInit = { Accept: 'application/vnd.github.v3+json' }
    const token = process.env.GITHUB_TOKEN
    if (token) h.Authorization = `Bearer ${token}`

    const res = await fetch(`https://api.github.com/repos/${fullName}`, {
      headers: h,
      ...REVALIDATE,
    })
    if (!res.ok) return 0
    const data = await res.json()
    return data.stargazers_count ?? 0
  } catch {
    return 0
  }
}

export default async function OpenSourcePage() {
  const [gitHubData, ...projectStars] = await Promise.all([
    readGitHubCache() ?? fetchAllGitHubData(),
    ...cliProjects.map((p) => fetchRepoStars(p.repo)),
    ...packages.map((p) => fetchRepoStars(p.repo)),
  ])

  const cliStars = projectStars.slice(0, cliProjects.length)
  const packageStars = projectStars.slice(cliProjects.length)

  const {
    profile,
    featured,
    repos,
    repoPool,
    contributions,
    contributionStats,
    languages,
    recentActivity,
  } = gitHubData

  return (
    <div className="space-y-2">
      <div className="pt-12 pb-6">
        <div className="mb-4 flex items-center gap-3">
          <p className="text-primary-600 dark:text-primary-400 text-sm font-medium tracking-widest uppercase">
            Open Source
          </p>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Projects &amp; Contributions
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Building tools and infrastructure in the open. {profile.public_repos} public repositories
          across personal and organization accounts.
        </p>
        <Link
          href={profile.html_url}
          className="hover:text-primary-600 dark:hover:text-primary-400 mt-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
        >
          <svg width="16" height="16" className="shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          @{profile.login}
        </Link>
      </div>

      <ProfileStats profile={profile} contributionStats={contributionStats} />
      <FeaturedProjects repos={featured} />

      {/* CLI Projects */}
      <section aria-label="CLI projects" className="pt-4 pb-2">
        <h2 className="mb-5 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          CLI Tools
        </h2>
        <div className="space-y-5">
          {cliProjects.map((project, i) => (
            <CliProjectCard key={project.name} project={project} stars={cliStars[i]} index={i} />
          ))}
        </div>
      </section>

      {/* Packages */}
      <section aria-label="npm packages" className="pt-4 pb-2">
        <h2 className="mb-5 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Packages
        </h2>
        <div className="space-y-5">
          {packages.map((pkg, i) => (
            <PackageCard key={pkg.name} package={pkg} stars={packageStars[i]} index={i} />
          ))}
        </div>
      </section>

      <ContributionGrid data={contributions} stats={contributionStats} />

      <div className="flex items-center gap-4 py-2" aria-hidden="true">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
        <span className="text-primary-300 dark:text-primary-700 font-mono text-xs select-none"></span>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
      </div>

      <div className="grid items-start gap-x-8 md:grid-cols-3">
        <CommitTimeline activity={recentActivity} />
        <RepositoryGrid repos={repos} pool={repoPool} className="md:col-span-2" />
      </div>
      <LanguageBreakdown languages={languages} />
    </div>
  )
}
