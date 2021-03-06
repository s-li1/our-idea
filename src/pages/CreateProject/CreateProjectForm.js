import React, { useState } from 'react'
import './CreateProject.css'
import * as ROUTES from '../../constants/routes';
import * as STATES from '../../constants/states';
import { useHistory } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

export default function CreateProjectForm ({appClient}) {
    const initialProjectState = {
        name: '',
        description: '',
        maxMembers: 0
    }
    const history = useHistory();

    const [project, setProject] = useState(initialProjectState)
    const [state, setState] = useState(STATES.DEFAULT);

    /* save project state changes */
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setProject(prevState => ({
            ...prevState,
            [name]: value
          }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setState(STATES.LOADING);
            await appClient.createProject(project);
            history.push(ROUTES.HOME);
        } catch (error) {
            setState(STATES.DEFAULT);
            setProject(prevState => ({...prevState, error}))
        }
    }
    
    return (
        <div>
            {state === STATES.LOADING ? <Spinner/> :
            <form className="create-project-form" onSubmit={handleSubmit}> 
                <label className="input-header">Name: </label>
                <input name="name"
                       value={project.name}
                       onChange={handleInputChange}
                       placeholder="Type here..."
                       type="text">
                </input>

                <label className="input-header">Description: </label>
                <textarea name="description"
                       className="form-input"
                       value={project.description}
                       onChange={handleInputChange}
                       placeholder="Maximum of 200 words"
                       maxLength={200}
                       type="text"
                       >
                </textarea>

                <label className="input-header">Maximum Number of People: </label>
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
            </form>}
        </div>

    );
}