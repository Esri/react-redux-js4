import reducer from '../id';
import * as types from '../actions';

describe('webscene id reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle LOAD_WEB_SCENE', () => {
    expect(reducer(false, {
      type: types.LOAD_WEB_SCENE,
      id: 123,
      name: 'foo',
    })).toEqual(123);
  });
});
