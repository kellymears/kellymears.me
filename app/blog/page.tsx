import ListLayout from '@/layouts/ListLayoutWithTags'
import { genPageMetadata } from 'app/seo'
import { allCoreContent, getAllPosts, getTagCounts, sortPosts } from '@/lib/content'

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
      title="All Posts"
      tagCounts={tagCounts}
    />
  )
}

const metadata = genPageMetadata({ title: 'Blog' })

export default Page
export { metadata }
