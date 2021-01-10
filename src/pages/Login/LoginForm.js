import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FirebaseContext } from '../../components/Firebase';
import { SessionContext } from '../../components/Session';
import Spinner from '../../components/Spinner/Spinner';
import * as ROUTES from '../../constants/routes';
import { AiOutlineArrowRight } from 'react-icons/ai';
import * as STATES from '../../constants/states';

export default function LoginForm() {
    const firebase = useContext(FirebaseContext);
    const { setSession } = useContext(SessionContext);

    const history = useHistory();

    const initialFormState = {
        email: '',
        password: '',
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
            <form onSubmit ={handleSubmit} className="signin-account-form">
                <label className="form-label">Username</label>
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
            </form>}
        </div>
    )
}
