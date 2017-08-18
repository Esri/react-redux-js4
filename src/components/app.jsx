import React from 'react';

import Header from './header';
import WebSceneView from './webscene';
import Info from './info';
import TimeNav from './timenav';
import ShadowsNav from './shadowsnav';


const App = () => (
  <div className="container">
    <Header />
    <div className="app-main">
      <WebSceneView />
      <div className="app-widgets">
        <TimeNav />
        <ShadowsNav />
        <Info />
      </div>
    </div>
  </div>
);

export default App;
