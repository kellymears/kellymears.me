import { allCoreContent, getAllPosts, sortPosts } from '@/lib/content'
import Main from './Main'

const Page = async () => {
  const posts = await getAllPosts()
  return <Main posts={allCoreContent(sortPosts(posts))} />
}

export default Page
