import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter} from "react-router-dom";
require("dotenv").config({path: '../config.env'});


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </ BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

