import { Accent } from '@/components/home/SectionHeading'
import { TerminalCta } from '@/components/home/TerminalCta'
import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export interface HeroVitals {
  notes: number
  links: number
  ytdMiles: number
  latestPost?: { title: string; slug: string }
}

const fmt = new Intl.NumberFormat('en-US')

function stagger(step: number) {
  return { animationDelay: `${120 + step * 90}ms` }
}

export default function Hero({ vitals }: { vitals: HeroVitals }) {
  const year = new Date().getFullYear()

  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[78vh] flex-col justify-center pt-10 pb-12 md:pt-16"
    >
      <h1 className="text-gray-900 dark:text-gray-100">
        <span
          className="animate-fade-slide-up mb-8 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-gray-500 uppercase dark:text-gray-400"
          style={stagger(0)}
        >
          <span className="text-gray-900 dark:text-gray-100">Kelly Mears</span>
          <span aria-hidden="true" className="bg-primary-500 h-px w-8" />
          <span>Software Engineer</span>
        </span>
        <span
          className="animate-fade-slide-up block max-w-[14ch] text-[clamp(2.75rem,8.5vw,6.75rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-balance"
          style={stagger(1)}
        >
          Making the web work for people working to <Accent>change&nbsp;it.</Accent>
        </span>
      </h1>

      <div className="mt-10 grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="animate-fade-slide-up" style={stagger(2)}>
          <p className="max-w-xl text-lg leading-relaxed font-light text-gray-600 sm:text-xl dark:text-gray-400">
            15+ years building infrastructure for mission-driven organizations. Open source
            maintainer, nonprofit technologist, and full-stack engineer.
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
        <div className="animate-fade-slide-up w-full lg:w-80" style={stagger(3)}>
          <TerminalCta />
        </div>
      </div>

      {/* Status bar — every figure here is read from the repo at build time. */}
      <ul
        aria-label="Vitals"
        className="animate-fade-in mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-gray-200 bg-gray-200 font-mono text-xs sm:grid-cols-4 dark:border-gray-800 dark:bg-gray-800"
        style={stagger(5)}
      >
        <Vital label="Notes in the wiki" href="/knowledge">
          {fmt.format(vitals.notes)}
          <span className="text-gray-400 dark:text-gray-500">
            {' '}
            / {fmt.format(vitals.links)} links
          </span>
        </Vital>
        <Vital label={`Miles ridden in ${year}`} href="/movement">
          {fmt.format(vitals.ytdMiles)}
          <span className="text-gray-400 dark:text-gray-500"> mi</span>
        </Vital>
        <Vital label="Currently" href="/work">
          Senior Engineer
          <span className="text-gray-400 dark:text-gray-500"> @ Carrot</span>
        </Vital>
        {vitals.latestPost && (
          <Vital label="Latest writing" href={`/blog/${vitals.latestPost.slug}`}>
            <span className="line-clamp-1">{vitals.latestPost.title}</span>
          </Vital>
        )}
      </ul>
    </section>
  )
}

function Vital({
  label,
  href,
  children,
}: {
  label: string
  href: string
  children: React.ReactNode
}) {
  return (
    <li className="flex">
      <Link
        href={href}
        className="group/vital bg-paper flex w-full flex-col gap-1.5 px-4 py-3.5 transition-colors hover:bg-white dark:bg-gray-950 dark:hover:bg-gray-900"
      >
        <span className="flex items-center gap-2 tracking-wider text-gray-500 uppercase dark:text-gray-400">
          <span
            aria-hidden="true"
            className="bg-primary-500 group-hover/vital:animate-timeline-pulse h-1.5 w-1.5 rounded-full"
          />
          {label}
        </span>
        <span className="text-sm text-gray-900 dark:text-gray-100">{children}</span>
      </Link>
    </li>
  )
}
