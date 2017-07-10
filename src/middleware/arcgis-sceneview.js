import esriConfig from 'esri/config';
import SceneView from 'esri/views/SceneView';
import WebScene from 'esri/WebScene';

import { INIT_SCENE_VIEW, LOAD_WEB_SCENE, VIEW_CHANGE, SELECTION_TOGGLE, SELECTION_RESET } from '../reducers/webscene/actions';

esriConfig.request.corsEnabledServers.push('a.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('b.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('c.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('d.tile.stamen.com');


const arcgis = {};


const arcgisMiddleWare = store => next => action => {

  switch (action.type) {

    case INIT_SCENE_VIEW:

      arcgis.sceneView = new SceneView({ container: action.container });
      return next(action);

    case LOAD_WEB_SCENE:

      if (!arcgis.sceneView) return;

      arcgis.webScene = new WebScene({ portalItem: { id: action.id } });
      arcgis.sceneView.map = arcgis.webScene;

      arcgis.webScene.then(() => {
        arcgis.sceneLayer = arcgis.webScene.layers.getItemAt(0);
        arcgis.sceneLayer.popupEnabled = false;

        arcgis.sceneView.whenLayerView(arcgis.sceneLayer)
          .then((sceneLayerView) => {
              arcgis.sceneLayerView = sceneLayerView;
              registerInteractionEvent(arcgis.sceneView, store);
              registerClickEvent(arcgis.sceneView, store);
              next(action);
          });
      });
      return;

    case SELECTION_RESET:
    case SELECTION_TOGGLE:
    
      next(action);
      return updateHighlight(store.getState().webscene.selection);

    default:
      return next(action);
  }
}

const registerInteractionEvent = (view, store) => {
  view.watch('interacting, scale, zoom', () => {
    store.dispatch({
      type: VIEW_CHANGE,
      view: {
        interacting: view.interacting,
        zoom: view.zoom,
        scale: view.scale
      }
    }
  )});
}

const registerClickEvent = (view, store) => {
  view.on('click', event => {
    if (!event.native.shiftKey && !event.native.ctrlKey && !event.native.metaKey) {
      store.dispatch({
        type: SELECTION_RESET
      });
    }

    view.hitTest(event.screenPoint)
      .then(response => {
        if (response.results && response.results[0] && response.results[0].graphic) {
          store.dispatch({
            type: SELECTION_TOGGLE,
            OID: response.results[0].graphic.attributes.OID
          });
        }
      });
  });
}

const updateHighlight = (selection) => {
  arcgis.highlight && arcgis.highlight.remove();
  arcgis.highlight = arcgis.sceneLayerView.highlight(selection);
}


export default arcgisMiddleWare;
