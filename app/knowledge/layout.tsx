import KnowledgeChrome from '@/components/knowledge/KnowledgeChrome'
import { Wander } from '@/components/knowledge/Wander'
import { getAllNotes, getSearchIndex } from '@/lib/knowledge'
import type { ReactNode } from 'react'

/**
 * The section is fully derived from files on disk, so every route under it is
 * static. `KnowledgeChrome` mounts once here and provides the search palette
 * and hover previews for the whole wiki. Site header/footer come from the root
 * layout; nothing else belongs here.
 */
export const dynamic = 'force-static'

export default function KnowledgeLayout({ children }: { children: ReactNode }) {
  const paths = getAllNotes().map((note) => note.path)

  return (
    <>
      {children}

      {/*
        Kept in the flow rather than floating: a fixed control would sit over
        prose on every note page, which is why the search pill was removed.
      */}
      <aside className="mt-16 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Wander paths={paths} label="Wander somewhere" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Or don&rsquo;t choose — the vault picks a note for you.
        </p>
      </aside>

      <KnowledgeChrome index={getSearchIndex()} />
    </>
  )
}
