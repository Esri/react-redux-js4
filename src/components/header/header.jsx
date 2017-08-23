import React from 'react';

import IdentityNav from './identity-nav';
import ScenesNav from './scenes-nav';

const Header = () => (
  <header className="top-nav clearfix">
    <a href="./" className="top-nav-title">ArcGIS React Redux</a>
    <nav className="top-nav-list">
      <ScenesNav />
    </nav>
    <nav className="class-top-nav-list right">
      <IdentityNav />
    </nav>
  </header>
);

export default Header;
