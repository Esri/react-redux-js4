import { combineReducers } from 'redux';
import webScene from './webScene';
import webSceneId from './webSceneId';
import sceneView from './sceneView';
import sceneLayer from './sceneLayer';
import sceneLayerView from './sceneLayerView';
import selection from './selection';
import highlight from './highlight';
import interacting from './interacting';
import scale from './scale';
import zoom from './zoom';

export default combineReducers({
    webScene,
    webSceneId,
    sceneView,
    sceneLayer,
    sceneLayerView,
    selection,
    highlight,
    interacting,
    scale,
    zoom
});
