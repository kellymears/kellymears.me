import siteMetadata from '@/data/siteMetadata'
import { getAllPosts } from '@/lib/content'
import { getAllNotes, getTopics } from '@/lib/knowledge'
import { getSourceDate, newestDate, today } from '@/lib/source-dates'
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

  const routes = ['projects', 'blog', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: today(),
  }))

  const notes = getAllNotes()
  const noteDates = new Map(notes.map((note) => [note.slug, getSourceDate(note.filePath)]))

  const knowledgeRoute = {
    url: `${siteUrl}/knowledge`,
    lastModified: newestDate([...noteDates.values()]),
  }

  // A topic is as fresh as its most recently edited note.
  const topicRoutes = getTopics().map((topic) => ({
    url: `${siteUrl}${topic.path}`,
    lastModified: newestDate(
      notes.filter((note) => note.topic === topic.slug).map((note) => noteDates.get(note.slug)!)
    ),
  }))

  // Notes sit below the top-level pages; the rest of this file leaves priority
  // unset, so it defaults to 0.5 and these rank under it.
  const noteRoutes = notes.map((note) => ({
    url: `${siteUrl}${note.path}`,
    lastModified: noteDates.get(note.slug)!,
    priority: 0.4,
  }))

  return [...routes, knowledgeRoute, ...topicRoutes, ...blogRoutes, ...noteRoutes]
}

export default sitemap
