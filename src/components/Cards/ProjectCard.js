import React from 'react';

import './SwipeCards.css';
import './ProjectCard.css';

import { MdForum } from 'react-icons/md'
import { useHistory } from 'react-router-dom';
import { PROJECT_CHAT } from '../../constants/routes';

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
                    <MdForum className="goto-chat-btn" onClick={handleChatClick}/>
                </div>
            </div>
        </div>
    )
}