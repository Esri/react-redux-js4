import { SELECTION_CHANGE, SELECTION_ADD, SELECTION_REMOVE, SELECTION_RESET } from './actions';

const initialState = [];

const addItem = (array, item) => {
    let newArray = array.slice();
    newArray.push(item);
    return newArray;
};

const hasItem = (array, OID) => {
	for (let i=0; i<array.length; i++) {
		if (array[i].OID === OID) return true;
	}
	return false;
};

const removeItem = (array, OID) => {
	let newArray = array.slice();
	for (let i=0; i<newArray.length; i++) {
		if (newArray[i].OID === OID) {
			newArray[i].highlight.remove();
			newArray.splice(i, 1);
		}
	}
	return newArray;
};

const parseAttributesToArray = attributesObject => {
	let attributesArray = [];
	for (var key in attributesObject) {
	  if (attributesObject.hasOwnProperty(key)) {
	      attributesArray.push({ key, value: attributesObject[key]});
	  }
	};
	return attributesArray;
};

const parseScenarios = bitMaskInt => {
	if (!bitMaskInt) return [];

	var bitMask = bitMaskInt.toString(2),
		scenarios = [];

	for (let i=0; i<bitMask.length; i++) {
		scenarios.push(bitMask[i] === '1');
	}

	return scenarios;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTION_CHANGE:
    	return [{
    		OID: action.OID,
    		attributes: parseAttributesToArray(action.attributes),
    		highlight: action.highlight,
    		scenarios: parseScenarios(action.attributes.scenario)
		}];
    case SELECTION_ADD:
    	return addItem(state, {
    		OID: action.OID,
    		attributes: parseAttributesToArray(action.attributes),
    		highlight: action.highlight,
    		scenarios: parseScenarios(action.attributes.scenario)
		});
	case SELECTION_REMOVE:
		return removeItem(state, action.OID);
    case SELECTION_RESET:
    	return initialState;
    default:
      return state;
  }
}
