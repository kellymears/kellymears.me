import React from 'react';
import { Link } from 'gatsby';
import avatar from '../images/profile.jpg';

const Logo = ({ data }) => (
  <Link to="/" className="custom-logo-link site-logo" rel="home" itemProp="url">
    <img
      src={avatar}
      width="150"
      height="150"
      className="custom-logo initial loaded"
      alt={data.site.siteMetadata.title}
      itemProp="logo"/>
  </Link>
);

export default Logo;
