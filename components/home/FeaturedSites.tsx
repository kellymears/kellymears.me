import { Card } from '@/components/Card'
import Link from '@/components/Link'
import { featuredSites } from '@/data/projects'
import Image from 'next/image'

export default function FeaturedSites() {
  return (
    <section aria-label="Featured projects" className="py-16">
      <div className="mb-10 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Featured Projects
        </h2>
        <Link
          href="/work"
          className="hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
        >
          View all <span aria-hidden="true">&rarr;</span>
          <span className="sr-only">projects</span>
        </Link>
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        {featuredSites.map((site) => (
          <Card
            as="a"
            key={site.title}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5 overflow-hidden hover:border-transparent hover:shadow-lg dark:hover:border-transparent"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={site.image}
                alt={`Screenshot of ${site.title}`}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div
                className="from-primary-900/10 dark:from-primary-400/10 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
            </div>
            <div className="p-4">
              <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-sm font-semibold text-gray-900 transition-colors dark:text-gray-100">
                {site.title}
                <span className="sr-only"> (opens in new tab)</span>
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{site.context}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
