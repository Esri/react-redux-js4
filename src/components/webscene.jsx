import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initSceneView } from '../reducer/webscene/actions';

export class WebSceneView extends React.Component {
  componentDidMount() {
    this.props.init(this.sceneView);
  }

  render() {
    return (
      <div className="websceneview" ref={ref => (this.sceneView = ref)} />
    );
  }
}

WebSceneView.propTypes = {
  init: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    init: bindActionCreators(initSceneView, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(WebSceneView);
