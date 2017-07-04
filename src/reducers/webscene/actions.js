export const SET_WEBSCENE = 'SET_WEBSCENE';
export const SET_SCENELAYERVIEW = 'SET_SCENELAYERVIEW';
//export const SET_HIGHLIGHT = 'SET_HIGHLIGHT';


export function setWebscene(websceneid, webscene, view) {
	return {
		type: SET_WEBSCENE,
		websceneid,
		webscene,
		view
	}
};

export function setSceneLayerView(sceneLayerView) {
	return {
		type: SET_SCENELAYERVIEW,
		sceneLayerView
	}
};

/*export function setHighlight(highlight) {
	return {
		type: SET_HIGHLIGHT,
		highlight
	}
};

export function highlight(oidArray) {
  return (dispatch, getState) => {
  	console.log('bla');
    console.log(getState());
    dispatch(setHighlight('bla'));
  }
};*/
