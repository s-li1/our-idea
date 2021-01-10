import React, { useState } from 'react';

import './CreateAccount.css'
import { AiOutlineArrowRight } from 'react-icons/ai';
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
                <label className="form-label">Name</label>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    type="text"
                />
                <label className="form-label">Email Address</label>
                <input
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    type="text"
                />
                <label className="form-label">Password</label>
                <input
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    type="password"
                />
                <label className="form-label">Confirm Password</label>
                 <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    type="password"
                />
                <div className="create">
                    <button className="arrow" type="submit"><AiOutlineArrowRight className="arror-icon"/></button>
                </div>
                {form.error && <p className="error">{form.error.message}</p>}
            </form>
        </div>
    )
}
