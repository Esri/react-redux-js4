import React from 'react';

import Header from './header';
import WebSceneView from './webscene';
import Info from './info';


const App = () => (
  <div className="container">
    <Header />
    <div className="app-main">
      <WebSceneView />
      <Info />
    </div>
  </div>
);

export default App;
