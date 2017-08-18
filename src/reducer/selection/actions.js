export const SELECTION_SET = 'SELECTION_SET';
export const SELECTION_TOGGLE = 'SELECTION_TOGGLE';
export const SELECTION_RESET = 'SELECTION_RESET';


export function selectionSet(layer, OID) {
  return {
    type: SELECTION_SET,
    layer,
    OID,
  };
}

export function selectionToggle(layer, OID) {
  return {
    type: SELECTION_TOGGLE,
    layer,
    OID,
  };
}

export function selectionReset() {
  return {
    type: SELECTION_RESET,
  };
}
