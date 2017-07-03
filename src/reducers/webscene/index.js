import { combineReducers } from 'redux';
import webscene from './webscene';
import websceneid from './websceneid';
import view from './view';

export default combineReducers({
    webscene,
    websceneid,
    view
});
