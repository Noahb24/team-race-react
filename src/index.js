import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter} from "react-router-dom";
import LogRocket from 'logrocket';
require("dotenv").config({path: '../config.env'});


if(process.env.NODE_ENV !== "development"){
  LogRocket.init('2p8jrv/team-race');
  console.log('Using Log Rocket')
}

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

