import { combineReducers } from 'redux';

import webscene from './webscene/index';
import view from './view/index';
import selection from './selection/index'

export default combineReducers({
    webscene,
    view,
    selection
});
