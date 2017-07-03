import { combineReducers } from 'redux';
import interacting from './interacting';
import scale from './scale';
import zoom from './zoom';

export default combineReducers({
    interacting,
    scale,
    zoom
});
