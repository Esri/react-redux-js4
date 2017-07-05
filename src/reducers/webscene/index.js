import { combineReducers } from 'redux';
import webscene from './webscene';
import websceneid from './websceneid';
import view from './view';
import scenelayer from './scenelayer';
import scenelayerview from './scenelayerview';
import selection from './selection';
import highlight from './highlight';
import interacting from './interacting';
import scale from './scale';
import zoom from './zoom';

export default combineReducers({
    webscene,
    websceneid,
    view,
    scenelayer,
    scenelayerview,
    selection,
    highlight,
    interacting,
    scale,
    zoom
});
