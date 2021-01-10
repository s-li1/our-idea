import { IconButton } from '@material-ui/core';
import React, { useContext } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FirebaseContext } from '../../Firebase';

import "./LeaveProject.css";

function LeaveProject({projectID, ...rest}) {
    const client = useContext(FirebaseContext);
    return <IconButton {...rest} onClick={() =>  client.removeUserFromProject(projectID)} className="leave-button">
        <AiOutlineCloseCircle />
    </IconButton>
}

export default LeaveProject;