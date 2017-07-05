import { VIEW_CHANGE } from './actions';

const initialState = false;

export default (state = initialState, action) => {
  switch (action.type) {
    case VIEW_CHANGE:
      return action.view.interacting || initialState;
    default:
      return state;
  }
}
