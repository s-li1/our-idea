import React from 'react';
import { MdExitToApp } from 'react-icons/md';
import {IconButton} from '@material-ui/core';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
export default function SignOut({firebase}) {
    return (
        <Link to={ROUTES.LANDING}> 
            <IconButton onClick={firebase.logoff}>
                <MdExitToApp className="navbar__icon"/>
            </IconButton>
        </Link>
    )
}
