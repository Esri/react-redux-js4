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

import {
  SET_ENVIRONMENT,
  SET_DATE,
} from '../reducer/environment/actions';

esriConfig.request.corsEnabledServers.push('a.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('b.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('c.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('d.tile.stamen.com');

const arcgis = {};
const highlights = [];

window.arcgis = arcgis;

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
        const graphic = response.results && response.results[0] && response.results[0].graphic;
        if (graphic) {
          store.dispatch({
            type: multiSelect ? SELECTION_TOGGLE : SELECTION_SET,
            layer: graphic.layer.id,
            OID: graphic.attributes[graphic.layer.objectIdField],
          });
        } else if (!multiSelect) {
          store.dispatch({ type: SELECTION_RESET });
        }
      });
  });
};

const updateHighlight = (selection) => {
  while (highlights.length) {
    highlights[0].remove();
    highlights.splice(0, 1);
  }

  arcgis.sceneView.layerViews.items.forEach(layerView =>
    highlights.push(
      layerView.highlight(
        selection
          .filter(item => item.layer === layerView.layer.id)
          .map(item => item.OID),
        ),
      ),
  );
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
      const webScene = new WebScene({ portalItem: { id: action.websceneId } });
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
      updateHighlight(store.getState().webscene.selection);

      break;
    }

    case SET_ENVIRONMENT:
    case SET_DATE: {
      next(action);
      const { environment: { date, utcoffset, shadows } } = store.getState();
      const newDate = new Date(date);
      newDate.setUTCHours(newDate.getUTCHours() - utcoffset);
      arcgis.sceneView.environment.lighting.date = newDate;
      arcgis.sceneView.environment.lighting.displayUTCOffset = utcoffset;
      arcgis.sceneView.environment.lighting.directShadowsEnabled = shadows;
      next(action);
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
