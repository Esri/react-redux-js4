import SceneView from 'esri/views/SceneView';
import WebScene from 'esri/WebScene';

export const SET_WEBSCENE = 'SET_WEBSCENE';
export const SET_HIGHLIGHT = 'SET_HIGHLIGHT';
export const SELECTION_ADD = 'SELECTION_ADD';
export const SELECTION_REMOVE = 'SELECTION_REMOVE';
export const SELECTION_RESET = 'SELECTION_RESET';
export const VIEW_CHANGE = 'VIEW_CHANGE';


const hasItem = (array, OID) => {
  return array.indexOf(OID) > -1;
};


export function clickScreenPoint(screenPoint, multi) {
    return (dispatch, getState) => {
    	var { webscene : { view } } = getState();
        // reset current selection
        if (!multi) {
            dispatch(selectionReset());
            dispatch(highlight());
        }

        view.hitTest(screenPoint)
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

export function loadWebscene(websceneid, container) {
    return (dispatch, getState) => {
    	var { webscene : { view }} = getState();
    	var webscene = new WebScene({ portalItem: { id: websceneid } });

    	if (view) {
    		view.map = webscene;
    	} else {	
        	view = new SceneView({ container, map: webscene });
    	}

        webscene.then(() => {
            var sceneLayer = webscene.layers.getItemAt(0);
            sceneLayer.popupEnabled = false;

            view.whenLayerView(sceneLayer)
                .then((sceneLayerView) => {
                    window._debug = { webscene, view, sceneLayer, sceneLayerView };
                    dispatch(setWebscene(websceneid, webscene, view, sceneLayer, sceneLayerView));
                });

            // event handlers
            view.on('click', event => dispatch(clickScreenPoint(event.screenPoint, event.native.shiftKey || event.native.ctrlKey || event.native.metaKey)));
            view.watch('interacting, scale, zoom', () => dispatch(viewChange(view)));
        });
    }
};

export function setWebscene(websceneid, webscene, view, scenelayer, scenelayerview) {
	return {
		type: SET_WEBSCENE,
		websceneid,
		webscene,
		view,
		scenelayer,
		scenelayerview
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
    dispatch(setHighlight(webscene.scenelayerview.highlight(oidArray)));
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


