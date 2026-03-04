import {
  Bluesky,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Mastodon,
  Medium,
  Threads,
  Twitter,
  X,
  Youtube,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  x: X,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
  medium: Medium,
  bluesky: Bluesky,
}

const labels: Record<string, string> = {
  mail: 'Send an email',
  github: 'GitHub profile',
  facebook: 'Facebook profile',
  youtube: 'YouTube channel',
  linkedin: 'LinkedIn profile',
  twitter: 'Twitter profile',
  x: 'X (Twitter) profile',
  mastodon: 'Mastodon profile',
  threads: 'Threads profile',
  instagram: 'Instagram profile',
  medium: 'Medium profile',
  bluesky: 'Bluesky profile',
}

interface SocialIconProps {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({ kind, href, size = 8 }: SocialIconProps) => {
  if (
    !href ||
    (kind === 'mail' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  return (
    <a
      className="group/icon hover:bg-primary-50 dark:hover:bg-primary-950/30 inline-flex items-center justify-center rounded-lg p-2 text-sm text-gray-500 transition-all duration-200 hover:-translate-y-0.5 hover:text-gray-600"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
      aria-label={labels[kind] ?? kind}
    >
      <SocialSvg
        className={`group-hover/icon:text-primary-500 dark:group-hover/icon:text-primary-400 fill-current text-gray-600 transition-colors duration-200 dark:text-gray-300 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
