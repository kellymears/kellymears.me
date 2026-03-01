import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function Hero() {
  return (
    <section className="flex min-h-[65vh] flex-col justify-center py-12 md:py-20">
      <div className="animate-fade-slide-up">
        <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium tracking-widest uppercase">
          Software Engineer
        </p>
        <h1 className="text-4xl leading-tight font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl dark:text-gray-100">
          Kelly Mears
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed font-light text-gray-600 sm:text-xl dark:text-gray-400">
          Building infrastructure for mission-driven organizations. Primary author of{' '}
          <a
            href="https://bud.js.org"
            className="decoration-primary-500 hover:text-primary-600 dark:hover:text-primary-400 text-gray-900 underline decoration-2 underline-offset-3 transition-colors dark:text-gray-100"
          >
            bud.js
          </a>
          . A decade of open source, nonprofit tech, and making the web work for people who are
          working to change it.
        </p>
        <div className="mt-8 flex items-center gap-5">
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
        </div>
      </div>
    </section>
  )
}
