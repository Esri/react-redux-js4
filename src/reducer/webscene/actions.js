import * as types from '../../constants/action-types';


export function initScene(container, id, name) {
  return {
    type: types.INIT_SCENE,
    container,
    id,
    name,
  };
}
