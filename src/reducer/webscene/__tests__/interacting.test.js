import reducer from '../interacting';
import * as types from '../actions';

describe('interacting reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(false);
  });

  it('should handle VIEW_CHANGE', () => {
    expect(reducer(false, {
      type: types.VIEW_CHANGE,
      view: {
        interacting: true,
      },
    })).toEqual(true);
  });
});
