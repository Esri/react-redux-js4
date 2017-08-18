import { SET_ENVIRONMENT, SET_DATE } from './actions';

const initialState = new Date(Date.UTC(2017, 3, 15, 12, 0));

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ENVIRONMENT:
    case SET_DATE:
      return new Date(action.date) || initialState;
    default:
      return state;
  }
};
