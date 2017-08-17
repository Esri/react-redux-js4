export const INIT_SCENE_VIEW = 'INIT_SCENE_VIEW';
export const LOAD_WEB_SCENE = 'LOAD_WEB_SCENE';
export const VIEW_CHANGE = 'VIEW_CHANGE';

export const SELECTION_SET = 'SELECTION_SET';
export const SELECTION_TOGGLE = 'SELECTION_TOGGLE';
export const SELECTION_RESET = 'SELECTION_RESET';

export const INIT_DATE = 'INIT_DATE';
export const SET_DATE = 'SET_DATE';

export function initSceneView(container) {
  return {
    type: INIT_SCENE_VIEW,
    container,
  };
}

export function loadWebScene(websceneId, name) {
  return {
    type: LOAD_WEB_SCENE,
    websceneId,
    name,
  };
}

export function viewChange(view) {
  return {
    type: VIEW_CHANGE,
    view,
  };
}

export function selectionSet(layer, OID) {
  return {
    type: SELECTION_SET,
    layer,
    OID,
  };
}

export function selectionToggle(layer, OID) {
  return {
    type: SELECTION_TOGGLE,
    layer,
    OID,
  };
}

export function selectionReset() {
  return {
    type: SELECTION_RESET,
  };
}

export function initDate(date) {
  return {
    type: INIT_DATE,
    date,
  };
}

export function setDate(date) {
  return {
    type: SET_DATE,
    date,
  };
}
