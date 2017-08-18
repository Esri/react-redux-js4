import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authentication from './middleware/arcgis-authentication';
import sceneview from './middleware/arcgis-sceneview';

import App from './components/app';
import reducer from './reducer/app';
import { getIdentity } from './reducer/user/actions';

const getURLParameter = name =>
  decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const store = createStore(reducer,
  composeEnhancers(applyMiddleware(thunk, authentication, sceneview)));

store.dispatch(getIdentity());

const node = document.getElementById('app-container');

ReactDOM.render(
  <div>
    <Provider store={store}>
      <App websceneId={getURLParameter('id')} />
    </Provider>
  </div>,
  node,
);
