import AuthorLayout from '@/layouts/AuthorLayout'
import { genPageMetadata } from 'app/seo'
import { coreContent, getAuthorBySlug } from '@/lib/content'
import { MDXContent } from '@/lib/mdx'

const Page = async () => {
  const author = await getAuthorBySlug('default')
  if (!author) return null

  const mainContent = coreContent(author)

  return (
    <AuthorLayout content={mainContent}>
      <MDXContent source={author.body} />
    </AuthorLayout>
  )
}

const metadata = genPageMetadata({ title: 'About' })

export default Page
export { metadata }
