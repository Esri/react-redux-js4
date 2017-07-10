import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import arcgis from './middleware/arcgisapi';

import App from './components/App';
import reducer from './reducers/app';
import { checkSignInStatus } from './reducers/user/actions';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk, arcgis)));

store.dispatch(checkSignInStatus());

let node = document.getElementById('app-container');

ReactDOM.render(
  <div>
  	<Provider store={store}>
  		<App />
    </Provider>
  </div>,
  node
);

calcite.init();
