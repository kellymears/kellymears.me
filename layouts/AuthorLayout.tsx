import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import type { Author, CoreContent } from '@/lib/content'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  content: CoreContent<Author>
}

const AuthorLayout = ({ children, content }: Props) => {
  const { name, avatar, occupation, company, email, github, linkedin } = content

  return (
    <>
      <div className="space-y-12 pt-6 pb-8">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-12">
          {avatar && (
            <Image
              src={avatar}
              alt="avatar"
              width={160}
              height={160}
              className="h-32 w-32 rounded-2xl object-cover md:h-40 md:w-40"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
              {name}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              {occupation}
              {company ? ` at ${company}` : ''}
            </p>
            <div className="mt-4 flex space-x-4">
              <SocialIcon kind="mail" href={`mailto:${email}`} size={5} />
              <SocialIcon kind="github" href={github} size={5} />
              <SocialIcon kind="linkedin" href={linkedin} size={5} />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800">
          <div className="prose prose-lg dark:prose-invert mx-auto max-w-prose pt-10 pb-8">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthorLayout
