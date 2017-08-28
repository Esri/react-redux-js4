import reducer from '../selection';
import * as types from '../../../constants/action-types';


describe('selection reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle SELECTION_SET', () => {
    expect(reducer(false, {
      type: types.SELECTION_SET,
      layer: 'foo',
      OID: 1,
    })).toEqual([{
      layer: 'foo',
      OID: 1,
    }]);
  });
});
