import { SET_ENVIRONMENT, SET_DATE } from '../../constants/action-types';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENVIRONMENT:
    case SET_DATE:
      return new Date(action.date) || initialState;
    default:
      return state;
  }
};
