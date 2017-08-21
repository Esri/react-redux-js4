import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './header/header';
import WebSceneView from './webscene';
import TimeNav from './widgets/time-nav';
import ShadowsNav from './widgets/shadows-nav';


const App = ({ websceneId, name }) => (
  <div className="container">
    <Header />
    <div className="app-main">
      <WebSceneView websceneId={websceneId} />
      {name && <div className="app-widgets">
        <TimeNav />
        <ShadowsNav />
      </div>}
    </div>
  </div>
);

App.propTypes = {
  name: PropTypes.string,
  websceneId: PropTypes.string,
};

App.defaultProps = {
  name: null,
  websceneId: null,
};

const mapStateToProps = ({ webscene: { name } }) => ({
  name,
});

export default connect(mapStateToProps)(App);
