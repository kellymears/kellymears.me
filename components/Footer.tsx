import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import NavLinks from './NavLinks'

export default function Footer() {
  return (
    <footer className="mt-16 pt-10 pb-8">
      <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col items-center gap-4 sm:items-start">
          <span className="text-lg leading-12 font-semibold tracking-tight text-gray-900 dark:text-gray-100">
            Kelly Mears
          </span>
          <NavLinks alwaysVisible />
        </div>

        <div className="flex flex-col items-center gap-4 sm:items-end">
          <div className="flex space-x-4">
            <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
            <SocialIcon kind="github" href={siteMetadata.github} size={5} />
            <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
          </div>
        </div>
      </div>
    </footer>
  )
}
