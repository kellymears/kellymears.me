import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer className="mt-16 mb-8 flex flex-col items-center">
      <div className="mb-3 flex space-x-4">
        <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
        <SocialIcon kind="github" href={siteMetadata.github} size={6} />
      </div>
    </footer>
  )
}
