import React from 'react';

import Identity from './identity';
import ScenesNav from './scenes-nav';

const Header = () => (
  <header className="top-nav clearfix">
    <a href="./" className="top-nav-title">ArcGIS React Redux</a>
    <nav className="top-nav-list">
      <ScenesNav />
    </nav>
    <nav className="class-top-nav-list right">
      <Identity />
    </nav>
  </header>
);


export default Header;
