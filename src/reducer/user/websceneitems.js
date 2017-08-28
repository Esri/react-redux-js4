import { SET_USER_WEBSCENES } from '../../constants/action-types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_WEBSCENES:
      return action.websceneItems.map(item => ({ id: item.id, title: item.title }));
    default:
      return state;
  }
};
