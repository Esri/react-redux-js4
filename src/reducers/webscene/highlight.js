import { SET_HIGHLIGHT } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_HIGHLIGHT:
        return action.highlight || initialState;
    default:
      return state;
  }
}
