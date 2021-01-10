import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { AiOutlineArrowRight } from 'react-icons/ai';

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
            <form onSubmit ={handleSubmit} className="signin-account-form">
                <label className="form-label">Email</label>
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
                <button className="arrow" type="submit"><AiOutlineArrowRight className="arror-icon"/></button>
                {form.error && <p className="error">{form.error.message}</p>}
            </form>
        </div>
    )
}
