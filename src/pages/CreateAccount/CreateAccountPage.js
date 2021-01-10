import React from 'react'
import CreateForm from './CreateForm'
import { FirebaseContext } from '../../components/Firebase';
import './CreateAccount.css'
import { BsFillPersonFill } from 'react-icons/bs';
import GoBack from '../../components/GoBack/GoBack';
import * as ROUTES from '../../constants/routes';
export default function CreateAccountPage() {
    return (
        <div className="screen-container">
            <div className="create-profile-header">
                <GoBack route={ROUTES.LANDING}/>
                <div className="header-box">
                    <BsFillPersonFill size={40} className="icon"/>
                    <h1 className="header">Create Profile</h1>
                </div>
                <p>Create your free account today and start matching with like-minded individuals that want to do the same projects.</p>
            </div>
                <FirebaseContext.Consumer>
                    {firebase => <CreateForm firebase={firebase}/>}
                </FirebaseContext.Consumer> 
           
        </div>
    )
}
