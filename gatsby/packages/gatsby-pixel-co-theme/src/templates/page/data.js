const PageTemplateFragment = `
  fragment PageTemplateFragment on WPGraphQL_Page {
    id
    pageId
    title
    content
    link
  }
`

module.exports = { PageTemplateFragment }
