import * as actions from '../actions';


describe('actions', () => {
  it('should create an action to set the selection', () => {
    const expectedAction = {
      type: actions.SELECTION_SET,
      layer: 'foo',
      OID: 3,
    };
    expect(actions.selectionSet('foo', 3)).toEqual(expectedAction);
  });


  it('should create an action to toggle the selection', () => {
    const expectedAction = {
      type: actions.SELECTION_TOGGLE,
      layer: 'foo',
      OID: 3,
    };
    expect(actions.selectionToggle('foo', 3)).toEqual(expectedAction);
  });


  it('should create an action to reset the selection', () => {
    const expectedAction = {
      type: actions.SELECTION_RESET,
    };
    expect(actions.selectionReset()).toEqual(expectedAction);
  });
});
