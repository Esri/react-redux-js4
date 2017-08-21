import { combineReducers } from 'redux';
import date from './date';
import utcoffset from './utcoffset';
import shadows from './shadows';

export default combineReducers({
  date,
  utcoffset,
  shadows,
});
