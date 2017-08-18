import { combineReducers } from 'redux';

import user from './user/index';
import webscene from './webscene/index';
import environment from './environment/index';
import selection from './selection/index';

export default combineReducers({
  user,
  webscene,
  environment,
  selection,
});
