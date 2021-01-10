import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProjectList from './ProjectList';
// import * as DUMMY_DATA from '../../constants/dummyData'
import { FirebaseContext } from '../../components/Firebase';

export default function ProjectListPage() {
    return (
        <div className="screen-container">
            <Navbar/>
            <FirebaseContext.Consumer>
                {BasicAppClient => <ProjectList appClient={BasicAppClient}/>}
            </FirebaseContext.Consumer>
        </div>
    );
}
