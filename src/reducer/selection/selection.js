import { SELECTION_SET, SELECTION_TOGGLE, SELECTION_RESET } from './actions';

const initialState = [];

const findItem = (array, layer, OID) =>
  array.find(item => item.layer === layer && item.OID === OID);

const addItem = (array, layer, OID) => {
  const newArray = array.slice();
  newArray.push({
    layer,
    OID,
  });
  return newArray;
};

const removeItem = (array, layer, OID) => {
  const newArray = array.slice();
  newArray.splice(array.findIndex(item => item.layer === layer && item.OID === OID), 1);
  return newArray;
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SELECTION_SET:
      return [{
        layer: action.layer,
        OID: action.OID,
      }];
    case SELECTION_TOGGLE:
      return findItem(state, action.layer, action.OID)
        ? removeItem(state, action.layer, action.OID) : addItem(state, action.layer, action.OID);
    case SELECTION_RESET:
      return initialState;
    default:
      return state;
  }
};
