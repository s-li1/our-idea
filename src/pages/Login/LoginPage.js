import React from 'react'
import LoginForm from './LoginForm';
import { FirebaseContext } from '../../components/Firebase';
import './Login.css';
export default function LoginPage() {
    return (
        <div className="screen-container">
            <div className="signin-profile-header">
                <h1>Welcome Back.</h1>
                <p>Sign in.</p>
            </div>
            <FirebaseContext.Consumer>
                {firebase => <LoginForm firebase={firebase}/>}
            </FirebaseContext.Consumer> 
        </div>
    )
}