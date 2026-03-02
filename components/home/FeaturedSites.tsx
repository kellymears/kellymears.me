import Image from 'next/image'
import Link from '@/components/Link'
import { featuredSites } from '@/data/projects'

export default function FeaturedSites() {
  return (
    <section className="border-t border-gray-200 py-16 dark:border-gray-800">
      <div className="mb-10 flex items-baseline justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          Featured Projects
        </h2>
        <Link
          href="/work"
          className="hover:text-primary-600 dark:hover:text-primary-400 text-sm font-medium text-gray-500 transition-colors dark:text-gray-400"
        >
          View all &rarr;
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {featuredSites.map((site) => (
          <a
            key={site.title}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group hover:border-primary-300 dark:hover:border-primary-700 overflow-hidden rounded-xl border border-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800"
          >
            <div className="relative aspect-[3/2] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={site.image}
                alt={`Screenshot of ${site.title}`}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="p-4">
              <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-sm font-semibold text-gray-900 dark:text-gray-100">
                {site.title}
              </h3>
              <span className="text-xs text-gray-400 dark:text-gray-500">{site.context}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
