import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import configureStore from './store/configure-store';

import { getIdentity } from './reducer/user/actions';

const getURLParameter = name =>
  decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;


const store = configureStore();
store.dispatch(getIdentity());


const node = document.getElementById('app-container');

ReactDOM.render(
  <Provider store={store}>
    <App websceneId={getURLParameter('id')} />
  </Provider>,
  node,
);


if (module.hot) {
  module.hot.accept();
}
