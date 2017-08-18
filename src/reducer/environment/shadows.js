import { SET_ENVIRONMENT } from './actions';

const initialState = true;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENVIRONMENT:
      return action.shadows;
    default:
      return state;
  }
};
