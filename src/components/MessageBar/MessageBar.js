import React, { useContext, useState } from 'react';

import { MdSend, MdError } from 'react-icons/md'
import { Tooltip, IconButton } from '@material-ui/core';

import './MessageBar.css';
import { FirebaseContext } from '../Firebase';

const MessageErrorButton = ({error, onClick}) => <Tooltip title={error} placement="left"><IconButton onClick={onClick} size="medium" className="message-bar-icon"><MdError/></IconButton></Tooltip>;
const MessageSendButton = ({onClick}) => <IconButton onClick={onClick} size="medium" className="message-bar-icon">< MdSend /></IconButton>;

function MessageBar({projectID}) {
    const client = useContext(FirebaseContext);
    const intialForm = {text: "", error: ""};
    const [form, setForm] = useState(intialForm);

    const handleSubmit = async () => {
        if (form.text) {
            try {
                await client.sendMessage(projectID, form.text);
                setForm(intialForm);
            } catch (error) {
                setForm(prevState => ({...prevState, error}));
            }
        } else {
            setForm(intialForm);
        }
    }

    const handleChange = ({target: { value }}) => setForm(f => ({...f, text: value || ""}));

    return (
        <div class="message-bar">
            <input
                value={form.text}
                placeholder="..."
                onChange={handleChange}
                maxLength={200}
                className="message-bar-text"
            />
            {form.error ? <MessageErrorButton error={form.error} onClick={handleSubmit}/> : < MessageSendButton onClick={handleSubmit} />}
        </div>
    );
}

export default MessageBar;