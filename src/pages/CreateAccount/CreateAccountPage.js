import React from 'react'
import Navigation from '../../components/Navigation/Navigation'
import CreateForm from './CreateForm'

export default function CreateAccountPage() {
    return (
        <div>
            <Navigation/>
            <h1>Create Account</h1>
            <CreateForm/>
        </div>
    )
}
