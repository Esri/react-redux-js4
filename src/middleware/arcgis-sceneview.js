import esriConfig from 'esri/config'; // eslint-disable-line
import SceneView from 'esri/views/SceneView'; // eslint-disable-line
import WebScene from 'esri/WebScene'; // eslint-disable-line

import {
  INIT_SCENE,
  SELECTION_SET,
  SELECTION_TOGGLE,
  SELECTION_RESET,
  SET_ENVIRONMENT,
  SET_DATE,
  SET_SHADOWS,
} from '../constants/action-types';


import { registerClickEvent } from './arcgis-sceneview/interaction';
import { updateHighlights } from './arcgis-sceneview/highlights';
import { setEnvironment } from './arcgis-sceneview/environment';

esriConfig.request.corsEnabledServers.push('a.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('b.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('c.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('d.tile.stamen.com');


const arcgis = {};

window.arcgis = arcgis;


const arcgisMiddleWare = store => next => (action) => {
  switch (action.type) {
    /**
     * Initialize scene view on a viewport container.
     */
    case INIT_SCENE: {
      if (!action.id || !action.container) break;

      // if sceneview container is already initialized, just add it back to the DOM.
      if (arcgis.container) {
        action.container.appendChild(arcgis.container);
        break;
      }

      // Otherwise, create a new container element and a new scene view.
      arcgis.container = document.createElement('DIV');
      action.container.appendChild(arcgis.container);
      arcgis.sceneView = new SceneView({ container: arcgis.container });

      registerClickEvent(arcgis.sceneView, store);

      // Initialize web scene
      const webScene = new WebScene({ portalItem: { id: action.id } });
      arcgis.sceneView.map = webScene;

      // When initialized...
      return webScene
        .then(() => {
          webScene.layers.items.forEach(layer => (layer.popupEnabled = false));

          next({ ...action, name: webScene.portalItem.title });

          return arcgis.sceneView.whenLayerView(webScene.layers.getItemAt(0));

          /* return Promise.all(
            webScene.layers.items
              .map(layer => arcgis.sceneView.whenLayerView(layer)),
          );*/
        })
        .then(() => {
          // Update the environment settings (either from the state or from the scene)
          const webSceneEnvironment = arcgis.sceneView.map.initialViewProperties.environment;
          const date = new Date(webSceneEnvironment.lighting.date);
          date.setUTCHours(date.getUTCHours() + webSceneEnvironment.lighting.displayUTCOffset);

          const { environment } = store.getState();

          store.dispatch({
            type: SET_ENVIRONMENT,
            date: environment.date !== null ? environment.date : date,
            UTCOffset: webSceneEnvironment.lighting.displayUTCOffset,
            shadows: environment.shadows !== null ?
              environment.shadows :
              webSceneEnvironment.lighting.directShadowsEnabled,
          });

          // Update the selection highlights
          const { selection } = store.getState();
          updateHighlights(arcgis.sceneView, selection);

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
      const { selection } = store.getState();
      updateHighlights(arcgis.sceneView, selection);

      break;
    }

    case SET_ENVIRONMENT:
    case SET_DATE:
    case SET_SHADOWS: {
      next(action);

      // Update needs to happen after the action dispatched, to have the correct environment.
      const { environment: { date, utcoffset, shadows } } = store.getState();
      const newDate = new Date(date);
      newDate.setUTCHours(newDate.getUTCHours() - utcoffset);
      setEnvironment(arcgis.sceneView, newDate, utcoffset, shadows);
      break;
    }

    default: {
      next(action);
      break;
    }
  }

  return Promise.resolve();
};


export default arcgisMiddleWare;
