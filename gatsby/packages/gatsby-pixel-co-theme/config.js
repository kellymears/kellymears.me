const config = {
  wordPressUrl: process.env.GATSBY_ENV==='development'
    ? 'http://kellymears.valet'
    : 'https://cms.kellymears.me',
}

module.exports = config
