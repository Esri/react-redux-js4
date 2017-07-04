import React from 'react';

import { START_SCENE_ID } from '../constants'

import Identity from './identity';
import WebSceneView from './webscene';
import Info from './info';


const App = (props) =>
	<div className="container">
		<div className="header">
			<Identity />
		</div>
		<div className="app">
		    <WebSceneView websceneid={START_SCENE_ID} store={props.store} />
		    <Info />
		</div>
	</div>;

export default App;

