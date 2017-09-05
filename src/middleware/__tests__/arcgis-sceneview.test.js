/* Copyright 2017 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import SceneView from 'esri/views/SceneView';
import WebScene from 'esri/WebScene';

import sceneviewMiddelware from '../arcgis-sceneview';

import {
  INIT_SCENE,
  SELECTION_SET,
  SELECTION_TOGGLE,
  SELECTION_RESET,
  SET_ENVIRONMENT,
} from '../../constants/action-types';

import { registerClickEvent } from '../arcgis-sceneview/interaction';
import { updateHighlights } from '../arcgis-sceneview/highlights';
import { setEnvironment } from '../arcgis-sceneview/environment';


/**
 * Mocks
 */
jest.mock('esri/config', () => ({ request: { corsEnabledServers: [] } }), { virtual: true });


jest.mock('esri/views/SceneView', () => {
  const MockSceneView = jest.fn();
  MockSceneView.prototype.watch = jest.fn();
  MockSceneView.prototype.on = jest.fn();
  MockSceneView.highlight = jest.fn();
  MockSceneView.prototype.whenLayerView = jest.fn(() => Promise.resolve());
  return MockSceneView;
}, { virtual: true });


jest.mock('esri/WebScene', () => {
  const MockWebScene = jest.fn();
  MockWebScene.prototype.then = callback => callback();
  MockWebScene.prototype.layers = {
    items: [{
      popupEnabled: true,
    }],
    getItemAt: jest.fn(),
  };
  MockWebScene.prototype.portalItem = {
    title: 'WebScene title',
  };
  MockWebScene.prototype.initialViewProperties = {
    environment: {
      lighting: {
        displayUTCOffset: -1,
        date: new Date(Date.UTC(2017, 1, 1, 12)),
        directShadowsEnabled: true,
      },
    },
  };
  return MockWebScene;
}, { virtual: true });


jest.mock('../arcgis-sceneview/interaction', () => ({
  registerClickEvent: jest.fn(),
}), { virtual: true });


jest.mock('../arcgis-sceneview/highlights', () => ({
  updateHighlights: jest.fn(),
}), { virtual: true });

jest.mock('../arcgis-sceneview/environment', () => ({
  setEnvironment: jest.fn(),
}), { virtual: true });


/**
 * Middleware stuff
 */
const create = () => {
  const store = {
    getState: jest.fn(() => ({
      selection: [{
        layer: 'foo',
        OID: 3,
      }],
      environment: {
        date: new Date(Date.UTC(2017, 1, 1, 11)),
        utcoffset: -3,
        shadows: true,
      },
    })),
    dispatch: jest.fn(),
  };
  const next = jest.fn();
  const invoke = action => sceneviewMiddelware(store)(next)(action);
  return { store, next, invoke };
};


/**
 * Tests
 */
describe('async actions', () => {
  it('passes through non-function action', () => {
    const { next, invoke } = create();
    const action = { type: 'TEST' };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
  });
});


describe('Arcgis SceneView middleware - scene loading', () => {
  it('initializes a new Scene View with Web Scene on INIT_SCENE', () => {
    const { next, invoke, store } = create();
    const container = {
      appendChild: jest.fn(),
    };
    const newDiv = document.createElement('DIV');
    const action = {
      type: INIT_SCENE,
      container,
      id: 'abc1234',
    };
    expect.hasAssertions();
    invoke(action)
      .then(() => {
        expect(next).toHaveBeenCalledWith({
          type: INIT_SCENE,
          container,
          id: 'abc1234',
          name: 'WebScene title',
        });
        expect(store.dispatch).toHaveBeenCalledWith({
          type: SET_ENVIRONMENT,
          UTCOffset: -1,
          date: new Date(Date.UTC(2017, 1, 1, 11)),
          shadows: true,
        });
        expect(updateHighlights).toHaveBeenCalledWith({
          map: {},
        }, [{
          layer: 'foo',
          OID: 3,
        }]);
      });
    expect(SceneView).toHaveBeenCalledWith({ container: newDiv });
    expect(container.appendChild).toHaveBeenCalledWith(newDiv);
    expect(registerClickEvent).toHaveBeenCalled();
    expect(WebScene).toHaveBeenCalledWith({ portalItem: { id: 'abc1234' } });
  });
});

describe('Arcgis SceneView middleware - selection', () => {
  it('updates highlights on SELECTION_SET', () => {
    const { next, invoke } = create();
    const action = {
      type: SELECTION_SET,
      layer: 'foo',
      OID: 3,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(updateHighlights).toHaveBeenCalledWith({
      map: {},
    }, [{
      layer: 'foo',
      OID: 3,
    }]);
  });


  it('updates highlights on SELECTION_RESET', () => {
    const { next, invoke } = create();
    const action = {
      type: SELECTION_RESET,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(updateHighlights).toHaveBeenCalledWith({
      map: {},
    }, [{
      layer: 'foo',
      OID: 3,
    }]);
  });


  it('updates highlights on SELECTION_TOGGLE', () => {
    const { next, invoke } = create();
    const action = {
      type: SELECTION_TOGGLE,
      layer: 'foo',
      OID: 3,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(updateHighlights).toHaveBeenCalledWith({
      map: {},
    }, [{
      layer: 'foo',
      OID: 3,
    }]);
  });
});

describe('Arcgis SceneView middleware - environment', () => {
  it('updates environment on SET_ENVIRONMENT', () => {
    const { next, invoke } = create();
    const action = {
      type: SET_ENVIRONMENT,
      date: new Date(Date.UTC(2017, 1, 1, 11)),
      UTCOffset: -3,
      shadows: true,
    };
    invoke(action);
    expect(next).toHaveBeenCalledWith(action);
    expect(setEnvironment).toHaveBeenCalledWith(
      { map: {} },
      new Date(Date.UTC(2017, 1, 1, 14)),
      -3,
      true,
    );
  });
});
