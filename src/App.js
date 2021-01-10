import React, { useEffect, useState } from 'react';
import './components/Firebase'
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { useLocalStorage, writeStorage } from '@rehooks/local-storage';
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
import { SessionContext } from './components/Session';
import * as STATES from './constants/states';
import Spinner from './components/Spinner/Spinner';

function App() {
  const { auth } = useContext(FirebaseContext);

  const [session] = useLocalStorage('session');
  const setSession = s => writeStorage('session', JSON.stringify(s));

  const [authState, setAuthState] = useState({auth: false, state: STATES.LOADING});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setAuthState({auth: !!session && !!user, state: STATES.DEFAULT});
    });
  }, [setAuthState, auth, session]);

  return ( authState.state === STATES.LOADING ? <Spinner /> :
    <SessionContext.Provider value={{session, setSession}}>
      <Router>
        <Switch>
          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
          <AuthenticatedRoute exact path={ROUTES.PROJECTS} component={ProjectListPage} isLoggedIn={authState.auth}/>
          <AuthenticatedRoute path={ROUTES.PROJECT_CREATE} component={CreateProjectPage} isLoggedIn={authState.auth}/>
          <AuthenticatedRoute path={ROUTES.PROJECT_CHAT} component={ChatPage} isLoggedIn={authState.auth}/>
          <AuthenticatedRoute path={ROUTES.HOME} component={HomePage} isLoggedIn={authState.auth}/>
          <Route path={ROUTES.LOGIN} component={LoginPage}/>
          <Route path={ROUTES.CREATE_ACCOUNT} component={CreateAccountPage}/>
          <Redirect to={ROUTES.HOME}/>
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
}

function AuthenticatedRoute({component, isLoggedIn, ...rest}) {
  return <Route {...rest} component={isLoggedIn ? component : () => <Redirect to={ROUTES.LANDING} />} />
}

export default App;
