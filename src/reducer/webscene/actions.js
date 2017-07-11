export const INIT_SCENE_VIEW = 'INIT_SCENE_VIEW'
export const LOAD_WEB_SCENE = 'LOAD_WEB_SCENE'
export const SELECTION_SET = 'SELECTION_SET'
export const SELECTION_TOGGLE = 'SELECTION_TOGGLE'
export const SELECTION_RESET = 'SELECTION_RESET'
export const VIEW_CHANGE = 'VIEW_CHANGE'


export function initSceneView(container) {
  return { 
    type: INIT_SCENE_VIEW,
    container
  }
}

export function loadWebScene(id) {
  return { 
    type: LOAD_WEB_SCENE,
    id
  }
}

export function selectionSet(OIDArray) {
  return { 
    type: SELECTION_SET, 
    OIDArray
  }
}

export function selectionToggle(OID) {
  return { 
    type: SELECTION_TOGGLE, 
    OID
  }
}

export function selectionReset() {
  return { 
  	type: SELECTION_RESET
  }
}

export function viewChange(view) {
  return { 
  	type: VIEW_CHANGE, 
  	view 
  }
}
