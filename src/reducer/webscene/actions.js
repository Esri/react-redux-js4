export const INIT_SCENE_VIEW = 'INIT_SCENE_VIEW';
export const LOAD_WEB_SCENE = 'LOAD_WEB_SCENE';

export function initSceneView(container) {
  return {
    type: INIT_SCENE_VIEW,
    container,
  };
}

export function loadWebScene(id, name) {
  return {
    type: LOAD_WEB_SCENE,
    id,
    name,
  };
}
