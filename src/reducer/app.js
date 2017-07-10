import { combineReducers } from 'redux';

import user from './user/index';
import webscene from './webscene/index';

export default combineReducers({
	user,
    webscene
});
