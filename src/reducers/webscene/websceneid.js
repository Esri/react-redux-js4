import { SET_WEBSCENE } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_WEBSCENE:
        return state === action.websceneid ? state : action.websceneid;
    default:
      return state;
  }
}
