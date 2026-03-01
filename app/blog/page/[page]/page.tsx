import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, getAllPosts, getTagCounts, sortPosts } from '@/lib/content'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

const Page = async (props: { params: Promise<{ page: string }> }) => {
  const params = await props.params
  const allPosts = await getAllPosts()
  const posts = allCoreContent(sortPosts(allPosts))
  const tagCounts = getTagCounts(allPosts)
  const pageNumber = parseInt(`${params.page}`)
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
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

const generateStaticParams = async () => {
  const posts = await getAllPosts()
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  return Array.from({ length: totalPages }, (_, i) => ({ page: (i + 1).toString() }))
}

export default Page
export { generateStaticParams }
