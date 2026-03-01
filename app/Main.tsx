import Hero from '@/components/home/Hero'
import RecentWriting from '@/components/home/RecentWriting'
import SelectedWork from '@/components/home/SelectedWork'

export default function Home({ posts }) {
  return (
    <>
      <Hero />
      <SelectedWork />
      <RecentWriting posts={posts} />
    </>
  )
}
