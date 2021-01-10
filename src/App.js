import React from 'react';
import './components/Firebase'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from './constants/routes'
import LandingPage from './pages/Landing/LandingPage';
import CreateAccountPage from './pages/CreateAccount/CreateAccountPage';
import CreateProjectPage from './pages/CreateProject/CreateProjectPage';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import ProjectListPage from './pages/ProjectList/ProjectListPage';
import ChatPage from './pages/Chat/ChatPage';
import { useContext } from 'react';
import { FirebaseContext } from './components/Firebase';

function App() {
  const client = useContext(FirebaseContext);

  return (
    <Router>
      <Switch>
        <Route exact path={ROUTES.LANDING} component={LandingPage}/>
        <Route path={ROUTES.CREATE_ACCOUNT} component={CreateAccountPage}/>
        <Route path={ROUTES.PROJECT_CREATE} component={CreateProjectPage}/>
        <Route path={ROUTES.PROJECT_CHAT} component={ChatPage}/>
        <Route path={ROUTES.LOGIN} component={LoginPage}/>
        <Route path={ROUTES.PROJECTS} component={ProjectListPage}/>
        <Route path={ROUTES.HOME} component={HomePage}/>
        <Redirect to={client.auth.currentUser ? ROUTES.HOME : ROUTES.LOGIN}/>
      </Switch>
    </Router>
  );
}

export default App;
