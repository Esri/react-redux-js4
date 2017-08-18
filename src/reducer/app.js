import { combineReducers } from 'redux';

import user from './user/index';
import webscene from './webscene/index';
import environment from './environment/index';

export default combineReducers({
  user,
  webscene,
  environment,
});
