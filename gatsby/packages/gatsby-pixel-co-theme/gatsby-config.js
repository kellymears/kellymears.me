const path = require(`path`)

// Plugins
const autoprefixer = require("autoprefixer")

require("dotenv").config(
  process.env.GATSBY_ENV == 'development' && (() => {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  })
)

const plugins = {
  postCss: {
    resolve: 'gatsby-plugin-postcss',
    options: {
      postCssPlugins: [
        autoprefixer({ browsers: ['last 2 versions'] }),
      ],
    },
  },
  typography: {
    resolve: 'gatsby-plugin-typography',
    options: {
      pathToConfigModule: require.resolve(`./src/utils/typography`),
    },
  },
}

module.exports = ({ wordPressUrl }) => ({
  plugins: [
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'WPGraphQL',
        fieldName: 'wpgraphql',
        url: `${wordPressUrl}/graphql`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-sass',
    `gatsby-transformer-sharp`,
    plugins.postCss,
    plugins.typography,
  ],
})
