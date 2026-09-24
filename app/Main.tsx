import Constellation from '@/components/home/Constellation'
import FeaturedSites from '@/components/home/FeaturedSites'
import Hero, { type HeroVitals } from '@/components/home/Hero'
import Movement from '@/components/home/Movement'
import RecentWriting from '@/components/home/RecentWriting'
import SelectedWork from '@/components/home/SelectedWork'
import SymbiokuBanner from '@/components/home/SymbiokuBanner'
import { WaveBackground } from '@/components/WaveBackground'
import type { BlogPost, CoreContent } from '@/lib/content'
import type { ComponentProps } from 'react'

interface Props {
  posts: CoreContent<BlogPost>[]
  vitals: HeroVitals
  knowledge: ComponentProps<typeof Constellation>
  movement: ComponentProps<typeof Movement>
}

export default function Home({ posts, vitals, knowledge, movement }: Props) {
  return (
    <>
      <div className="relative">
        <WaveBackground />
        <Hero vitals={vitals} />
      </div>
      <SelectedWork />
      <Constellation {...knowledge} />
      <Movement {...movement} />
      <SymbiokuBanner />
      <FeaturedSites />
      <RecentWriting posts={posts} />
    </>
  )
}
