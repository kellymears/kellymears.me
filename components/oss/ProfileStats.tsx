import type { ContributionStats, GitHubProfile } from '@/lib/github'

interface ProfileStatsProps {
  profile: GitHubProfile
  contributionStats: ContributionStats
}

export function ProfileStats({ profile, contributionStats }: ProfileStatsProps) {
  const memberSince = new Date(profile.created_at).getFullYear()

  const items = [
    { value: profile.public_repos.toString(), label: 'Public Repos' },
    { value: contributionStats.totalContributions.toLocaleString(), label: 'Contributions / Year' },
    { value: profile.followers.toString(), label: 'Followers' },
    { value: memberSince.toString(), label: 'Member Since' },
  ]

  return (
    <section className="animate-on-scroll pb-4" aria-label="GitHub statistics overview">
      <dl className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {items.map((item, i) => (
          <div
            key={item.label}
            className="group hover:border-primary-200 hover:bg-primary-50/30 dark:hover:border-primary-800 dark:hover:bg-primary-950/30 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-5 text-center transition-all dark:border-gray-800 dark:bg-gray-900/50"
            style={{ animationDelay: `${i * 75}ms` }}
          >
            <dd className="from-primary-500 to-primary-700 dark:from-primary-400 dark:to-primary-600 bg-gradient-to-br bg-clip-text text-3xl font-bold tracking-tight text-transparent transition-transform duration-200 group-hover:scale-110 sm:text-4xl">
              {item.value}
            </dd>
            <dt className="mt-1 text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.label}
            </dt>
          </div>
        ))}
      </dl>
    </section>
  )
}
