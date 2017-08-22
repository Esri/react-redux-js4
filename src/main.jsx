import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import App from './components/app';
import store from './store/configure-store';


const getURLParameter = name =>
  decodeURIComponent((new RegExp(`[?|&]${name}=([^&;]+?)(&|#|;|$)`).exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;


const node = document.getElementById('app-container');

render(
  <AppContainer>
    <Provider store={store}>
      <App websceneId={getURLParameter('id')} />
    </Provider>
  </AppContainer>,
  node,
);

if (module.hot) {
  module.hot.accept();
}
