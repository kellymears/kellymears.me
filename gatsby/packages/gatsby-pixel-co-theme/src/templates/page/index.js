import React from 'react'
import Layout from '../../components/Layout'
import SEO from '../../components/SEO'

const parseContent = content => ({ __html: content })

const SinglePage = ({ pageContext: { id, postId, title, content, excerpt } }) => (
  <Layout>
    <SEO title={`${title}`} />
    <article
      data-id={id}
      id={`post-${postId}`}
      className={`post-${postId} post type-post status-publish format-standard hentry category-react tag-accessibility tag-gatsby entry`}>
      <header className="entry-header">
        <h1 className="entry-title">{title}</h1>
        <div className="entry-meta" />
      </header>
      <div className="entry-content" dangerouslySetInnerHTML={parseContent(content)} />
      <footer className="entry-footer" />
    </article>
  </Layout>
)

export default SinglePage
