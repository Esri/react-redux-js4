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
import { bindActionCreators } from 'redux';

import { initScene } from '../reducer/webscene/actions';

export class WebSceneView extends React.Component {
  componentDidMount() {
    if (this.props.websceneId) {
      this.props.init(this.sceneView, this.props.websceneId);
    }
  }

  render() {
    return (
      <div className="websceneview" ref={ref => (this.sceneView = ref)} />
    );
  }
}

WebSceneView.propTypes = {
  init: PropTypes.func.isRequired,
  websceneId: PropTypes.string,
};

WebSceneView.defaultProps = {
  websceneId: null,
};

function mapDispatchToProps(dispatch) {
  return {
    init: bindActionCreators(initScene, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(WebSceneView);
