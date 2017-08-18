import { SET_ENVIRONMENT, SET_SHADOWS } from './actions';

const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENVIRONMENT:
    case SET_SHADOWS:
      return action.shadows;
    default:
      return state;
  }
};
