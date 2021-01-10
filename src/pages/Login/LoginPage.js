import React from 'react'
import LoginForm from './LoginForm';
import { FirebaseContext } from '../../components/Firebase';
import './Login.css';
import { CgHello } from 'react-icons/cg';
import GoBack from '../../components/Buttons/GoBack/GoBack';
import * as ROUTES from '../../constants/routes';
import './Login.css';
export default function LoginPage() {
    return (
        <div className="screen-container">
            <div className="signin-profile-header">
                <GoBack route={ROUTES.LANDING}/>
                <div className="header-box">
                    <CgHello size={40} className="icon"/>
                    <h1>Welcome Back!</h1>
                </div>
                
                <p className="header-body">Sign in to continue</p>
            </div>
            <FirebaseContext.Consumer>
                {firebase => <LoginForm firebase={firebase}/>}
            </FirebaseContext.Consumer> 
        </div>
    )
}