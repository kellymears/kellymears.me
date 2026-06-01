import { Atlas } from '@/components/cycling/atlas/Atlas'
import { GROUP_COPY, type ActivityGroup } from '@/lib/cycling-constants'
import { genPageMetadata } from 'app/seo'
import type { Metadata } from 'next'

type SearchParams = Promise<{ type?: string | string[] }>

function resolveGroup(type?: string | string[]): ActivityGroup {
  const param = Array.isArray(type) ? type[0] : type
  return param === 'foot' ? 'foot' : 'cycling'
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams
}): Promise<Metadata> {
  const { type } = await searchParams
  const copy = GROUP_COPY[resolveGroup(type)]
  return genPageMetadata({
    title: `${copy.eyebrow} Atlas`,
    description: `Every recorded ${copy.noun.toLowerCase()} on one map. Scrub time, filter, explore.`,
  })
}

export default async function MovementAtlasPage({ searchParams }: { searchParams: SearchParams }) {
  const { type } = await searchParams
  return <Atlas group={resolveGroup(type)} />
}
