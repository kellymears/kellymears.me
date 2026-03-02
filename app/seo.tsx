import siteMetadata from '@/data/siteMetadata'
import { Metadata } from 'next'

interface PageSEOProps extends Record<string, unknown> {
  title: string
  description?: string
  image?: string
}

const genPageMetadata = ({ title, description, image, ...rest }: PageSEOProps): Metadata => {
  return {
    title,
    description: description || siteMetadata.description,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || siteMetadata.description,
      url: './',
      siteName: siteMetadata.title,
      images: image
        ? [image]
        : [{ url: siteMetadata.socialBanner, width: 1200, height: 630, alt: siteMetadata.title }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image
        ? [image]
        : [{ url: siteMetadata.socialBanner, width: 1200, height: 630, alt: siteMetadata.title }],
    },
    ...rest,
  }
}

export { genPageMetadata }
