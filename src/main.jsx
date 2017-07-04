import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/App';

import reducer from './reducers/app';

import { signIn } from './reducers/identity/actions';


const store = createStore(reducer, applyMiddleware(thunk));

store.dispatch(signIn());

let node = document.getElementById('app-container');

ReactDOM.render(
  <div>
  	<Provider store={store}>
  		<App store={store} />
    </Provider>
  </div>,
  node
);
