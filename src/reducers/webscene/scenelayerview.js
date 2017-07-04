import { SET_SCENELAYERVIEW } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_SCENELAYERVIEW:
        return action.sceneLayerView || initialState;
    default:
      return state;
  }
}
