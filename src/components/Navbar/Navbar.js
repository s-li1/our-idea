import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';

import { MdAddCircle } from 'react-icons/md'
import { MdHome } from 'react-icons/md'
import { MdChatBubble } from 'react-icons/md'
import { MdExitToApp } from 'react-icons/md'
import { MdViewModule } from 'react-icons/md'
import {IconButton} from '@material-ui/core';


export default function Navbar () {
    return (
        <div className="navbar">
            <Link to={ROUTES.CREATE_PROJECT}> 
                <IconButton>
                    <MdAddCircle className="navbar__icon" />
                </IconButton>
            </Link>
            
            <Link to={ROUTES.HOME}> 
                <IconButton> 
                    <MdHome className="navbar__icon" />
                </IconButton>
            </Link>
            
            <Link to={ROUTES.HOME}> 
                <IconButton> 
                    <MdChatBubble className="navbar__icon"/>
                </IconButton>
            </Link>

            <Link to={ROUTES.HOME}> 
                <IconButton> 
                    <MdViewModule className="navbar__icon"/>
                </IconButton>
            </Link>

            <Link to={ROUTES.LOGIN}> 
                <IconButton> 
                    <MdExitToApp className="navbar__icon"/>
                </IconButton>
            </Link>
        </div>
    )
}