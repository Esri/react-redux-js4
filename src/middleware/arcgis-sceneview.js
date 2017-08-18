import esriConfig from 'esri/config'; // eslint-disable-line
import SceneView from 'esri/views/SceneView'; // eslint-disable-line
import WebScene from 'esri/WebScene'; // eslint-disable-line

import { INIT_SCENE_VIEW, LOAD_WEB_SCENE } from '../reducer/webscene/actions';
import { SELECTION_SET, SELECTION_TOGGLE, SELECTION_RESET } from '../reducer/selection/actions';
import { SET_ENVIRONMENT, SET_DATE, SET_SHADOWS } from '../reducer/environment/actions';

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
    case INIT_SCENE_VIEW: {
      next(action);
      arcgis.sceneView = new SceneView({ container: action.container });

      registerClickEvent(arcgis.sceneView, store);

      if (action.id) {
        store.dispatch({
          type: LOAD_WEB_SCENE,
          id: action.id,
        });
      }
      break;
    }

    /**
     * Load web scene and register interaction listeners.
     */
    case LOAD_WEB_SCENE: {
      if (!arcgis.sceneView) break;

      store.dispatch({ type: SELECTION_RESET });

      // Initialize web scene
      const webScene = new WebScene({ portalItem: { id: action.id } });
      arcgis.sceneView.map = webScene;

      // When initialized...
      return webScene
        .then(() => {
          webScene.layers.items.forEach(layer => (layer.popupEnabled = false));

          next({ ...action, name: webScene.portalItem.title });

          const environment = arcgis.sceneView.map.initialViewProperties.environment;
          const UTCOffset = environment.lighting.displayUTCOffset;
          const date = new Date(environment.lighting.date);
          date.setUTCHours(date.getUTCHours() + UTCOffset);

          store.dispatch({
            type: SET_ENVIRONMENT,
            date,
            UTCOffset,
            shadows: environment.lighting.directShadowsEnabled,
          });

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

  return null;
};


export default arcgisMiddleWare;
