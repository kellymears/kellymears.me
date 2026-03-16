import { SiteCard } from '@/components/SiteCard'
import { subdomainSites } from '@/data/sites'
import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genPageMetadata({
  title: 'Sites',
  description:
    'Independent projects, documentation sites, and developer tools built and maintained by Kelly Mears.',
})

export default function SitesPage() {
  return (
    <div className="animate-page-enter">
      <header className="py-12">
        <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium tracking-widest uppercase">
          Sites
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Developer Tools &amp; Resources
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Independent projects, documentation sites, and tools I build and maintain.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2">
        {subdomainSites.map((site, index) => (
          <SiteCard
            key={site.slug}
            site={site}
            className="animate-on-scroll"
            style={{ animationDelay: `${index * 100}ms` }}
          />
        ))}
      </div>
    </div>
  )
}
