import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import promise from "redux-promise";
import RootReducer from "./Reducers";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import thunkMiddleware from 'redux-thunk'

const composePlugin = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(RootReducer, composePlugin(applyMiddleware(thunkMiddleware,promise)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
registerServiceWorker();

