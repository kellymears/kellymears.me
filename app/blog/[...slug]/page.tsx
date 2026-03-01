import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import siteMetadata from '@/data/siteMetadata'
import PostLayout from '@/layouts/PostLayout'
import { allCoreContent, coreContent, getAllAuthors, getAllPosts, sortPosts } from '@/lib/content'
import { MDXContent } from '@/lib/mdx'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

const Page = async (props: { params: Promise<{ slug: string[] }> }) => {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const allPosts = await getAllPosts()
  const allAuthorsList = await getAllAuthors()
  const sortedCoreContents = allCoreContent(sortPosts(allPosts))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allPosts.find((p) => p.slug === slug)!
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthorsList.find((p) => p.slug === author)
    return coreContent(authorResults!)
  })
  const mainContent = coreContent(post)
  const jsonLd = post.structuredData
  jsonLd['author'] = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
    }
  })

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PostLayout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXContent source={post.body} components={components} />
      </PostLayout>
    </>
  )
}

const generateStaticParams = async () => {
  const posts = await getAllPosts()
  return posts.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

const generateMetadata = async (props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> => {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const posts = await getAllPosts()
  const post = posts.find((p) => p.slug === slug)
  if (!post) {
    return
  }

  const authors = await getAllAuthors()
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = authors.find((p) => p.slug === author)
    return coreContent(authorResults!)
  })

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authorNames = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img && img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: './',
      images: ogImages,
      authors: authorNames.length > 0 ? authorNames : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export default Page
export { generateMetadata, generateStaticParams }
