import React from 'react';

import Identity from './identity';
import ScenesDropdown from './scenes-dropdown';

const Header = () =>
	<header className="top-nav">
		<a href="./" className="top-nav-title">ArcGIS React Redux</a>
		<nav className="top-nav-list" role="navigation">
			<ScenesDropdown />
		</nav>
		<nav className="class-top-nav-list right" role="navigation" aria-labelledby="usernav">
            <Identity />
        </nav>
	</header>;


export default Header;

