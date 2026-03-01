import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allCoreContent, getAllPosts, getTagCounts, sortPosts } from '@/lib/content'
import { genPageMetadata } from 'app/seo'
import { slug } from 'github-slugger'
import { Metadata } from 'next'

const POSTS_PER_PAGE = 5

const Page = async (props: { params: Promise<{ tag: string }> }) => {
  const params = await props.params
  const tag = decodeURI(params.tag)
  const title = tag[0]!.toUpperCase() + tag.split(' ').join('-').slice(1)
  const allPosts = await getAllPosts()
  const tagCounts = getTagCounts(allPosts)
  const filteredPosts = allCoreContent(
    sortPosts(allPosts.filter((post) => post.tags && post.tags.map((t) => slug(t)).includes(tag)))
  )
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  const initialDisplayPosts = filteredPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
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

const generateMetadata = async (props: { params: Promise<{ tag: string }> }): Promise<Metadata> => {
  const params = await props.params
  const tag = decodeURI(params.tag)
  return genPageMetadata({
    title: tag,
    description: `${siteMetadata.title} ${tag} tagged content`,
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag}/feed.xml`,
      },
    },
  })
}

const generateStaticParams = async () => {
  const posts = await getAllPosts()
  const tagCounts = getTagCounts(posts)
  const tagKeys = Object.keys(tagCounts)
  return tagKeys.map((tag) => ({ tag: encodeURI(tag) }))
}

export default Page
export { generateMetadata, generateStaticParams }
