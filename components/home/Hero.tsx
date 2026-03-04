import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[65vh] flex-col justify-center py-12 md:py-20"
    >
      <div>
        <p className="text-primary-600 dark:text-primary-400 mb-4 flex items-center gap-2 text-sm font-medium tracking-widest uppercase">
          <span
            className="bg-primary-500 dark:bg-primary-400 inline-block h-1.5 w-1.5 rounded-full"
            aria-hidden="true"
          />
          Software Engineer
        </p>
        <h1 className="text-4xl leading-tight font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-gray-100">
          Kelly Mears
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed font-light text-gray-600 sm:text-xl dark:text-gray-400">
          15+ years building infrastructure for mission-driven organizations. Open source
          maintainer, nonprofit technologist, and full-stack engineer making the web work for people
          who are working to change it.
        </p>
        <nav aria-label="Primary actions" className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            href="/work"
            className="bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 rounded-full px-5 py-2 text-sm font-medium text-white shadow-sm transition-all hover:shadow-md"
          >
            Work &amp; Experience
          </Link>
          <Link
            href="/open-source"
            className="hover:border-primary-400 hover:text-primary-600 dark:hover:border-primary-500 dark:hover:text-primary-400 rounded-full border border-gray-300 px-5 py-2 text-sm font-medium text-gray-700 transition-colors dark:border-gray-600 dark:text-gray-300"
          >
            Open Source
          </Link>
          <div className="flex items-center gap-4 pl-2" role="list" aria-label="Social links">
            <SocialIcon kind="github" href={siteMetadata.github} size={6} />
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          </div>
        </nav>
      </div>
    </section>
  )
}
