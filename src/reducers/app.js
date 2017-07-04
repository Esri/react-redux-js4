import { combineReducers } from 'redux';

import identity from './identity/index';
import webscene from './webscene/index';
import view from './view/index';
import selection from './selection/index';

export default combineReducers({
	identity,
    webscene,
    view,
    selection
});
