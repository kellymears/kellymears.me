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
  x: 'https://x.com/twinfleeks',
  instagram: 'https://www.instagram.com/vandalizethis',
  locale: 'en-US',
  stickyNav: true,
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
  search: {
    provider: 'kbar',
    kbarConfig: {
      searchDocumentsPath: `${process.env.BASE_PATH || ''}/search.json`,
    },
  },
}

module.exports = siteMetadata
