import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import clsx from 'clsx'
import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import ThemeSwitch from './ThemeSwitch'

const Header = () => {
  const headerClass = clsx(
    'flex items-center w-full justify-between py-4 backdrop-blur-sm bg-white/80 dark:bg-gray-950/80 border-b border-gray-200/60 dark:border-gray-800/60',
    {
      'sticky top-0 z-50': siteMetadata.stickyNav,
    }
  )

  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle}>
        <div className="flex items-center justify-between">
          <div className="h-6 text-xl font-semibold tracking-tight text-gray-900 sm:block dark:text-gray-100">
            {siteMetadata.headerTitle}
          </div>
        </div>
      </Link>

      <div className="flex items-center space-x-4 leading-5 sm:-mr-6 sm:space-x-6">
        <div className="no-scrollbar hidden items-center gap-x-5 overflow-x-auto sm:flex md:max-w-96 lg:max-w-none">
          {headerNavLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="hover:text-primary-600 dark:hover:text-primary-400 font-medium text-gray-600 transition-colors dark:text-gray-300"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  )
}

export default Header
