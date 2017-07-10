import esriConfig from 'esri/config';
import SceneView from 'esri/views/SceneView';
import WebScene from 'esri/WebScene';

import { viewChange, selectionAdd, selectionRemove, selectionReset } from '../reducers/webscene/actions';

esriConfig.request.corsEnabledServers.push('a.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('b.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('c.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('d.tile.stamen.com');


const store = {};


export function initSceneView(container) {
  return (dispatch) => {
    if (store.sceneView) return;

    store.sceneView = new SceneView({ container });
  }
}

export function loadWebscene(webSceneId) {
  return (dispatch) => {
    if (!store.sceneView) return;

    dispatch(selectionReset());

    store.webScene = new WebScene({ portalItem: { id: webSceneId } });
    store.sceneView.map = store.webScene;

    store.webScene.then(() => {
      store.sceneLayer = store.webScene.layers.getItemAt(0);
      store.sceneLayer.popupEnabled = false;

      store.sceneView.whenLayerView(store.sceneLayer)
        .then((sceneLayerView) => {
            store.sceneLayerView = sceneLayerView;
        });

      // event handlers
      store.sceneView.watch('interacting, scale, zoom', () => dispatch(viewChange({
        interacting: store.sceneView.interacting,
        zoom: store.sceneView.zoom,
        scale: store.sceneView.scale
      })));

      store.sceneView.on('click', event => dispatch(clickScreenPoint(event.screenPoint, event.native.shiftKey || event.native.ctrlKey || event.native.metaKey)));
    });
  }
};

const hasItem = (array, OID) => {
  return array.indexOf(OID) > -1;
};

export function clickScreenPoint(screenPoint, multi) {
  return (dispatch, getState) => {
    if (!multi) {
      dispatch(selectionReset());
      dispatch(highlight());
    }

    store.sceneView.hitTest(screenPoint)
      .then(response => {
        if (response.results && response.results[0] && response.results[0].graphic) {
            var { graphic : { attributes : { OID }}} = response.results[0];

            if (hasItem(getState().webscene.selection, OID)) {
                dispatch(selectionRemove(OID));
            } else {
                dispatch(selectionAdd(OID));
            }
            dispatch(highlight(getState().webscene.selection));
        }
      });
    }
  };


export function highlight(oidArray) {
  return (dispatch) => {
    store.highlight && store.highlight.remove();
    store.highlight = store.sceneLayerView.highlight(oidArray);
  }
};
