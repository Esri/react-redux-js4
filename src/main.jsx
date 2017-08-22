import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './components/app';
import store from './store/configure-store';


const getURLParameter = name =>
  decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;


const node = document.getElementById('app-container');

render(
  <Provider store={store}>
    <App websceneId={getURLParameter('id')} />
  </Provider>,
  node,
);

if (module.hot) {
  module.hot.accept();
}
