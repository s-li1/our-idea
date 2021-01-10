import { IconButton } from '@material-ui/core';
import React, { useContext } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FirebaseContext } from '../../Firebase';

function LeaveProject({projectID, ...rest}) {
    const client = useContext(FirebaseContext);
    return <IconButton {...rest} onClick={() =>  client.removeUserFromProject(projectID)}>
        <AiOutlineCloseCircle />
    </IconButton>
}

export default LeaveProject;