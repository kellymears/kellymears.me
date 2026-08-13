import Link from '@/components/Link'
import { resolveWikilink } from '@/lib/knowledge'
import { remarkWikilink } from '@/lib/remark-wikilink'
import clsx from 'clsx'
import type { Nodes } from 'hast'
import type { Components } from 'hast-util-to-jsx-runtime'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import rehypeSlug from 'rehype-slug'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import type { ComponentPropsWithoutRef } from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'

/**
 * Vault notes are plain CommonMark — no JSX, no frontmatter expressions — so
 * they go through remark directly rather than through MDX. Cheaper per note,
 * and it means a stray `<` in prose can never fail a build.
 */
const processor = remark()
  .use(remarkGfm)
  .use(remarkWikilink, { resolve: resolveWikilink })
  .use(remarkRehype)
  .use(rehypeSlug)

/**
 * Wiki-internal links read as traversals, ordinary links as citations: same
 * colour, different rule. `.prose a` (specificity 0,1,1) already owns colour,
 * thickness and offset, and `@tailwindcss/typography` sets the
 * `text-decoration` *shorthand*, which resets decoration-style — hence the two
 * `!` modifiers. Everything else here is uncontested.
 */
const wikilinkClass = [
  '-mx-0.5 rounded-sm px-0.5 break-words',
  'decoration-dotted! hover:decoration-solid!',
  'hover:bg-primary-50 dark:hover:bg-primary-950/50 transition-colors',
].join(' ')

type AnchorProps = ComponentPropsWithoutRef<'a'> & { 'data-wikilink'?: string }

/**
 * `data-wikilink` must survive to the DOM — hover previews delegate on it.
 */
const ProseAnchor = ({ href, className, ...rest }: AnchorProps) => {
  const wikilink = rest['data-wikilink']

  return (
    <Link
      href={href ?? '#'}
      {...rest}
      className={clsx('break-words', wikilink && wikilinkClass, className)}
    />
  )
}

const components: Partial<Components> = { a: ProseAnchor }

const renderMarkdown = (source: string) => {
  const tree = processor.runSync(processor.parse(source)) as unknown as Nodes
  return toJsxRuntime(tree, { Fragment, jsx, jsxs, components, ignoreInvalidStyle: true })
}

interface NoteProseProps {
  body: string
  className?: string
}

/**
 * The note body. The opening sentence bolds the term being defined, so the
 * leading `<strong>` is tinted to act as a running head.
 */
const NoteProse = ({ body, className }: NoteProseProps) => (
  <div
    className={clsx(
      // No max-w override: `prose-lg`'s own 65ch measure is the right one here.
      'prose prose-lg dark:prose-invert',
      '[&>p:first-of-type>strong:first-child]:text-primary-700',
      'dark:[&>p:first-of-type>strong:first-child]:text-primary-400',
      className
    )}
  >
    {renderMarkdown(body)}
  </div>
)

export { NoteProse }
export default NoteProse
