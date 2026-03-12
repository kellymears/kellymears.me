import { Card } from '@/components/Card'
import { featuredSites } from '@/data/projects'
import Image from 'next/image'

export function FeaturedSites() {
  return (
    <section
      className="border-t border-gray-200 py-12 dark:border-gray-800"
      aria-label="Featured projects"
    >
      <h2 className="mb-8 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Featured Projects
      </h2>

      <div className="grid gap-6 sm:grid-cols-2">
        {featuredSites.map((site, index) => (
          <Card
            as="a"
            key={site.title}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="animate-on-scroll overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="relative aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-800">
              <Image
                src={site.image}
                alt={`Screenshot of ${site.title}`}
                fill
                className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="p-5">
              <div className="mb-1 flex items-baseline justify-between">
                <h3 className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-lg font-semibold text-gray-900 transition-colors dark:text-gray-100">
                  {site.title}
                  <span className="sr-only"> (opens in new tab)</span>
                </h3>
                <span className="text-xs text-gray-500 dark:text-gray-400">{site.context}</span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                {site.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {site.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  )
}
