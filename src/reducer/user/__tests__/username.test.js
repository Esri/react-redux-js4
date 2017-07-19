import reducer from '../username';
import * as types from '../actions';

describe('username reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle SET_IDENTITY', () => {
    expect(reducer(null, {
      type: types.SET_IDENTITY,
      username: 'user123',
    })).toEqual('user123');

    expect(reducer('user123', {
      type: types.SET_IDENTITY,
      username: 'john321',
    })).toEqual('john321');
  });
});
