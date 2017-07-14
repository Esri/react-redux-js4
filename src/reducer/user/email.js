import { GET_IDENTITY } from './actions';

const initialState = null;

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_IDENTITY:
      return action.email || initialState;
    default:
      return state;
  }
}
