import { SET_SCENEVIEW } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_SCENEVIEW:
        return action.sceneView
    default:
      return state;
  }
}
