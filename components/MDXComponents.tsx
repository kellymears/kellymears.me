import Pre from '@/components/Pre'
import TOCInline from '@/components/TOCInline'
import type { MDXComponents } from 'mdx/types'
import dynamic from 'next/dynamic'
import Image from './Image'
import Link from './Link'
import TableWrapper from './TableWrapper'

const ReduceStepper = dynamic(
  () => import('@/components/blog/ReduceStepper').then((mod) => mod.ReduceStepper),
  {
    loading: () => (
      <div className="my-8 h-64 animate-pulse rounded-xl bg-gray-100 dark:bg-gray-800" />
    ),
  }
)

export const components: MDXComponents = {
  Image,
  TOCInline,
  ReduceStepper,
  a: Link,
  pre: Pre,
  table: TableWrapper,
}
