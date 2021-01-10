import React from 'react'
import Navigation from '../../components/Navigation/Navigation';
import LoginForm from './LoginForm';
import { FirebaseContext } from '../../components/Firebase';
export default function LoginPage() {
    return (
        <div>
            <h1>Login</h1>
            <FirebaseContext.Consumer>
                {firebase => <LoginForm firebase={firebase}/>}
            </FirebaseContext.Consumer>
        </div>
    )
}