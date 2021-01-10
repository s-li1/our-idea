import React from 'react';

import './SwipeCards.css';
import './ProjectCard.css';

import { MdForum } from 'react-icons/md'

export default function ProjectCard({ proj }) {
    return (
        <div className="project-card">
            <p className="project-card-title">{proj.name}</p>
            <div className="project-card-desc">
            {proj.description}
            </div>
            <div className="container">
                <div className="btn-holder">
                    <MdForum className="goto-chat-btn" onClick={() => console.log(`sending user to chat for project ${proj.id}`)}/>
                </div>
            </div>
        </div>
    )
}