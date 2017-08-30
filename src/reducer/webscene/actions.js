import * as types from '../../constants/action-types';


// eslint-disable-next-line
export function initScene(container, id, name) {
  return {
    type: types.INIT_SCENE,
    container,
    id,
    name,
  };
}
