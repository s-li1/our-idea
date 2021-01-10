import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { FirebaseContext } from './components/Firebase';
import ChatAppClient from './clients/ChatAppClient/ChatAppClient';
import "react-tiger-transition/styles/main.min.css";
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <FirebaseContext.Provider value={new ChatAppClient()}>
      <App />
      </FirebaseContext.Provider>,
    </BrowserRouter>,
  document.getElementById('root')
);