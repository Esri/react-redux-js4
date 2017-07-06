import esriConfig from 'esri/config';
import SceneView from 'esri/views/SceneView';
import WebScene from 'esri/WebScene';

export const SET_SCENEVIEW = 'SET_SCENEVIEW';
export const SET_WEBSCENE = 'SET_WEBSCENE';
export const SET_HIGHLIGHT = 'SET_HIGHLIGHT';
export const SELECTION_ADD = 'SELECTION_ADD';
export const SELECTION_REMOVE = 'SELECTION_REMOVE';
export const SELECTION_RESET = 'SELECTION_RESET';
export const VIEW_CHANGE = 'VIEW_CHANGE';

//esriConfig.request.corsEnabledServers.push('tile.stamen.com');
esriConfig.request.corsEnabledServers.push('a.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('b.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('c.tile.stamen.com');
esriConfig.request.corsEnabledServers.push('d.tile.stamen.com');

const hasItem = (array, OID) => {
  return array.indexOf(OID) > -1;
};


export function initSceneView(container) {
    return (dispatch, getState) => {
        var { webscene : { sceneView }} = getState();
        if (sceneView) return;

        sceneView = new SceneView({ container });

        dispatch(setSceneView(sceneView));
    }
}


export function clickScreenPoint(screenPoint, multi) {
    return (dispatch, getState) => {
    	var { webscene : { sceneView } } = getState();
        // reset current selection
        if (!multi) {
            dispatch(selectionReset());
            dispatch(highlight());
        }

        sceneView.hitTest(screenPoint)
			.then(response => {
				if (response.results[0].graphic) {
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

export function loadWebscene(webSceneId) {
    return (dispatch, getState) => {
    	var { webscene : { sceneView }} = getState();
        if (!sceneView) return;

    	var webScene = new WebScene({ portalItem: { id: webSceneId } });

    	sceneView.map = webScene;

        webScene.then(() => {
            var sceneLayer = webScene.layers.getItemAt(0);
            sceneLayer.popupEnabled = false;

            sceneView.whenLayerView(sceneLayer)
                .then((sceneLayerView) => {
                    window._debug = { webScene, sceneView, sceneLayer, sceneLayerView };
                    dispatch(setWebscene(webSceneId, webScene, sceneLayer, sceneLayerView));
                });

            // event handlers
            sceneView.on('click', event => dispatch(clickScreenPoint(event.screenPoint, event.native.shiftKey || event.native.ctrlKey || event.native.metaKey)));
            sceneView.watch('interacting, scale, zoom', () => dispatch(viewChange(sceneView)));
        });
    }
};


export function setSceneView(sceneView) {
    return {
        type: SET_SCENEVIEW,
        sceneView
    }
};


export function setWebscene(webSceneId, webScene, sceneLayer, sceneLayerView) {
	return {
		type: SET_WEBSCENE,
		webSceneId,
		webScene,
		sceneLayer,
		sceneLayerView
	}
};


export function setHighlight(highlight) {
	return {
		type: SET_HIGHLIGHT,
		highlight
	}
};

export function highlight(oidArray) {
  return (dispatch, getState) => {
  	var { webscene } = getState();
  	webscene.highlight && webscene.highlight.remove();
    dispatch(setHighlight(webscene.sceneLayerView.highlight(oidArray)));
  }
};

export function selectionAdd(OID) {
  return { 
  	type: SELECTION_ADD, 
  	OID
  };
};

export function selectionRemove(OID) {
  return { 
  	type: SELECTION_REMOVE, 
  	OID
  };
};

export function selectionReset() {
  return { 
  	type: SELECTION_RESET
  };
};

export function viewChange(view) {
  return { 
  	type: VIEW_CHANGE, 
  	view 
  };
}


