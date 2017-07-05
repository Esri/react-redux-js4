import React from 'react';

import Header from './header';
import Identity from './identity';
import WebSceneView from './webscene';
import Info from './info';


const App = (props) =>
	<div className="container">
		<Header/>
		<div className="app-main">
	    	<WebSceneView store={props.store} />
	    	<Info />
	    </div>
	</div>;

export default App;

