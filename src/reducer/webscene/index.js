import { combineReducers } from 'redux';
import selection from './selection';
import interacting from './interacting';
import scale from './scale';
import zoom from './zoom';

export default combineReducers({
    selection,
    interacting,
    scale,
    zoom
});
