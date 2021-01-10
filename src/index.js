import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseContext } from './components/Firebase';
import ChatAppClient from './clients/ChatAppClient/ChatAppClient';

ReactDOM.render(
  <FirebaseContext.Provider value={new ChatAppClient()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById('root')
);