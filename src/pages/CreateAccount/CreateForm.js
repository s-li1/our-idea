import React, { useState } from 'react';

import './CreateAccount.css'
export default function CreateForm({firebase}) {

    const initialFormState = {
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        error: null
    }

    const [form, setForm] = useState(initialFormState);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
          }));
    }

    const handleSubmit = (event) => {
        firebase.createAccount(form.email, form.password)
        .then(authUser => {
            setForm(initialFormState);
        })
        .catch(error=> {
            setForm({error});
        });
        event.preventDefault();
    }


    return (
        <div>
            <form onSubmit ={handleSubmit} className="create-account-form">
                <h1 className="input-header">Name</h1>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    type="text"
                />
                <h1 className="input-header">Email Address</h1>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    type="text"
                />
                <h1 className="input-header">Password</h1>
                <input
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    type="password"
                />
                <h1 className="input-header">Confirm Password</h1>
                 <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    type="password"
                />
                <button className="create" type="submit">Create an Account</button>
                
                {form.error && <p>{form.error.message}</p>}
            </form>
        </div>
    )
}
