import reducer from '../date';
import * as types from '../actions';

describe('date reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(new Date(Date.UTC(2017, 3, 15, 12, 0)));
  });


  it('should handle SET_DATE', () => {
    expect(reducer(false, {
      type: types.SET_DATE,
      date: new Date(Date.UTC(2015, 4, 16, 11, 30)),
    })).toEqual(new Date(Date.UTC(2015, 4, 16, 11, 30)));
  });


  it('should handle SET_ENVIRONMENT', () => {
    expect(reducer(false, {
      type: types.SET_ENVIRONMENT,
      date: new Date(Date.UTC(2015, 4, 16, 11, 30)),
    })).toEqual(new Date(Date.UTC(2015, 4, 16, 11, 30)));
  });
});
