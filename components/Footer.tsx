import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import { subdomainSites } from '@/data/sites'
import NavLinks from './NavLinks'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-gray-200 pt-10 pb-8 dark:border-gray-800">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <span className="text-lg leading-12 font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Kelly Mears
          </span>
          <div className="sm:-ml-2.5">
            <NavLinks alwaysVisible />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
            <span className="text-sm font-semibold tracking-wider text-gray-400 uppercase dark:text-gray-500">
              Tools
            </span>
            {subdomainSites.map((site) => (
              <Link
                key={site.slug}
                href={site.url}
                className="hover:text-primary-600 dark:hover:text-primary-400 text-sm text-gray-500 transition-colors dark:text-gray-400"
              >
                {site.title}
                <span className="ml-0.5 text-gray-400 dark:text-gray-600" aria-hidden="true">
                  ↗
                </span>
              </Link>
            ))}
            <Link
              href="/sites"
              className="hover:text-primary-600 dark:hover:text-primary-400 text-sm text-gray-500 transition-colors dark:text-gray-400"
            >
              All tools →
            </Link>
          </div>
        </div>

        <div className="flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
          <SocialIcon kind="github" href={siteMetadata.github} size={5} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
        </div>
      </div>
    </footer>
  )
}
