/* Copyright 2017 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
