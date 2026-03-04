import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, getAllPosts, getTagCounts, sortPosts } from '@/lib/content'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

const Page = async () => {
  const allPosts = await getAllPosts()
  const posts = allCoreContent(sortPosts(allPosts))
  const tagCounts = getTagCounts(allPosts)
  const pageNumber = 1
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE * pageNumber)
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title="Posts & Notes"
      tagCounts={tagCounts}
    />
  )
}

const metadata: Metadata = genPageMetadata({
  title: 'Writing',
  description: 'Thoughts on engineering, open source, and building for the web.',
})

export default Page
export { metadata }
