import React from 'react'
import CreateForm from './CreateForm'
import { FirebaseContext } from '../../components/Firebase';
import './CreateAccount.css'
import { BsFillPersonFill } from 'react-icons/bs';
import GoBack from '../../components/Buttons/GoBack/GoBack';
import * as ROUTES from '../../constants/routes';
import './CreateAccount.css';
export default function CreateAccountPage() {
    return (
        <div className="screen-container">
            <div className="create-profile-header">
                <GoBack route={ROUTES.LANDING}/>
                <div className="header-box">
                    <BsFillPersonFill size={40} className="icon"/>
                    <h1 className="header">Create Profile</h1>
                </div>
                <p className="header-body">Create your free account today and start matching with like-minded individuals that want to do the same projects.</p>
            </div>
                <CreateForm />
        </div>
    )
}
