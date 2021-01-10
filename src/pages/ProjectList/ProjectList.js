import React, { useEffect, useState } from 'react';
import ProjectCard from '../../components/Cards/ProjectCard';

import './ProjectList.css';

export default function ProjectList({appClient}) {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const myProjects = await appClient.getMyProjects();
            setProjects(myProjects);
        }
        fetchData();
    }, [appClient]);

    return (
        <div className="project-list">
            <h1 className="heading">Projects</h1>
            {projects.map((proj, i) => <ProjectCard key={proj.projectID} proj={proj}/>)}
            
        </div>
    )
}