import { SET_USER_WEBSCENES } from './actions';

const initialState = [];

const setUserWebscenes = (_websceneItems_) => {
  var websceneItems = [];
  for (let item of _websceneItems_) {
    websceneItems.push({
      id: item.id,
      title: item.title
    });
  }
  return websceneItems;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_WEBSCENES:
    	return setUserWebscenes(action.websceneItems);
    default:
    	return state;
  }
}
