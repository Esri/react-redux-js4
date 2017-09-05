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

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './styles/main.css';
import './styles/range-slider.css';

import App from './components/app';
import store from './store/store';


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
