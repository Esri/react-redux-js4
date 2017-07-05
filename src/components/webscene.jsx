import React from 'react';
import PropTypes from 'prop-types';

import { initSceneView } from '../reducers/webscene/actions';


class WebSceneView extends React.Component {
    static propTypes = {
        store: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.store.dispatch(initSceneView(this.refs.sceneView));
    }

    componentWillUnMount() {
        //...
    }
  
    render() {
        return (
            <div className="websceneview" ref="sceneView"></div>
        );
    }
}

export default WebSceneView;
