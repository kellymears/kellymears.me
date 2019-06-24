import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SocialNav = () => (
  <nav className="social-navigation" aria-label="Social Menu">
    <div className="menu-social-container">
      <ul id="menu-social" className="header-font medium smooth gray list-reset">
        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-351">
          <a href="http://twitter.com/tinydevteam" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <span className="screen-reader-text">Twitter</span>
            <FontAwesomeIcon icon={['fab', 'twitter']} color="black" />
          </a>
        </li>
        <li className="menu-item menu-item-type-custom menu-item-object-custom menu-item-352">
          <a href="http://github.com/kellymears" style={{ paddingLeft: '10px', paddingRight: '10px' }}>
            <span className="screen-reader-text">Github</span>
            <FontAwesomeIcon icon={['fab', 'github']} color="black" />
          </a>
        </li>
      </ul>
    </div>
  </nav>
)

export default SocialNav
