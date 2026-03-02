import FeaturedSites from '@/components/home/FeaturedSites'
import Hero from '@/components/home/Hero'
import RecentWriting from '@/components/home/RecentWriting'
import SelectedWork from '@/components/home/SelectedWork'
import { WaveBackground } from '@/components/WaveBackground'
import type { BlogPost, CoreContent } from '@/lib/content'

interface Props {
  posts: CoreContent<BlogPost>[]
}

export default function Home({ posts }: Props) {
  return (
    <>
      <div className="relative">
        <WaveBackground />
        <Hero />
      </div>
      <SelectedWork />
      <FeaturedSites />
      <RecentWriting posts={posts} />
    </>
  )
}
