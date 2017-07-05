import React from 'react';

import Identity from './identity';
import WebSceneView from './webscene';
import Info from './info';


const App = (props) =>
	<div className="container">
		<Identity />
	    <WebSceneView store={props.store} />
	    <Info />
	</div>;

export default App;

