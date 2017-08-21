import reducer from '../shadows';
import * as types from '../actions';

describe('selection reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(false);
  });


  it('should handle SET_SHADOWS', () => {
    expect(reducer(false, {
      type: types.SET_SHADOWS,
      shadows: true,
    })).toEqual(true);
  });


  it('should handle SET_ENVIRONMENT', () => {
    expect(reducer(false, {
      type: types.SET_ENVIRONMENT,
      shadows: true,
    })).toEqual(true);
  });
});
