import { INIT_DATE, SET_DATE } from './actions';

const initialState = new Date(2017, 3, 15, 12, 0);

export default (state = initialState, action) => {
  switch (action.type) {
    case INIT_DATE:
    case SET_DATE:
      return new Date(action.date) || initialState;
    default:
      return state;
  }
};
