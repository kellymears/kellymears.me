import React from 'react'
import classnames from 'classnames'

import { Twitter, FacebookShare } from './Icons'

const TwitterButton = ({ post: { title, link } }) => {
  const tw = {
    base: `http://twitter.com/share`,
    text: `text=${title}`,
    url: `url=${link}`,
    classes: classnames(
      'share-icon',
      'share-icon--twitter',
      'button--attention',
      'header-font',
      'medium',
      'smooth relative'
    )
  }

  return (
    <a
      href={`${tw.base}?${tw.text}&amp;${tw.url}`}
      target="_blank"
      rel="noopener noreferrer"
      className={tw.classes}>
      Tweet <Twitter />
    </a>
  )
}

const FacebookButton = ({ post: { title, link, featuredImage } }) => {
  const fb = {
    base: `https://www.facebook.com/sharer/sharer.php`,
    url: `u=${link}`,
    title: `title=${title}`,
    picture: `picture=%20${featuredImage && featuredImage.sourceUrl}`,
    classes: classnames(
      'share-icon',
      'share-icon--facebook',
      'button--attention--fb',
      'header-font',
      'medium',
      'smooth',
      'relative',
    )
  }

  const share = `${fb.base}?${fb.url}&amp;${fb.title}&amp;${fb.picture}`

  return (
    <a
      className={fb.classes}
      href={share}
      target="_blank"
      rel="noopener noreferrer">
      Facebook <FacebookShare />
    </a>
  )
}

const ShareIcons = ({ post }) => (
  <div className="flex items-center justify-start">
    <TwitterButton post={post} />
    <FacebookButton post={post} />
  </div>
)

export default ShareIcons
