import { SET_SCENE } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_SCENE:
        return state === action.websceneid ? state : action.websceneid;
    default:
      return state;
  }
}
