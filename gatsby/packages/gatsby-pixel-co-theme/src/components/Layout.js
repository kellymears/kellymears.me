import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'
import PropTypes from 'prop-types'
import '../styles/scss/style.scss'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(
  faGithub,
  faTwitter,
)

const Layout = ({ children }) => (
  <Fragment>
    <Header />
    <div className="site-content">{children}</div>
    <Footer />
  </Fragment>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
