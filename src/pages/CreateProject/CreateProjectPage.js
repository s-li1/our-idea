import { React, useState } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import Navbar from '../../components/Navbar/Navbar'
import CreateProjectForm from './CreateProjectForm'
import './CreateProject.css'
import AppClient from '../../clients/BasicAppClient/BasicAppClient'
import { FirebaseContext } from '../../components/Firebase';

export default function CreateProjectPage() {
    return (
        <div className="screen-container">
            <Navbar />
            <div className="create-project-header">
                <h1>Create Project</h1>
                <p>Submit your project and gauge interest!</p>
            </div>
            <FirebaseContext.Consumer>
                {BasicAppClient => <CreateProjectForm appClient = {BasicAppClient}/>}
            </FirebaseContext.Consumer>
        </div>
    )
}
