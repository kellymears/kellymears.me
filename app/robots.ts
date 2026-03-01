import siteMetadata from '@/data/siteMetadata'
import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: '*', allow: '/' },
  sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  host: siteMetadata.siteUrl,
})

export default robots
