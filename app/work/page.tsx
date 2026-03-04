import { FeaturedSites } from '@/components/work/FeaturedSites'
import { MissionCallout } from '@/components/work/MissionCallout'
import { SkillsGrid } from '@/components/work/SkillsGrid'
import { StatsRow } from '@/components/work/StatsRow'
import { Timeline } from '@/components/work/Timeline'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

export const metadata: Metadata = genPageMetadata({
  title: 'Work',
  description:
    'Professional experience building web platforms, open source tools, and digital infrastructure for mission-driven organizations.',
})

export default function WorkPage() {
  return (
    <div className="animate-page-enter">
      <header className="py-12">
        <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium tracking-widest uppercase">
          Resume
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
          Experience &amp; Skills
        </h1>

        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          A decade+ building web platforms, open source tools, and digital infrastructure for
          organizations working to make a difference.
        </p>
      </header>

      <StatsRow />
      <Timeline />
      <MissionCallout />
      <FeaturedSites />
      <SkillsGrid />
    </div>
  )
}
