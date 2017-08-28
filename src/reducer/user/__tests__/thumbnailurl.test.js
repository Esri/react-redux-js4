import reducer from '../thumbnailurl';
import * as types from '../../../constants/action-types';


describe('thumbnailurl reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle SET_IDENTITY', () => {
    expect(reducer(null, {
      type: types.SET_IDENTITY,
      thumbnailurl: 'http://bla',
    })).toEqual('http://bla');

    expect(reducer('http://bla', {
      type: types.SET_IDENTITY,
      thumbnailurl: 'http://bla2',
    })).toEqual('http://bla2');
  });
});
