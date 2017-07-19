import * as actions from '../actions';

describe('actions', () => {
  it('should create an action to reset the selection', () => {
    const expectedAction = { type: actions.SELECTION_RESET };
    expect(actions.selectionReset()).toEqual(expectedAction);
  });
});
