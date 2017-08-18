import * as actions from '../actions';


describe('actions', () => {
  it('should create an action to initialize the scene view container', () => {
    const expectedAction = {
      type: actions.INIT_SCENE_VIEW,
      container: 'foo',
    };
    expect(actions.initSceneView('foo')).toEqual(expectedAction);
  });


  it('should create an action to load a web scene', () => {
    const expectedAction = {
      type: actions.LOAD_WEB_SCENE,
      id: 123,
      name: 'foo',
    };
    expect(actions.loadWebScene(123, 'foo')).toEqual(expectedAction);
  });
});
