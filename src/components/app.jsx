import React from 'react';

import WebSceneView from './webscene';
import Info from './info';


const App = (props) =>
	<div className="container">
	    <WebSceneView websceneid='7f2f95b7ea58491484c39a2905f22c06' store={props.store} />
	    <Info />
	</div>;

export default App;
