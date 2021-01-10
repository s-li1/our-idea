import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseContext } from './components/Firebase';
import AppClient from './components/AppClient';

ReactDOM.render(
  <FirebaseContext.Provider value={new AppClient()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);