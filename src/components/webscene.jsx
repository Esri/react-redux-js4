import React from 'react';
import PropTypes from 'prop-types';

import { loadWebscene } from '../reducers/webscene/actions';


class WebSceneView extends React.Component {
    static propTypes = {
        websceneid: PropTypes.string.isRequired,
        store: PropTypes.object.isRequired
    };

    componentDidMount() {
        this.props.store.dispatch(loadWebscene(this.props.websceneid, this.refs.sceneView));
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



                  /*var query = new Query({
                    objectId: graphic.attributes.OID,
                    outFields: ["*"]
                  });*/

                  /*sceneLayerView.queryFeatures(query)
                    .then(result => {
                      console.log(result.features[0].attributes);
                      var { selection } = this.props.store.getState();
                      if (hasItem(selection.items, graphic.attributes.OID)) {
                        this.props.store.dispatch(selectionRemove(graphic.attributes.OID));
                      } else {
                        this.props.store.dispatch(selectionAdd(graphic.attributes.OID, result.features[0].attributes, sceneLayerView.highlight(graphic)));
                      }
                      var state = this.props.store.getState();
                    })
                    .otherwise(err => {
                      console.log(err);
                    })*/
