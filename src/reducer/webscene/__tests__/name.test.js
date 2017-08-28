import reducer from '../name';
import * as types from '../../../constants/action-types';


describe('webscene name reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle INIT_SCENE', () => {
    expect(reducer(false, {
      type: types.INIT_SCENE,
      id: 123,
      name: 'foo',
    })).toEqual('foo');
  });
});
