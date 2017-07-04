import { combineReducers } from 'redux';
import webscene from './webscene';
import websceneid from './websceneid';
import view from './view';
import scenelayerview from './scenelayerview';

export default combineReducers({
    webscene,
    websceneid,
    view,
    scenelayerview
});
