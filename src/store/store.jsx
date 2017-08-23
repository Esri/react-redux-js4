import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import authentication from '../middleware/arcgis-authentication';
import sceneview from '../middleware/arcgis-sceneview';

import reducer from '../reducer/app';

import { getIdentity } from '../reducer/user/actions';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, authentication, sceneview)),
);

store.dispatch(getIdentity());


if (module.hot) {
  module.hot.accept('../reducer/app', () => {
    // Quite ugly: this piece of code must use AMD because it will be run in the built
    // environment.
    // eslint-disable-next-line
    require(["../reducer/app"], function (nextReducer) {
      store.replaceReducer(nextReducer.default);
    });
  });
}

export default store;
