import KnowledgeChrome from '@/components/knowledge/KnowledgeChrome'
import { getSearchIndex } from '@/lib/knowledge'
import type { ReactNode } from 'react'

/**
 * The section is fully derived from files on disk, so every route under it is
 * static. `KnowledgeChrome` mounts once here and provides the search palette
 * and hover previews for the whole wiki. Site header/footer come from the root
 * layout; nothing else belongs here.
 *
 * The "View random note" control deliberately lives in each page's own header
 * row rather than here: the pages do not share a top-right corner — the index
 * and domain pages both put a card there — so a single positioned control in
 * the layout would either collide or sit on its own orphaned row.
 */
export const dynamic = 'force-static'

export default function KnowledgeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}

      <KnowledgeChrome index={getSearchIndex()} />
    </>
  )
}
