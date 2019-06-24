require("dotenv").config(
  process.env.GATSBY_ENV == 'development' && (() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  })
)

module.exports = {
  siteMetadata: {
    title: `Kelly Mears`,
    description: `Programming blog.`,
    author: `@tinydevteam`,
    wordPressUrl: process.env.GATSBY_ENV == 'development' ? `http://kellymears.valet` : `https://cms.kellymears.me`,
  },
  __experimentalThemes: [
    {
      resolve: __dirname + '/../packages/gatsby-pixel-co-theme/index.js',
      options: { wordPressUrl: process.env.GATSBY_ENV=='development' ? `http://kellymears.valet` : `https://cms.kellymears.me` },
    },
  ],
};
