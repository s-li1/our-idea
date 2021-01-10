import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import * as ROUTES from './constants/routes'

import LandingPage from './pages/Landing/LandingPage';
import CreateAccountPage from './pages/CreateAccount/CreateAccountPage';
import CreateProjectPage from './pages/CreateProject/CreateProjectPage';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/Home/HomePage';
import ChatPage from './pages/Chat/ChatPage';
import { useContext, useState } from 'react';
import { FirebaseContext } from './components/Firebase';
import { SessionContext } from './components/Session';

function App() {
  const [session, setSession] = useState(null);
  return (
    <SessionContext.Provider value={{session, setSession}}>
      <Router>
        <Switch>
          <AuthenticatedRoute path={ROUTES.PROJECT_CREATE} component={CreateProjectPage}/>
          <AuthenticatedRoute path={ROUTES.PROJECT_CHAT} component={ChatPage}/>
          <AuthenticatedRoute path={ROUTES.HOME} component={HomePage}/>
          <Route exact path={ROUTES.LANDING} component={LandingPage}/>
          <Route path={ROUTES.LOGIN} component={LoginPage}/>
          <Route path={ROUTES.CREATE_ACCOUNT} component={CreateAccountPage}/>
          <Redirect to={ROUTES.HOME}/>
        </Switch>
      </Router>
    </SessionContext.Provider>
  );
}

function AuthenticatedRoute({component,...rest}) {
  const { auth: { currentUser } } = useContext(FirebaseContext);
  const { session } = useContext(SessionContext);
  return <Route {...rest} component={currentUser && session ? component : () => <Redirect to={ROUTES.LANDING} />} />
}

export default App;
