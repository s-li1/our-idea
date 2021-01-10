import React from 'react';

import './ProjectCard.css';

import { MdForum } from 'react-icons/md'
import { useHistory } from 'react-router-dom';
import { PROJECT_CHAT } from '../../constants/routes';
import { IconButton } from '@material-ui/core';
import LeaveProject from '../Buttons/LeaveProject/LeaveProject';

export default function ProjectCard({ proj }) {
    const history = useHistory();

    const handleChatClick = (e) => {
        e.preventDefault();
        history.push(PROJECT_CHAT.replace(':id', proj.projectID));
    }

    return (
        <div className="project-card">
            <p className="project-card-title">{proj.name}</p>
            <div className="project-card-desc">
            {proj.description}
            </div>
            <div className="container">
                <div className="btn-holder">
                    <IconButton onClick={handleChatClick} className="goto-chat-btn">
                        <MdForum />
                    </IconButton>
                    <div className="button-padding"></div>
                    <LeaveProject className="goto-chat-btn" projectID={proj.projectID}/>
                </div>
            </div>
        </div>
    )
}