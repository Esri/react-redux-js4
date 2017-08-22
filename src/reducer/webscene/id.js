import { INIT_SCENE } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_SCENE:
      return action.id || initialState;
    default:
      return state;
  }
};
