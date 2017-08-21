import { SET_ENVIRONMENT } from './actions';

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENVIRONMENT:
      return action.UTCOffset;
    default:
      return state;
  }
};
