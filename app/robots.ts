import siteMetadata from '@/data/siteMetadata'
import { MetadataRoute } from 'next'

const robots = (): MetadataRoute.Robots => ({
  rules: { userAgent: '*', allow: '/' },
  sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
  host: siteMetadata.siteUrl,
})

const dynamic = 'force-static'

export { dynamic }
export default robots
