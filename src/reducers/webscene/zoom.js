import { VIEW_CHANGE } from './actions';

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case VIEW_CHANGE:
      return action.view.zoom || initialState;
    default:
      return state;
  }
}
