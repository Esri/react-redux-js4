import sceneviewMiddelware from '../arcgis-sceneview';
import SceneView from 'esri/views/SceneView'; // eslint-disable-line
import WebScene from 'esri/WebScene'; // eslint-disable-line
import * as types from '../../reducer/webscene/actions';

jest.mock('esri/config', () => ({ request: { corsEnabledServers: [] } }), { virtual: true });

jest.mock('esri/views/SceneView', () => {
  const MockSceneView = jest.fn();
  MockSceneView.prototype.watch = jest.fn();
  MockSceneView.prototype.on = jest.fn();
  MockSceneView.highlight = jest.fn();
  MockSceneView.prototype.whenLayerView = jest.fn(() => Promise.resolve({
    highlight: MockSceneView.highlight,
  }));
  return MockSceneView;
}, { virtual: true });

jest.mock('esri/WebScene', () => {
  const MockWebScene = jest.fn();
  MockWebScene.prototype.then = callback => callback();
  MockWebScene.prototype.layers = {
    getItemAt: jest.fn(() => ({ name: 'sceneLayer' })),
  };
  MockWebScene.prototype.portalItem = { title: 'WebScene title' };
  return MockWebScene;
}, { virtual: true });

const create = () => {
  const store = {
    getState: jest.fn(() => ({ webscene: { selection: [1, 2] } })),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const invoke = action => sceneviewMiddelware(store)(next)(action);
  return { store, next, invoke };
};

describe('async actions', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });

  it('initializes a new SceneView on INIT_SCENE_VIEW and registers event listeners', () => {
    const { next, invoke } = create();
    const action = {
      type: types.INIT_SCENE_VIEW,
      container: 'ref',
    };
    invoke(action);
    expect(SceneView).toHaveBeenCalledWith({ container: 'ref' });
    expect(SceneView.mock.instances[0].watch).toHaveBeenCalled();
    expect(SceneView.mock.instances[0].on).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(action);
  });

  it('initializes a new WebScene on LOAD_WEB_SCENE and dispatches actions', () => {
    const { next, invoke, store } = create();
    const action = {
      type: types.LOAD_WEB_SCENE,
      websceneId: 'abc1234',
    };
    expect.assertions(5);
    invoke(action)
      .then(() => {
        expect(WebScene.mock.instances[0].layers.getItemAt).toHaveBeenCalledWith(0);
        expect(SceneView.mock.instances[0].whenLayerView).toHaveBeenCalledWith({
          name: 'sceneLayer',
          popupEnabled: false,
        });
        expect(next).toHaveBeenCalledWith(Object.assign({
          ...action,
          name: 'WebScene title',
        }));
      });
    expect(store.dispatch).toHaveBeenCalledWith({ type: types.SELECTION_RESET });
    expect(WebScene).toHaveBeenCalledWith({ portalItem: { id: 'abc1234' } });
  });

  it('updates highlights on SELECTION_SET', () => {
    const { next, invoke } = create();
    const action = {
      type: types.SELECTION_SET,
      OIDArray: [1, 2],
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(SceneView.highlight).toHaveBeenCalledWith([1, 2]);
  });
});
