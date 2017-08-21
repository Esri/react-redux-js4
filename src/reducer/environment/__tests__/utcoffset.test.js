import reducer from '../utcoffset';
import * as types from '../actions';

describe('UTCOffset reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(0);
  });


  it('should handle SET_ENVIRONMENT', () => {
    expect(reducer(false, {
      type: types.SET_ENVIRONMENT,
      date: new Date(2017),
      UTCOffset: -3,
      shadows: true,
    })).toEqual(-3);
  });
});
