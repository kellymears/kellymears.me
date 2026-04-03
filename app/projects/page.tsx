import { SiteCard } from '@/components/SiteCard'
import { CliProjectCard } from '@/components/projects/CliProjectCard'
import { cliProjects } from '@/data/cliProjects'
import { subdomainSites } from '@/data/sites'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Projects',
  description:
    'CLI tools and developer projects — tarot readings in your terminal, a personal site TUI, and more.',
})

const REVALIDATE = { next: { revalidate: 3600 } } as RequestInit

async function fetchRepoStars(fullName: string): Promise<number> {
  try {
    const headers: HeadersInit = { Accept: 'application/vnd.github.v3+json' }
    const token = process.env.GITHUB_TOKEN
    if (token) headers.Authorization = `Bearer ${token}`

    const res = await fetch(`https://api.github.com/repos/${fullName}`, {
      headers,
      ...REVALIDATE,
    })
    if (!res.ok) return 0
    const data = await res.json()
    return data.stargazers_count ?? 0
  } catch {
    return 0
  }
}

export default async function ProjectsPage() {
  const stars = await Promise.all(cliProjects.map((p) => fetchRepoStars(p.repo)))

  return (
    <div className="animate-page-enter">
      <header className="pt-12 pb-6">
        <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium tracking-widest uppercase">
          Projects
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          CLI Tools &amp; Projects
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Terminal-native tools built with Ink and React — from tarot readings to an interactive
          personal site TUI.
        </p>
      </header>

      <div className="space-y-6">
        {cliProjects.map((project, i) => (
          <CliProjectCard key={project.name} project={project} stars={stars[i]} index={i} />
        ))}
      </div>

      <div className="flex items-center gap-3 py-10" aria-hidden="true">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent dark:via-gray-800" />
      </div>

      <section aria-label="Sites">
        <h2 className="mb-6 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Sites
        </h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {subdomainSites.map((site, i) => (
            <SiteCard
              key={site.slug}
              site={site}
              className="animate-on-scroll"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
