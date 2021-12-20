/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App";
import { Router } from "react-router-dom";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reducers } from "./redux/reducers";
import history from "./history";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
