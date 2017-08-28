import * as actions from '../actions';
import * as types from '../../../constants/action-types';


describe('actions', () => {
  it('should create an action to set the selection', () => {
    const expectedAction = {
      type: types.SELECTION_SET,
      layer: 'foo',
      OID: 3,
    };
    expect(actions.selectionSet('foo', 3)).toEqual(expectedAction);
  });


  it('should create an action to toggle the selection', () => {
    const expectedAction = {
      type: types.SELECTION_TOGGLE,
      layer: 'foo',
      OID: 3,
    };
    expect(actions.selectionToggle('foo', 3)).toEqual(expectedAction);
  });


  it('should create an action to reset the selection', () => {
    const expectedAction = {
      type: types.SELECTION_RESET,
    };
    expect(actions.selectionReset()).toEqual(expectedAction);
  });
});
