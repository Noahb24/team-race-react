import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { HashRouter } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HashRouter basename='team-race-react'>
        <App />
      </ HashRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

