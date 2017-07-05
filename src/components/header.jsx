import React from 'react';

import Identity from './identity';
import UserScenesDropdown from './userscenesdropdown';

const Header = () =>
	<header className="top-nav">
		<a href="./" className="top-nav-title">WebUP</a>
		<nav className="top-nav-list" role="navigation">
			<UserScenesDropdown />
		</nav>
		<nav className="class-top-nav-list right" role="navigation" aria-labelledby="usernav">
            <Identity />
        </nav>
	</header>;


export default Header;

