import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, getAllPosts, getTagCounts, sortPosts } from '@/lib/content'
import { slug } from 'github-slugger'
import { notFound } from 'next/navigation'

const POSTS_PER_PAGE = 5

const Page = async (props: { params: Promise<{ tag: string; page: string }> }) => {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = tag[0]!.toUpperCase() + tag.split(' ').join('-').slice(1)
  const pageNumber = parseInt(params.page)
  const allPosts = await getAllPosts()
  const tagCounts = getTagCounts(allPosts)
  const filteredPosts = allCoreContent(
    sortPosts(allPosts.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  if (pageNumber <= 0 || pageNumber > totalPages || isNaN(pageNumber)) {
    return notFound()
  }

  const initialDisplayPosts = filteredPosts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: totalPages,
  }

  return (
    <ListLayout
      posts={filteredPosts}
      initialDisplayPosts={initialDisplayPosts}
      pagination={pagination}
      title={title}
      tagCounts={tagCounts}
    />
  )
}

const generateStaticParams = async () => {
  const posts = await getAllPosts()
  const tagCounts = getTagCounts(posts)
  return Object.keys(tagCounts).flatMap((tag) => {
    const postCount = tagCounts[tag]!
    const totalPages = Math.max(1, Math.ceil(postCount / POSTS_PER_PAGE))
    return Array.from({ length: totalPages }, (_, i) => ({
      tag: encodeURI(tag),
      page: (i + 1).toString(),
    }))
  })
}

export default Page
export { generateStaticParams }
