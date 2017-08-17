import { combineReducers } from 'redux';
import name from './name';
import selection from './selection';
import interacting from './interacting';
import scale from './scale';
import zoom from './zoom';
import date from './date';

export default combineReducers({
  name,
  selection,
  interacting,
  scale,
  zoom,
  date,
});
