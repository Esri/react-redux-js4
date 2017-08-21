import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initSceneView } from '../reducer/webscene/actions';

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
    init: bindActionCreators(initSceneView, dispatch),
  };
}

export default connect(null, mapDispatchToProps)(WebSceneView);
