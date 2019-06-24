import React from 'react'

import Layout from './../../components/Layout'
import SEO from './../../components/SEO'
import PostEntryMeta from './../../components/PostEntryMeta'
import PostEntryTitle from './../../components/PostEntryTitle'
import PostEntryMedia from './../../components/PostEntryMedia'

const Post = ({ pageContext: post }) => {
  return (
    <Layout>
      <SEO title={`${post.title}`} />
      <div className="post-wrapper">
        <header className="entry-header top-spacer bottom-spacer">
          <PostEntryTitle
            location="single"
            post={post}
            titleClass="entry-title h1" />
          <PostEntryMeta post={post} />
        </header>

        {post.featuredImage &&
          <PostEntryMedia post={post} location="single" />
        }

        <div className="entry-content" dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <EngagementBar post={post} />
    </Layout>
  )
}

export default Post
