export const INIT_SCENE = 'INIT_SCENE';

export function initScene(container, id, name) {
  return {
    type: INIT_SCENE,
    container,
    id,
    name,
  };
}
