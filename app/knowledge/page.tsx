import { Accent, SectionHeading } from '@/components/home/SectionHeading'
import Link from '@/components/Link'
import { KnowledgeGraph } from '@/components/knowledge/KnowledgeGraph'
import { topicVars } from '@/components/knowledge/NoteCard'
import { TopicCard } from '@/components/knowledge/TopicCard'
import { topicSilhouette } from '@/components/knowledge/topic-silhouette'
import { Wander } from '@/components/knowledge/Wander'
import siteMetadata from '@/data/siteMetadata'
import {
  getAllNotes,
  getDailyNote,
  getGraph,
  getHubs,
  getKnowledgeStats,
  getNoteBySlug,
  getNotesByTopic,
  getProminentConnections,
  getTopics,
} from '@/lib/knowledge'
import { genPageMetadata } from 'app/seo'
import clsx from 'clsx'

// ISR so the topic of the day actually rotates: the pick is keyed to the
// current date in America/New_York, so the page re-renders within 15 minutes
// of Eastern midnight. Everything else on the page is unaffected.
export const revalidate = 900

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
  const allNotes = getAllNotes()

  // Same note for every visitor, resetting at midnight Eastern.
  const dayKey = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/New_York',
  }).format(new Date())
  const daily = getDailyNote(dayKey)
  const dailyConnections = getProminentConnections(daily.slug, 3)

  const previews = new Map(
    topics.map((topic) => [
      topic.slug,
      [...getNotesByTopic(topic.slug)].sort(
        (a, b) => b.degree - a.degree || a.title.localeCompare(b.title)
      ),
    ])
  )

  const orientation = ORIENTATION_SLUGS.map((slug) => getNoteBySlug(slug)).filter(
    (note) => note !== undefined
  )

  const peakDegree = hubs[0]?.degree ?? 1

  // Floats over the map on wide screens; sits under it on phones, where an
  // overlay would cover most of the canvas.
  const topicOfDay = (
    <>
      <p className="flex items-center gap-2 font-mono text-[0.65rem] tracking-widest text-gray-500 uppercase dark:text-gray-400">
        Topic of the Day
        <span aria-hidden="true" className="text-gray-300 dark:text-gray-700">
          ·
        </span>
        <span className="text-[var(--topic)] dark:text-[var(--topic-dark)]">{daily.topicName}</span>
      </p>
      <Link href={daily.path} className="group mt-2 inline-flex items-baseline gap-2.5">
        <span
          aria-hidden="true"
          className="h-2.5 w-2.5 shrink-0 self-center rounded-full bg-[var(--topic)] dark:bg-[var(--topic-dark)]"
        />
        <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 text-2xl font-semibold tracking-tight text-gray-900 transition-colors dark:text-gray-100">
          {daily.title}
        </span>
      </Link>
      <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
        {daily.summary}
      </p>
      {dailyConnections.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Prominent connections">
          {dailyConnections.map((connection) => (
            <li key={connection.slug}>
              <Link
                href={connection.path}
                className="hover:bg-primary-100 hover:text-primary-700 dark:hover:bg-primary-950 dark:hover:text-primary-300 inline-flex items-center rounded-full bg-gray-100 px-3 py-0.5 text-sm font-medium whitespace-nowrap text-gray-700 transition-all duration-150 hover:-translate-y-px hover:shadow-sm dark:bg-gray-800 dark:text-gray-300"
              >
                {connection.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )

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
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <header className="pt-12 pb-2">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3">
          <p className="text-primary-600 dark:text-primary-400 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
            <span>Concept Wiki</span>
            <span aria-hidden="true" className="bg-primary-500 h-px w-8" />
            <span className="text-gray-500 dark:text-gray-400">
              {stats.notes} notes · {stats.links.toLocaleString()} links
            </span>
          </p>
          <Wander paths={allNotes.map((n) => n.path)} label="View random note" />
        </div>
        <h1 className="text-[clamp(2.75rem,8vw,6rem)] leading-[0.95] font-semibold tracking-[-0.035em] text-gray-900 dark:text-gray-100">
          Notes &amp; <Accent>connections</Accent>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 dark:text-gray-400">
          Ongoing documentation of the subjects I&rsquo;m learning about and the relationships
          between them. One note per concept, each written to stand on its own.
        </p>

        <div
          aria-label="Ways in"
          role="group"
          className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-gray-600 dark:text-gray-400"
        >
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
          <span>searches everything.</span>
          {orientation.length > 0 && (
            <>
              <span className="text-gray-500 dark:text-gray-400">Or start with</span>
              <ul className="flex flex-wrap gap-2">
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
            </>
          )}
        </div>
      </header>

      <section className="pt-2 pb-6" aria-label="The whole vault as a graph">
        <KnowledgeGraph
          graph={graph}
          variant="constellation"
          frame="bleed"
          showLegend
          overlay={
            <aside
              aria-label="Topic of the day"
              className="bg-paper/95 pointer-events-auto mb-10 hidden max-w-sm self-end rounded-2xl border border-gray-200/70 p-5 shadow-[0_24px_60px_-30px_rgb(0_0_0/0.35)] sm:block dark:border-gray-800/70 dark:bg-gray-950/92"
              style={topicVars(daily.topic)}
            >
              {topicOfDay}
            </aside>
          }
        />
        <aside
          aria-label="Topic of the day"
          className="mt-6 rounded-2xl border border-gray-200 p-5 sm:hidden dark:border-gray-800"
          style={topicVars(daily.topic)}
        >
          {topicOfDay}
        </aside>
      </section>

      <section className="py-12" aria-label="Domains">
        <SectionHeading index="01">
          {stats.topics} <Accent>domains</Accent>
        </SectionHeading>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, i) => (
            <TopicCard
              key={topic.slug}
              topic={topic}
              index={String(i + 1).padStart(2, '0')}
              silhouette={topicSilhouette(graph, topic.slug)}
              preview={(previews.get(topic.slug) ?? []).slice(0, 4)}
              className={clsx(
                'animate-fade-slide-up',
                // An odd count leaves one card alone in the two-column band.
                i === topics.length - 1 && topics.length % 2 === 1 && 'md:max-lg:col-span-2'
              )}
              style={{ animationDelay: `${i * 50}ms` }}
            />
          ))}
        </div>
      </section>

      <section className="animate-on-scroll py-12" aria-label="Most connected notes">
        <SectionHeading index="02">
          Most <Accent>connected</Accent>
        </SectionHeading>
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
