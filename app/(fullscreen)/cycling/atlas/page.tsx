import { Atlas } from '@/components/cycling/atlas/Atlas'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Cycling Atlas',
  description: 'Every recorded ride on one map. Scrub time, filter, explore.',
})

export default function CyclingAtlasPage() {
  return <Atlas />
}
