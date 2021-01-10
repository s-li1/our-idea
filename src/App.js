import React from 'react';
import './components/Firebase'
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import LandingPage from './pages/Landing/LandingPage';
import CreateAccountPage from './pages/CreateAccount/CreateAccountPage';
import CreateProjectPage from './pages/CreateProject/CreateProjectPage';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
          <Route path={ROUTES.CREATE_ACCOUNT} component={CreateAccountPage}/>
          <Route path={ROUTES.CREATE_PROJECT} component={CreateProjectPage}/>
          <Route path={ROUTES.LOGIN} component={LoginPage}/>
          <Route path={ROUTES.HOME} component={HomePage}/>
        </Switch>
      </Router>
  );
}

export default App;
