import React from 'react';

import Header from './header';
import WebSceneView from './webscene';
import Info from './info';
import TimeNav from './timenav';


const App = () => (
  <div className="container">
    <Header />
    <div className="app-main">
      <WebSceneView />
      <Info />
      <TimeNav />
    </div>
  </div>
);

export default App;
