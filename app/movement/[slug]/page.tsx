import RideLayout from '@/layouts/RideLayout'
import siteMetadata from '@/data/siteMetadata'
import { getRecentRideSlugs, getRidePageData } from '@/lib/cycling'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = true

const PRERENDER_LIMIT = 30

const Page = async (props: { params: Promise<{ slug: string }> }) => {
  const params = await props.params
  const slug = decodeURIComponent(params.slug)
  const data = getRidePageData(slug)
  if (!data) return notFound()

  return (
    <RideLayout
      group={data.group}
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
  return getRecentRideSlugs(PRERENDER_LIMIT).map((slug) => ({ slug }))
}

const generateMetadata = async (props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> => {
  const params = await props.params
  const slug = decodeURIComponent(params.slug)
  const data = getRidePageData(slug)
  if (!data) return

  const noun = data.group === 'foot' ? 'activity' : 'ride'
  const title = `${data.ride.name} · ${data.ride.distance}`
  const description = `${data.ride.distance} ${noun} · ${data.ride.duration} · ${data.ride.elevation} elevation${data.ride.heartrate ? ` · ${data.ride.heartrate}` : ''}`

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
      url: `/movement/${slug}`,
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
