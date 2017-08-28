import { SET_ENVIRONMENT } from '../../constants/action-types';

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENVIRONMENT:
      return action.UTCOffset;
    default:
      return state;
  }
};
