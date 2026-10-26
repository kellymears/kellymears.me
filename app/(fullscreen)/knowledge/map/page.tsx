import { KnowledgeMap } from '@/components/knowledge/map/KnowledgeMap'
import { packGraph } from '@/components/knowledge/packed-graph'
import { getGraph, getTopics } from '@/lib/knowledge'
import { genPageMetadata } from 'app/seo'

export const dynamic = 'force-static'

export const metadata = genPageMetadata({
  title: 'Knowledge map',
  description: 'Every note in the wiki as one live field. Drag, filter, explore.',
})

// `?focus=` and `?topic=` are read on the client, so this stays one static page.
export default function KnowledgeMapPage() {
  return (
    <KnowledgeMap
      graph={packGraph(getGraph())}
      topics={getTopics().map(({ slug, name }) => ({ slug, name }))}
    />
  )
}
