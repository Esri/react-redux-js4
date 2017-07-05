import { combineReducers } from 'redux';

import identity from './identity/index';
import webscene from './webscene/index';
import view from './view/index';

export default combineReducers({
	identity,
    webscene,
    view
});
