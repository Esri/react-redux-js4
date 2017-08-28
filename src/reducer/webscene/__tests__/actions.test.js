import * as actions from '../actions';
import * as types from '../../../constants/action-types';


describe('actions', () => {
  it('should create an action to initialize the scene view container', () => {
    const expectedAction = {
      type: types.INIT_SCENE,
      container: 'foo',
      id: '123',
    };
    expect(actions.initScene('foo', '123')).toEqual(expectedAction);
  });
});
