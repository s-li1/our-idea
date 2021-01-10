import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';

import { MdAddCircle } from 'react-icons/md'
import { MdHome } from 'react-icons/md'
import { MdChatBubble } from 'react-icons/md'
import { MdExitToApp } from 'react-icons/md'
import {IconButton} from '@material-ui/core';


export default function Navbar () {
    return (
        <div class="navbar">
            <Link to={ROUTES.CREATE_PROJECT}> 
                <IconButton>
                    <MdAddCircle class="navbar__icon" />
                </IconButton>
            </Link>
            
            <Link to={ROUTES.HOME}> 
                <IconButton> 
                    <MdHome class="navbar__icon" />
                </IconButton>
            </Link>
            
            <Link to={ROUTES.HOME}> 
                <IconButton> 
                    <MdChatBubble class="navbar__icon"/>
                </IconButton>
            </Link>

            <Link to={ROUTES.LOGIN}> 
                <IconButton> 
                    <MdExitToApp class="navbar__icon"/>
                </IconButton>
            </Link>
        </div>
    )
}