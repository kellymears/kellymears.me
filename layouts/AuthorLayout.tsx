import Image from '@/components/Image'
import SocialIcon from '@/components/social-icons'
import type { Author, CoreContent } from '@/lib/content'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  content: CoreContent<Author>
}

const AuthorLayout = ({ children, content }: Props) => {
  const { name, avatar, occupation, company, email, github, linkedin } = content

  return (
    <div className="animate-page-enter space-y-0 pt-6 pb-8">
      {/* Author card with warm background tint */}
      <div className="bg-primary-50/50 dark:bg-primary-950/30 rounded-2xl border border-transparent px-6 py-10 sm:px-10 sm:py-12 dark:border-gray-800/60">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:gap-12 md:text-left">
          {/* Avatar with decorative ring accent */}
          {avatar && (
            <div className="group relative shrink-0">
              <div className="from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 absolute -inset-1.5 rounded-2xl bg-gradient-to-br opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-40" />
              <Image
                src={avatar}
                alt={`Portrait of ${name}`}
                width={160}
                height={160}
                className="ring-primary-300/50 group-hover:shadow-primary-500/10 dark:ring-primary-600/40 dark:group-hover:shadow-primary-400/10 relative h-32 w-32 rounded-2xl object-cover ring-2 transition-shadow duration-300 group-hover:shadow-lg md:h-40 md:w-40"
              />
            </div>
          )}

          <div className="min-w-0">
            {/* Name with decorative gradient underline */}
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-gray-100">
              {name}
            </h1>
            <div className="from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 mx-auto mt-2 h-0.5 w-16 rounded-full bg-gradient-to-r md:mx-0" />

            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              {occupation}
              {company ? ` at ${company}` : ''}
            </p>

            {/* Social icons with improved spacing and hover effects */}
            <nav
              aria-label="Social links"
              className="mt-5 flex justify-center gap-3 md:justify-start"
            >
              <SocialIcon kind="mail" href={`mailto:${email}`} size={6} />
              <SocialIcon kind="github" href={github} size={6} />
              <SocialIcon kind="linkedin" href={linkedin} size={6} />
            </nav>
          </div>
        </div>
      </div>

      {/* Prose content with accent left border */}
      <div className="relative mt-8">
        <div className="prose prose-lg dark:prose-invert md:border-primary-300/50 dark:md:border-primary-700/40 mx-auto max-w-prose pt-2 pb-8 pl-0 md:border-l-2 md:pl-8">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AuthorLayout
