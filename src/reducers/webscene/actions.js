export const LOAD_SCENE = 'LOAD_SCENE';
export const SET_SCENE = 'SET SCENE';

/*export function loadWebScene(container, websceneid) {
	return dispatch => {
		var webscene = new WebScene({
		    portalItem: { id: websceneid }
		  });

		var view = new SceneView({
			container: container,
			map: webscene
	    });

	    webscene.then(() => {
	    	dispatch(setScene(websceneid, webscene, view));
	    });
	}
}*/


export function setScene(websceneid, webscene, view) {
	return {
		type: SET_SCENE,
		websceneid,
		webscene,
		view
	}
}
