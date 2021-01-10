import React from 'react'
import CreateForm from './CreateForm'
import { FirebaseContext } from '../../components/Firebase';
import './CreateAccount.css'

export default function CreateAccountPage() {
    return (
        <div className="screen-container">
            <div className="create-profile-header">
                <h1>Create Profile</h1>
                <p>Create your free account today and start matching with like-minded individuals that want to do the same projects.</p>
            </div>
                <FirebaseContext.Consumer>
                    {firebase => <CreateForm firebase={firebase}/>}
                </FirebaseContext.Consumer> 
           
        </div>
    )
}
