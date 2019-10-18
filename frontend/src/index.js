import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { reducer, createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";

// export const store = createStore( reducer, compose(applyMiddleware(thunk), window.devToolsExtension ? window.devToolsExtension(): f => f))

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
