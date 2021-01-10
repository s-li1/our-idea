import React, { useEffect, useState } from 'react';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

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
        <div>
            <h1 className="heading">Projects</h1>
            <div className="project-list">
                {projects.map((proj, i) => <ProjectCard key={proj.projectID} proj={proj}/>)}
            </div>
        </div>
    )
}