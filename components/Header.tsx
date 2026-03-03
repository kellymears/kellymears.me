import siteMetadata from '@/data/siteMetadata'
import clsx from 'clsx'
import Link from './Link'
import MobileNav from './MobileNav'
import NavLinks from './NavLinks'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const headerClass = clsx(
    'flex items-center w-full justify-between py-4 bg-[oklch(0.99_0.005_75)] dark:bg-gray-950',
    {
      'sticky top-0 z-50': siteMetadata.stickyNav,
    }
  )

  return (
    <header className={clsx(headerClass, 'relative overflow-x-clip')}>
      <div
        className="pointer-events-none absolute inset-y-0 -left-12 w-12 bg-gradient-to-l from-[oklch(0.99_0.005_75)] to-transparent dark:from-gray-950 dark:to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 -right-12 w-12 bg-gradient-to-r from-[oklch(0.99_0.005_75)] to-transparent dark:from-gray-950 dark:to-transparent"
        aria-hidden="true"
      />
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="h-6 text-xl font-semibold tracking-tight text-gray-900 sm:block dark:text-gray-100">
            {siteMetadata.headerTitle}
          </div>
        </div>
      </Link>

      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <NavLinks />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
