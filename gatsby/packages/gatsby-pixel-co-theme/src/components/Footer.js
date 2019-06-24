import React from 'react';
import Subscribe from './Subscribe';

const Footer = () => (
  <footer className="site-footer">
    <Subscribe />
    <div className="site-info container center-align medium header-font gray">
      <span className="site-copyright">
        <span
          className="copyright-year  "
          itemScope=""
          itemType="http://schema.org/copyrightYear">
          © {`${new Date().getFullYear()} `}
        </span>
        <span
          className="copyright-text"
          itemScope=""
          itemType="http://schema.org/copyrightHolder">
          Kelly Mears
        </span>
      </span>
    </div>
  </footer>
);

export default Footer;
