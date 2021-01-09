import React from 'react'
import Navigation from '../../components/Navigation/Navigation'
import CreateForm from './CreateForm'
import { FirebaseContext } from '../../components/Firebase';

export default function CreateAccountPage() {
    return (
        <div>
            <Navigation/>
            <h1>Create Account</h1>
            <FirebaseContext.Consumer>
                {firebase => <CreateForm firebase={firebase}/>}
            </FirebaseContext.Consumer>
            
        </div>
    )
}
