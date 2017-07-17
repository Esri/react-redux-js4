import * as actions from '../actions'
import * as types from '../actions'

describe('actions', () => {
  it('should create an action to reset the selection', () => {
    const expectedAction = {
      type: types.SELECTION_RESET
    }
    expect(actions.selectionReset()).toEqual(expectedAction)
  })
})
