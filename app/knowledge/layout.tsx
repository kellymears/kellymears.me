import KnowledgeChrome from '@/components/knowledge/KnowledgeChrome'
import { getSearchIndex } from '@/lib/knowledge'
import type { ReactNode } from 'react'

/**
 * The section is fully derived from files on disk, so every route under it is
 * static. `KnowledgeChrome` mounts once here and provides the search palette
 * and hover previews for the whole wiki. Site header/footer come from the root
 * layout; nothing else belongs here.
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
