import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

export default function LoginForm({firebase}) {

    const history = useHistory();

    const initialFormState = {
        email: '',
        password: '',
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
        firebase.login(form.email, form.password)
        .then(authUser => {
            setForm(initialFormState);
            history.push(ROUTES.HOME);
        })
        .catch(error=> {
            setForm({error});
        });
        event.preventDefault();
    }


    return (
        <div>
            <form onSubmit ={handleSubmit}>
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
                <button className="create" type="submit">Sign In</button>
                {form.error && <p>{form.error.message}</p>}
            </form>
        </div>
    )
}
