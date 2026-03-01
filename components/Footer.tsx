import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="mt-16 pt-10 pb-8">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <span className="text-lg font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Kelly Mears
          </span>
          <nav className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
            <Link
              href="/work"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Work
            </Link>
            <Link
              href="/open-source"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Open Source
            </Link>
            <Link
              href="/blog"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              Writing
            </Link>
            <Link
              href="/about"
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              About
            </Link>
          </nav>
        </div>

        <div className="flex flex-col items-center gap-4 sm:items-end">
          <div className="flex space-x-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
            <SocialIcon kind="github" href={siteMetadata.github} size={5} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
          </div>
        </div>
      </div>
    </footer>
  )
}
