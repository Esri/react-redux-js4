import React from 'react';

import WebSceneView from './webscene';
import Info from './info';


const App = (props) =>
	<div className="container">
	    <WebSceneView websceneid='eec4ab53d9bb453094e9161d944baced' store={props.store} />
	    <Info />
	</div>;

export default App;

