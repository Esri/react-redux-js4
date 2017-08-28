import reducer from '../websceneitems';
import * as types from '../../../constants/action-types';


describe('websceneItems reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle SET_USER_WEBSCENES', () => {
    expect(reducer([], {
      type: types.SET_USER_WEBSCENES,
      websceneItems: [{ id: 0, title: 'bla' }],
    })).toEqual([{ id: 0, title: 'bla' }]);

    expect(reducer([{ id: 0, title: 'bla' }], {
      type: types.SET_USER_WEBSCENES,
      websceneItems: [{ id: 0, title: 'bla' }, { id: 1, title: 'bla2' }],
    })).toEqual([{ id: 0, title: 'bla' }, { id: 1, title: 'bla2' }]);
  });
});
