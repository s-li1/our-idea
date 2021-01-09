import React, { useState } from 'react';


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
            {}
            <form onSubmit ={handleSubmit}>
                <input
                    name="username"
                    value={form.username}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={form.email}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="password"
                    value={form.password}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Password"
                />
                 <input
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button type="submit">Create Account</button>
                {form.error && <p>{form.error.message}</p>}
            </form>
        </div>
    )
}
