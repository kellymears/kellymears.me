import Backlinks from '@/components/knowledge/Backlinks'
import { KnowledgeGraph } from '@/components/knowledge/KnowledgeGraph'
import LinkGroup from '@/components/knowledge/LinkGroup'
import NoteFooterNav from '@/components/knowledge/NoteFooterNav'
import NoteHeader from '@/components/knowledge/NoteHeader'
import NoteProse from '@/components/knowledge/NoteProse'
import { Wander } from '@/components/knowledge/Wander'
import Link from '@/components/Link'
import siteMetadata from '@/data/siteMetadata'
import { getAllNotes, getLocalGraph, getNote, getNotesByTopic } from '@/lib/knowledge'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = false

interface RouteParams {
  topic: string
  subject: string
}

const generateStaticParams = (): RouteParams[] =>
  getAllNotes().map((note) => ({ topic: note.topic, subject: note.slug }))

const generateMetadata = async (props: {
  params: Promise<RouteParams>
}): Promise<Metadata | undefined> => {
  const { topic, subject } = await props.params
  const note = getNote(topic, subject)
  if (!note) return

  const url = `${siteMetadata.siteUrl}${note.path}`
  const description = note.summary || `${note.title} — a note from the ${note.topicName} wiki.`

  return {
    title: note.title,
    description,
    keywords: [...note.aliases, ...note.tags, note.topicName, 'wiki', 'notes'],
    alternates: { canonical: url },
    openGraph: {
      title: `${note.title} | Knowledge`,
      description,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url,
      images: [
        { url: siteMetadata.socialBanner, width: 1200, height: 630, alt: siteMetadata.title },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${note.title} | Knowledge`,
      description,
      images: [siteMetadata.socialBanner],
    },
  }
}

const Page = async (props: { params: Promise<RouteParams> }) => {
  const { topic, subject } = await props.params
  const note = getNote(topic, subject)
  if (!note) notFound()

  const siblings = getNotesByTopic(note.topic)
  const index = siblings.findIndex((sibling) => sibling.slug === note.slug)
  const prev = index > 0 ? siblings[index - 1] : undefined
  const next = index >= 0 && index < siblings.length - 1 ? siblings[index + 1] : undefined

  // Depth 1, not the default 2: two hops is ~71 nodes for a well-connected note,
  // which is a hairball in a 17rem rail. One hop is exactly the neighborhood the
  // rest of the page already names — See also, Related, Linked from.
  const localGraph = getLocalGraph(note.slug, 1)
  const url = `${siteMetadata.siteUrl}${note.path}`

  // A concept note is a definition, not an article — DefinedTerm says so, and
  // the topic folder is the honest DefinedTermSet it belongs to.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    '@id': url,
    name: note.title,
    url,
    description: note.summary,
    ...(note.aliases.length > 0 ? { alternateName: note.aliases } : {}),
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: note.topicName,
      url: `${siteMetadata.siteUrl}/knowledge/${note.topic}`,
    },
    inLanguage: 'en-US',
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="animate-page-enter">
        <NoteHeader
          note={note}
          action={<Wander paths={getAllNotes().map((n) => n.path)} label="View random note" />}
        />

        {/*
          Rail is 22rem so the graph clears the ~320px it needs to place labels
          (22rem less 2px border less px-3 = 326px). `minmax(0,1fr)` means the
          prose column absorbs any extra width the surrounding container is ever
          given, without another change here.
        */}
        <div className="border-t border-gray-200 xl:grid xl:grid-cols-[minmax(0,1fr)_22rem] xl:gap-8 dark:border-gray-800">
          <div className="min-w-0">
            <NoteProse body={note.body} className="pt-10 pb-4" />

            <LinkGroup
              title="See also"
              slugs={note.seeAlso}
              variant="cards"
              className="border-t border-gray-200 dark:border-gray-800"
            />

            <LinkGroup
              title="Related"
              hint="Nearby in the graph rather than deliberately chosen. Looser, sometimes surprising."
              slugs={note.related}
              variant="chips"
              className="border-t border-gray-200 dark:border-gray-800"
            />

            <Backlinks
              slugs={note.backlinks}
              className="animate-on-scroll border-t border-gray-200 dark:border-gray-800"
            />
          </div>

          <aside
            aria-label="Local graph"
            // `pb-10` matches `pt-10`: without it the card comes to rest flush
            // against the bottom of its containing block when the prose runs out.
            className="content-defer mt-8 xl:sticky xl:top-24 xl:mt-0 xl:self-start xl:pt-10 xl:pb-10"
          >
            <div className="rounded-xl border border-gray-200 px-3 py-4 dark:border-gray-800">
              <h2 className="text-xs font-medium text-gray-500 uppercase dark:text-gray-400">
                Local graph
              </h2>
              <div className="mt-3">
                <KnowledgeGraph
                  graph={localGraph}
                  variant="local"
                  activeId={note.slug}
                  height={300}
                />
              </div>
              <p className="mt-3 text-xs leading-relaxed text-gray-500 dark:text-gray-400">
                {note.title} and everything it links to or from — {localGraph.nodes.length} notes,{' '}
                {localGraph.edges.length} links.
              </p>
              <Link
                href={`/knowledge/${note.topic}`}
                className="hover:text-primary-600 dark:hover:text-primary-400 mt-3 inline-block text-xs font-medium text-gray-500 transition-colors dark:text-gray-400"
              >
                Browse {note.topicName} <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </aside>
        </div>

        <NoteFooterNav prev={prev} next={next} topicSlug={note.topic} topicName={note.topicName} />
      </article>
    </>
  )
}

export default Page
export { generateMetadata, generateStaticParams }
