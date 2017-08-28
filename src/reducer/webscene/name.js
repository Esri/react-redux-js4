import { INIT_SCENE } from '../../constants/action-types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_SCENE:
      return action.name || initialState;
    default:
      return state;
  }
};
