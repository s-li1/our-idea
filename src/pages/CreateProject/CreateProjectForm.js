import { React, useState } from 'react'
import './CreateProject.css'

export default function CreateProjectForm ({appClient}) {
    const initialProjectState = {
        name: '',
        description: '',
        maxMembers: 0
    }

    const [project, setProject] = useState(initialProjectState)

    /* save project state changes */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProject(prevState => ({
            ...prevState,
            [name]: value
          }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const uuid = appClient.createProject(project);
    }
    
    return (
        <div>
            <form className="create-project-form" onSubmit={handleSubmit}> 
                <h1 className="input-header">Name: </h1>
                <input name="name"
                       value={project.name}
                       onChange={handleInputChange}
                       placeholder="Type here..."
                       type="text">
                </input>

                <h1 className="input-header">Description: </h1>
                <input name="description"
                       className="form-input"
                       value={project.description}
                       onChange={handleInputChange}
                       placeholder="Max 200 words..."
                       maxLength="200"
                       type="text"
                       >
                </input>

                <h1 className="input-header">Max # of People: </h1>
                <input name="maxMembers"
                       value={project.maxMembers}
                       onChange={handleInputChange}
                       placeholder="Number"
                       type="number"
                       >
                </input>
                <div className="create-account">
                    <button className="createProject" type="submit">Create Project</button>
                </div>
            {project.error && <p>{project.error.message}</p>}
            </form>
        </div>

    );
}