import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function Navigation() {
    return (
        <div>
            <ul>
                <li>
                    <Link to={ROUTES.LOGIN}>Log In</Link>
                </li>
                <li>
                    <Link to={ROUTES.LANDING}>Landing</Link>
                </li>
                <li>
                    <Link to={ROUTES.HOME}>Home</Link>
                </li>
                <li>
                    <Link to={ROUTES.CREATE_ACCOUNT}>Create Account</Link>
                </li>
            </ul>
        </div>
    )
}
