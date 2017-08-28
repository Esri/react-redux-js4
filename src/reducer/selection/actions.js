import * as types from '../../constants/action-types';


export function selectionSet(layer, OID) {
  return {
    type: types.SELECTION_SET,
    layer,
    OID,
  };
}

export function selectionToggle(layer, OID) {
  return {
    type: types.SELECTION_TOGGLE,
    layer,
    OID,
  };
}

export function selectionReset() {
  return {
    type: types.SELECTION_RESET,
  };
}
