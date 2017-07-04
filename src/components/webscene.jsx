import React from 'react';
import PropTypes from 'prop-types';

import SceneView from 'esri/views/SceneView';
import WebScene from 'esri/WebScene';
import UniqueValueRenderer from 'esri/renderers/UniqueValueRenderer';
import SimpleRenderer from 'esri/renderers/SimpleRenderer';
import MeshSymbol3D from 'esri/symbols/MeshSymbol3D';
import FillSymbol3DLayer from 'esri/symbols/FillSymbol3DLayer';
import Query from 'esri/tasks/support/Query';

import { setWebscene, setSceneLayerView } from '../reducers/webscene/actions';
import { viewChange } from '../reducers/view/actions'
import { selectionChange, selectionAdd, selectionRemove, selectionReset } from '../reducers/selection/actions';


const hasItem = (array, OID) => {
  return array.indexOf(OID) > -1;
};

class WebSceneView extends React.Component {
    static propTypes = {
        websceneid: PropTypes.string.isRequired,
        store: PropTypes.object.isRequired
    };

    componentDidMount() {
        var webscene = new WebScene({
            portalItem: { id: this.props.websceneid }
        });

        var view = new SceneView({
            container: this.refs.sceneView,
            map: webscene
        });

        webscene.then(() => {
            var sceneLayer = webscene.layers.getItemAt(0);
            sceneLayer.popupEnabled = false;

            view.whenLayerView(sceneLayer)
                .then((sceneLayerView) => {
                    window._debug = { webscene, view, sceneLayer, sceneLayerView };
                    this.attachMouseFunctions(webscene, view, sceneLayer, sceneLayerView);
                    this.props.store.dispatch(setSceneLayerView(sceneLayerView));
                });

            view.watch('interacting, scale, zoom', () => {
                this.props.store.dispatch(viewChange(view));
            });

            this.props.store.dispatch(setWebscene(websceneid, webscene, view));
        });
    }

    componentWillUnMount() {
        //...
    }

    attachMouseFunctions(webscene, view, sceneLayer, sceneLayerView) {
        view.on('click', event => {
            // reset current selection
            if (!(event.native.shiftKey || event.native.ctrlKey || event.native.metaKey)) {
                this.props.store.dispatch(selectionReset());
                this.highlight && this.highlight.remove();
            }

            view.hitTest(event.screenPoint)
              .then(response => {
                if (response.results[0].graphic) {
                    var { graphic : { attributes : { OID }}} = response.results[0];

                    if (hasItem(this.props.store.getState().selection.items, OID)) {
                        this.props.store.dispatch(selectionRemove(OID));
                        this.highlight && this.highlight.remove();
                        this.highlight = sceneLayerView.highlight(this.props.store.getState().selection.items);

                    } else {
                        this.props.store.dispatch(selectionAdd(OID));
                        this.highlight && this.highlight.remove();
                        this.highlight = sceneLayerView.highlight(this.props.store.getState().selection.items);
                    }

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
                }
              });
          })
    }
  
    render() {
        return (
            <div className="sceneView" ref="sceneView"></div>
        );
    }
}

export default WebSceneView;
