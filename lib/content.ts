import siteMetadata from '@/data/siteMetadata'
import fs from 'fs'
import { slug } from 'github-slugger'
import matter from 'gray-matter'
import path from 'path'
import readingTime from 'reading-time'
import { extractTocHeadings, type TocHeading } from './remark-toc-headings'

const root = process.cwd()
const dataDir = path.join(root, 'data')

interface BlogPost {
  title: string
  date: string
  tags: string[]
  lastmod?: string
  draft?: boolean
  summary?: string
  images?: string[]
  authors?: string[]
  layout?: string
  bibliography?: string
  canonicalUrl?: string
  readingTime: ReturnType<typeof readingTime>
  slug: string
  path: string
  filePath: string
  toc: TocHeading[]
  structuredData: Record<string, unknown>
  body: string
}

interface Author {
  name: string
  avatar?: string
  occupation?: string
  company?: string
  companyUrl?: string
  email?: string
  twitter?: string
  bluesky?: string
  linkedin?: string
  github?: string
  layout?: string
  slug: string
  path: string
  filePath: string
  body: string
}

type CoreContent<T> = Omit<T, 'body'>

let postsCache: BlogPost[] | null = null
let authorsCache: Author[] | null = null

const getAllPosts = async (): Promise<BlogPost[]> => {
  if (postsCache) return postsCache

  const blogDir = path.join(dataDir, 'blog')
  if (!fs.existsSync(blogDir)) return []

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith('.mdx'))
  const posts: BlogPost[] = []

  for (const file of files) {
    const filePath = path.join(blogDir, file)
    const source = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(source)
    const postSlug = file.replace(/\.mdx$/, '')
    const toc = await extractTocHeadings(content)

    posts.push({
      title: frontmatter.title,
      date: frontmatter.date,
      tags: frontmatter.tags ?? [],
      lastmod: frontmatter.lastmod,
      draft: frontmatter.draft,
      summary: frontmatter.summary,
      images: frontmatter.images,
      authors: frontmatter.authors,
      layout: frontmatter.layout,
      bibliography: frontmatter.bibliography,
      canonicalUrl: frontmatter.canonicalUrl,
      readingTime: readingTime(content),
      slug: postSlug,
      path: `blog/${postSlug}`,
      filePath: `blog/${file}`,
      toc,
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: frontmatter.title,
        datePublished: frontmatter.date,
        dateModified: frontmatter.lastmod || frontmatter.date,
        description: frontmatter.summary,
        image: frontmatter.images ? frontmatter.images[0] : siteMetadata.socialBanner,
        url: `${siteMetadata.siteUrl}/blog/${postSlug}`,
      },
      body: content,
    })
  }

  postsCache = posts
  return posts
}

const getPostBySlug = async (slug: string): Promise<BlogPost | undefined> => {
  const posts = await getAllPosts()
  return posts.find((p) => p.slug === slug)
}

const getAllAuthors = async (): Promise<Author[]> => {
  if (authorsCache) return authorsCache

  const authorsDir = path.join(dataDir, 'authors')
  if (!fs.existsSync(authorsDir)) return []

  const files = fs.readdirSync(authorsDir).filter((f) => f.endsWith('.mdx'))
  const authors: Author[] = files.map((file) => {
    const filePath = path.join(authorsDir, file)
    const source = fs.readFileSync(filePath, 'utf-8')
    const { data: frontmatter, content } = matter(source)
    const authorSlug = file.replace(/\.mdx$/, '')

    return {
      name: frontmatter.name,
      avatar: frontmatter.avatar,
      occupation: frontmatter.occupation,
      company: frontmatter.company,
      companyUrl: frontmatter.companyUrl,
      email: frontmatter.email,
      twitter: frontmatter.twitter,
      bluesky: frontmatter.bluesky,
      linkedin: frontmatter.linkedin,
      github: frontmatter.github,
      layout: frontmatter.layout,
      slug: authorSlug,
      path: `authors/${authorSlug}`,
      filePath: `authors/${file}`,
      body: content,
    }
  })

  authorsCache = authors
  return authors
}

const getAuthorBySlug = async (slug: string): Promise<Author | undefined> => {
  const authors = await getAllAuthors()
  return authors.find((a) => a.slug === slug)
}

const sortPosts = <T extends { date: string }>(posts: T[]): T[] =>
  [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

const getPublishedPosts = <T extends { draft?: boolean }>(posts: T[]): T[] =>
  posts.filter((p) => p.draft !== true)

const coreContent = <T extends { body: string }>(content: T): CoreContent<T> => {
  const { body: _, ...rest } = content
  return rest
}

const allCoreContent = <T extends { body: string; draft?: boolean }>(
  posts: T[]
): CoreContent<T>[] => {
  const isProduction = process.env.NODE_ENV === 'production'
  return posts.filter((p) => !isProduction || p.draft !== true).map((p) => coreContent(p))
}

const getTagCounts = (posts: BlogPost[]): Record<string, number> => {
  const isProduction = process.env.NODE_ENV === 'production'
  const tagCount: Record<string, number> = {}

  for (const post of posts) {
    if (post.tags && (!isProduction || post.draft !== true)) {
      for (const tag of post.tags) {
        const formattedTag = slug(tag)
        tagCount[formattedTag] = (tagCount[formattedTag] ?? 0) + 1
      }
    }
  }

  return tagCount
}

export {
  allCoreContent,
  coreContent,
  getAllAuthors,
  getAllPosts,
  getAuthorBySlug,
  getPostBySlug,
  getPublishedPosts,
  getTagCounts,
  sortPosts,
}
export type { Author, BlogPost, CoreContent, TocHeading }
