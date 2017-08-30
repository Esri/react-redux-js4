import * as types from '../../constants/action-types';


export default function initScene(container, id, name) {
  return {
    type: types.INIT_SCENE,
    container,
    id,
    name,
  };
}
