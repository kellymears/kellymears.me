module.exports = {
  siteMetadata: {
    title: `Kelly Mears`,
    description: `Programming blog.`,
    author: `@tinydevteam`,
    wordPressUrl: 'https://cms.kellymears.me',
  },
  __experimentalThemes: [
    {
      resolve: __dirname + '/../packages/gatsby-pixel-co-theme/index.js',
      options: { wordPressUrl: 'https://cms.kellymears.me' },
    },
  ],
};
