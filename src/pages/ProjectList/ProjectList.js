import React, { useContext, useEffect, useState } from 'react';
import ProjectCard from '../../components/Cards/ProjectCard';
import firebase from "firebase/app";

import './ProjectList.css';
import { MATCHES } from '../../constants/collections';
import { FirebaseContext } from '../../components/Firebase';

export default function ProjectList({appClient}) {
    const client = useContext(FirebaseContext);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection(MATCHES)
            .where('userID', '==', client.auth.currentUser.uid)
            .onSnapshot(async (snapshot) => {
                const matches = snapshot.docs.map((doc) => doc.data());
                setProjects(await Promise.all(matches.map(m => client.getProject(m.projectID))));
            });
    
        return () => {
          // This is cleanup...
          unsubscribe();
        };
      }, []);

    return (
        <div>
            <h1 className="heading">Projects</h1>
            <div className="project-list">
                {projects.map((proj, i) => <ProjectCard key={proj.projectID} proj={proj}/>)}
            </div>
        </div>
    )
}