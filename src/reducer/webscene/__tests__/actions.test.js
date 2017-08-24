import * as actions from '../actions';


describe('actions', () => {
  it('should create an action to initialize the scene view container', () => {
    const expectedAction = {
      type: actions.INIT_SCENE,
      container: 'foo',
      id: '123',
    };
    expect(actions.initScene('foo', '123')).toEqual(expectedAction);
  });
});
