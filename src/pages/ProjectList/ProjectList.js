import React, { useState } from 'react';
import ProjectCard from '../../components/Cards/ProjectCard';

import './ProjectList.css';

export default function ProjectList(props) {
    const [projects, setProjects] = useState(props.db);

    return (
        <div>
            <h1 className="heading">Projects</h1>
            <div className="project-list">
                {projects.map((proj, i) => <ProjectCard key={proj.id} proj={proj}/>)}
            </div>
        </div>
    )
}