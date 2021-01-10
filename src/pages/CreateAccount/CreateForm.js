import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../components/Firebase';
import { SessionContext } from '../../components/Session';
import Spinner from '../../components/Spinner/Spinner';
import * as ROUTES from '../../constants/routes';
import * as STATES from '../../constants/states';

export default function CreateForm() {
    const { setSession } = useContext(SessionContext);
    const firebase = useContext(FirebaseContext);
    const history = useHistory();

    const initialFormState = {
        username:'',
        email:'',
        password:'',
        confirmPassword:'',
        error: null
    }

    const [form, setForm] = useState(initialFormState);
    const [state, setState] = useState(STATES.DEFAULT);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
          }));
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setState(STATES.LOADING);
            await firebase.createAccount(form.email, form.password, {
                name: form.username
            });
            await firebase.login(form.email, form.password);
            setSession(await firebase.getUser(firebase.auth.currentUser.uid));
            history.push(ROUTES.HOME);
        } catch (error) {
            setState(STATES.DEFAULT);
            setForm(prevState => ({...prevState, error}));
        }
    }


    return (
        <div>
            {state === STATES.LOADING ? <Spinner/> :
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
                <button type="submit" onClick={handleSubmit}>Create Account</button>
                {form.error && <p>{form.error.message}</p>}
            </form>}
        </div>
    )
}
