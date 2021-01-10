
import '../ProjectCard/ProjectCard.css';
import { RiGithubLine } from 'react-icons/ri'
import React from 'react';
import { IconButton } from '@material-ui/core';

/**
 * @param {{user: User}} param0 
 */
function UserCard({user}) {
    return <div className="project-card">
                <p className="user-card-title">{user.name}</p>
                <div className="container">
                    <IconButton href={user.github}><RiGithubLine/></IconButton>
                </div>
            </div>;
}

export default UserCard;