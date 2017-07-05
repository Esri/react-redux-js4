import { SET_USER_WEBSCENES } from './actions';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_WEBSCENES:
    console.log(action.websceneItems);
      return action.websceneItems || initialState;
    default:
      return state;
  }
}
