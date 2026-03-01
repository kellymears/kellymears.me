import siteMetadata from '@/data/siteMetadata'
import { getAllPosts } from '@/lib/content'
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const siteUrl = siteMetadata.siteUrl
  const allPosts = await getAllPosts()

  const blogRoutes = allPosts
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const routes = ['blog', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}

export default sitemap
