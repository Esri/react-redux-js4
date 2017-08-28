import reducer from '../id';
import * as types from '../../../constants/action-types';


describe('webscene id reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle INIT_SCENE', () => {
    expect(reducer(false, {
      type: types.INIT_SCENE,
      id: 123,
      name: 'foo',
    })).toEqual(123);
  });
});
