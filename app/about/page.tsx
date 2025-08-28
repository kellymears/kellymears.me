import AuthorLayout from '@/layouts/AuthorLayout'
import { genPageMetadata } from 'app/seo'
import { allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'

const Page = () => {
  const author = allAuthors.find((p) => p.slug === 'default')
  if (!author) return null

  const mainContent = coreContent(author)

  return (
    <AuthorLayout content={mainContent}>
      <MDXLayoutRenderer code={author.body.code} />
    </AuthorLayout>
  )
}

const metadata = genPageMetadata({ title: 'About' })

export default Page
export { metadata }
