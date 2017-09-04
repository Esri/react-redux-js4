/* Copyright 2017 Esri
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

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
