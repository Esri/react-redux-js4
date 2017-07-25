import esriConfig from 'esri/config'; // eslint-disable-line
import SceneView from 'esri/views/SceneView'; // eslint-disable-line
import WebScene from 'esri/WebScene'; // eslint-disable-line

import {
  INIT_SCENE_VIEW,
  LOAD_WEB_SCENE,
  VIEW_CHANGE,
  SELECTION_SET,
  SELECTION_TOGGLE,
  SELECTION_RESET,
} from '../reducer/webscene/actions';

esriConfig.request.corsEnabledServers.push('a.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('b.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('c.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('d.tile.stamen.com');

const arcgis = {};

const registerInteractionEvent = (view, store) => {
  view.watch('interacting, scale, zoom', () => {
    store.dispatch({
      type: VIEW_CHANGE,
      view: {
        interacting: view.interacting,
        zoom: view.zoom,
        scale: view.scale,
      },
    });
  });
};

const registerClickEvent = (view, store) => {
  view.on('click', (event) => {
    const multiSelect = event.native.shiftKey || event.native.ctrlKey || event.native.metaKey;

    view.hitTest(event.screenPoint)
      .then((response) => {
        if (response.results && response.results[0] && response.results[0].graphic) {
          if (multiSelect) {
            store.dispatch({
              type: SELECTION_TOGGLE,
              OID: response.results[0].graphic.attributes[arcgis.sceneLayer.objectIdField],
            });
          } else {
            store.dispatch({
              type: SELECTION_SET,
              OIDArray: [response.results[0].graphic.attributes[arcgis.sceneLayer.objectIdField]],
            });
          }
        } else if (!multiSelect) {
          store.dispatch({ type: SELECTION_RESET });
        }
      });
  });
};

const updateHighlight = (selection) => {
  if (arcgis.highlight) arcgis.highlight.remove();
  if (arcgis.sceneLayerView) arcgis.highlight = arcgis.sceneLayerView.highlight(selection);
};


const arcgisMiddleWare = store => next => (action) => {
  switch (action.type) {
    /**
     * Initialize scene view on a viewport container.
     */
    case INIT_SCENE_VIEW: {
      arcgis.sceneView = new SceneView({ container: action.container });

      registerInteractionEvent(arcgis.sceneView, store);
      registerClickEvent(arcgis.sceneView, store);

      next(action);
      break;
    }

    /**
     * Load web scene and register interaction listeners.
     */
    case LOAD_WEB_SCENE: {
      if (!arcgis.sceneView) break;

      store.dispatch({ type: SELECTION_RESET });

      // Initialize web scene
      arcgis.webScene = new WebScene({ portalItem: { id: action.websceneId } });
      arcgis.sceneView.map = arcgis.webScene;

      // When initialized...
      return arcgis.webScene
        .then(() => {
          arcgis.sceneLayer = arcgis.webScene.layers.getItemAt(0);
          arcgis.sceneLayer.popupEnabled = false;

          return arcgis.sceneView.whenLayerView(arcgis.sceneLayer);
        })
        .then((sceneLayerView) => {
          arcgis.sceneLayerView = sceneLayerView;

          // add the webscene name to the action and dispatch
          const newAction = Object.assign({ ...action, name: arcgis.webScene.portalItem.title });
          next(newAction);

          return Promise.resolve();
        });
    }

    /**
     * Update highlights and reports on selection change.
     */
    case SELECTION_SET:
    case SELECTION_RESET:
    case SELECTION_TOGGLE: {
      next(action);

      // Update needs to happen after the action dispatched, to have the correct selection.
      updateHighlight(store.getState().webscene.selection);

      break;
    }

    default: {
      next(action);
      break;
    }
  }

  return null;
};


export default arcgisMiddleWare;
