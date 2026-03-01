import type { MDXComponents } from 'mdx/types'
import Pre from '@/components/Pre'
import TOCInline from '@/components/TOCInline'
import Image from './Image'
import Link from './Link'
import TableWrapper from './TableWrapper'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: Link,
  pre: Pre,
  table: TableWrapper,
}
