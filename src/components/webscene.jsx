import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { initSceneView } from '../reducer/webscene/actions';


class WebSceneView extends React.Component {

    componentDidMount() {
        this.props.init(this.refs.sceneView);
    }
  
    render() {
        return (
            <div className="websceneview" ref="sceneView"></div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return {
        init: bindActionCreators(initSceneView, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(WebSceneView);
