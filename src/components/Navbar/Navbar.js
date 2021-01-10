import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';
import { MdAddCircle } from 'react-icons/md'
import { MdHome } from 'react-icons/md'
import { MdViewModule } from 'react-icons/md'
import { withStyles, IconButton} from '@material-ui/core';
import SignOut from '../SignOut/SignOut';
import { FirebaseContext } from '../Firebase';


function Navbar ({ classes }) {

    return (
        <div className="navbar">
            <Link to={ROUTES.PROJECT_CREATE}> 
                <IconButton className={classes.icon}>
                    <MdAddCircle className="navbar__icon" />
                </IconButton>
            </Link>
            
            <Link to={ROUTES.HOME}> 
                <IconButton className={classes.icon}> 
                    <MdHome className="navbar__icon" />
                </IconButton>
            </Link>
            
            <Link to={ROUTES.PROJECTS}> 
                <IconButton className={classes.icon}> 
                    <MdViewModule className="navbar__icon"/>
                </IconButton>
            </Link>
            <FirebaseContext.Consumer>
                {firebase => <SignOut firebase={firebase}/>}
            </FirebaseContext.Consumer> 
        </div>
    )
}

const styles = theme => ({
    icon: {
        transition: {
            duration: 2
        }
    }
});


export default withStyles(styles)(Navbar);