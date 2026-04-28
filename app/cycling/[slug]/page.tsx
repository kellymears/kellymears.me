import RideLayout from '@/layouts/RideLayout'
import siteMetadata from '@/data/siteMetadata'
import { getAllRideSlugs, getRidePageData } from '@/lib/cycling'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = false

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  const slug = decodeURIComponent(params.slug)
  const data = getRidePageData(slug)
  if (!data) return notFound()

  return (
    <RideLayout
      ride={data.ride}
      raw={data.raw}
      prev={data.prev}
      next={data.next}
      related={data.related}
      recent={data.recent}
      benchmarks={data.benchmarks}
      history={data.history}
    />
  )
}

const generateStaticParams = async () => {
  return getAllRideSlugs().map((slug) => ({ slug }))
}

const generateMetadata = async (props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> => {
  const params = await props.params
  const slug = decodeURIComponent(params.slug)
  const data = getRidePageData(slug)
  if (!data) return

  const title = `${data.ride.name} · ${data.ride.distance}`
  const description = `${data.ride.distance} ride · ${data.ride.duration} · ${data.ride.elevation} elevation${data.ride.heartrate ? ` · ${data.ride.heartrate}` : ''}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: data.raw.startTime,
      url: `/cycling/${slug}`,
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}

export default Page
export { generateMetadata, generateStaticParams }
