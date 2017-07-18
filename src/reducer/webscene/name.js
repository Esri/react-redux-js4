import { LOAD_WEB_SCENE } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_WEB_SCENE:
      return action.name || initialState;
    default:
      return state;
  }
};
