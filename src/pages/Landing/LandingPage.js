import React from 'react'
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import { FaRegLightbulb } from 'react-icons/fa';
export default function LandingPage() {
    return (
        <div className="screen-container">
            <div className="page-content">
                <h1 className="title">Our Idea</h1>
                <div className="logo">
                    <FaRegLightbulb size={100} className="lightbulb-logo"/>
                </div>
                <p className="blurb">The world's first project based team finder.</p>
                <Link to={ROUTES.CREATE_ACCOUNT}>
                    <button className="create-account">
                        Create an Account
                    </button>
                </Link>
                <p>Already have an account? <Link to={ROUTES.LOGIN}>Log In</Link></p>
            </div>
        </div>
    )       
}
