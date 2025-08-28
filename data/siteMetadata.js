/** @type {import("pliny/config").PlinyConfig } */
const siteMetadata = {
  title: 'Kelly Mears',
  author: 'Kelly Mears',
  headerTitle: '〠 Kelly Mears',
  description: 'My personal blog',
  language: 'en-us',
  theme: 'system',
  siteUrl: 'https://kellymears.me',
  siteRepo: 'https://github.com/kellymears/kellymears.me',
  siteLogo: `${process.env.BASE_PATH || ''}/static/images/logo.png`,
  socialBanner: `${process.env.BASE_PATH || ''}/static/images/twitter-card.png`,
  email: 'hello@kellymears.me',
  github: 'https://github.com/kellymears',
  locale: 'en-US',
  stickyNav: true,
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
