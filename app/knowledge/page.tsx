import { Card } from '@/components/Card'
import Link from '@/components/Link'
import { KnowledgeGraph } from '@/components/knowledge/KnowledgeGraph'
import { topicVars } from '@/components/knowledge/NoteCard'
import { StatLine } from '@/components/knowledge/StatLine'
import { TopicCard } from '@/components/knowledge/TopicCard'
import siteMetadata from '@/data/siteMetadata'
import {
  getGraph,
  getHubs,
  getKnowledgeStats,
  getNoteBySlug,
  getNotesByTopic,
  getTopics,
} from '@/lib/knowledge'
import { genPageMetadata } from 'app/seo'
import clsx from 'clsx'

export const dynamic = 'force-static'

/** Notes that describe the shape of the vault itself — a decent way in. */
const ORIENTATION_SLUGS = ['zettelkasten', 'wiki', 'backlink', 'knowledge-graph']

const DESCRIPTION =
  'A personal reference wiki: one note per concept, each written to stand on its own, densely linked to the others.'

export const metadata = genPageMetadata({
  title: 'Knowledge',
  description: DESCRIPTION,
})

/** The keycap in the search hint — both platforms, no client-side detection. */
function Keys({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 font-mono text-[11px] font-medium text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
      {children}
    </kbd>
  )
}

export default function KnowledgePage() {
  const stats = getKnowledgeStats()
  const topics = getTopics()
  const graph = getGraph()
  const hubs = getHubs(12)

  const previews = new Map(
    topics.map((topic) => [
      topic.slug,
      [...getNotesByTopic(topic.slug)].sort(
        (a, b) => b.degree - a.degree || a.title.localeCompare(b.title)
      ),
    ])
  )

  // 11 domains never divide evenly, so the last card takes the full row rather
  // than dangling beside an empty cell.
  const lastTopicSlug = topics[topics.length - 1]?.slug

  const orientation = ORIENTATION_SLUGS.map((slug) => getNoteBySlug(slug)).filter(
    (note) => note !== undefined
  )

  const peakDegree = hubs[0]?.degree ?? 1

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Knowledge',
    description: DESCRIPTION,
    url: `${siteMetadata.siteUrl}/knowledge`,
    author: { '@type': 'Person', name: siteMetadata.author },
    hasPart: topics.map((topic) => ({
      '@type': 'CollectionPage',
      name: topic.name,
      description: topic.blurb,
      url: `${siteMetadata.siteUrl}${topic.path}`,
    })),
  }

  return (
    <div className="space-y-2">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="grid gap-x-10 gap-y-8 pt-12 pb-8 xl:grid-cols-[minmax(0,1fr)_19rem]">
        <div>
          <p className="text-primary-600 dark:text-primary-400 mb-4 text-sm font-medium tracking-widest uppercase">
            Concept Wiki
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-gray-100">
            Knowledge
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
            Ongoing documentation of the subjects I&rsquo;m learning about and the relationships
            between them.
          </p>

          <StatLine
            className="mt-8"
            items={[
              { value: stats.notes, label: 'Notes' },
              { value: stats.links, label: 'Connections' },
              { value: stats.topics, label: 'Domains' },
            ]}
          />
        </div>

        <Card variant="stat" hover={false} as="aside" className="p-5" aria-label="Ways in">
          <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Ways in
          </h2>

          <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-sm text-gray-600 dark:text-gray-400">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <Keys>&#8984;K</Keys>
            <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">
              /
            </span>
            <Keys>Ctrl K</Keys>
            searches all {stats.notes} notes
          </p>

          {orientation.length > 0 && (
            <div className="mt-5 border-t border-gray-200 pt-5 dark:border-gray-800">
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Or start with the four notes that describe the shape of the thing you&rsquo;re
                looking at.
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {orientation.map((note) => (
                  <li key={note.slug}>
                    <Link
                      href={note.path}
                      className="hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium whitespace-nowrap text-gray-700 transition-all duration-150 hover:-translate-y-px hover:shadow-sm dark:bg-gray-800 dark:text-gray-300"
                    >
                      {note.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
      </header>

      <section className="animate-on-scroll py-6" aria-label="The whole vault as a graph">
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            The constellation
          </h2>
          <p className="hidden text-sm text-gray-500 sm:block dark:text-gray-400">
            Every note, every link. Colour is domain.
          </p>
        </div>
        <div className="content-defer">
          <KnowledgeGraph graph={graph} variant="constellation" showLegend />
        </div>
      </section>

      <section
        className="animate-on-scroll border-t border-gray-200 py-10 dark:border-gray-800"
        aria-label="Domains"
      >
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Domains
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{stats.topics} of them</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {topics.map((topic, i) => {
            const wide = topic.slug === lastTopicSlug
            return (
              <TopicCard
                key={topic.slug}
                topic={topic}
                preview={(previews.get(topic.slug) ?? []).slice(0, wide ? 6 : 4)}
                wide={wide}
                className={clsx('animate-fade-slide-up', wide && 'md:col-span-2')}
                style={{ animationDelay: `${i * 60}ms` }}
              />
            )
          })}
        </div>
      </section>

      <section
        className="animate-on-scroll border-t border-gray-200 py-10 dark:border-gray-800"
        aria-label="Most connected notes"
      >
        <div className="mb-2 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            Where everything meets
          </h2>
        </div>
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          The notes the rest of the vault keeps reaching for. Bar length is the number of notes on
          the other end of a link.
        </p>
        <ul className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
          {hubs.map((note, i) => (
            <li
              key={note.slug}
              className="animate-fade-slide-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <Link href={note.path} className="group block" style={topicVars(note.topic)}>
                <span className="flex items-baseline justify-between gap-3">
                  <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 truncate text-sm font-medium text-gray-900 transition-colors dark:text-gray-100">
                    {note.title}
                  </span>
                  <span className="shrink-0 text-xs text-gray-500 tabular-nums dark:text-gray-400">
                    {note.degree}
                  </span>
                </span>
                <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                  <span
                    className="animate-grow-width block h-full rounded-full bg-[var(--topic)] opacity-70 transition-opacity group-hover:opacity-100 dark:bg-[var(--topic-dark)]"
                    style={{ width: `${Math.round((note.degree / peakDegree) * 100)}%` }}
                  />
                </span>
                <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                  {note.topicName}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
