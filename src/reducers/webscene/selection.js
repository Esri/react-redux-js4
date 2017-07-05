import { SELECTION_ADD, SELECTION_REMOVE, SELECTION_RESET } from './actions';

const initialState = [];

const addItem = (array, OID) => {
    let newArray = array.slice();
    newArray.push(OID);
    return newArray;
};

const hasItem = (array, OID) => {
	return array.indexOf(OID) > -1;
};

const removeItem = (array, OID) => {
	let newArray = array.slice();
	newArray.splice(array.indexOf(OID), 1);
	return newArray;
};

/*const parseAttributesToArray = attributesObject => {
	let attributesArray = [];
	for (var key in attributesObject) {
	  if (attributesObject.hasOwnProperty(key)) {
	      attributesArray.push({ key, value: attributesObject[key]});
	  }
	};
	return attributesArray;
};*/


export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTION_ADD:
    	return addItem(state, action.OID);
	case SELECTION_REMOVE:
		return removeItem(state, action.OID);
    case SELECTION_RESET:
    	return initialState;
    default:
      return state;
  }
}
