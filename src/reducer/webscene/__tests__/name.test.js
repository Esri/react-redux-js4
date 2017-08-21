import reducer from '../name';
import * as types from '../actions';

describe('webscene name reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle LOAD_WEB_SCENE', () => {
    expect(reducer(false, {
      type: types.LOAD_WEB_SCENE,
      id: 123,
      name: 'foo',
    })).toEqual('foo');
  });
});
