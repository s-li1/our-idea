import React, { useContext } from 'react';
import { FirebaseContext } from './../Firebase';

function MessageBar() {
    const client = useContext(FirebaseContext);

    return <div>Type here</div>
}

export default MessageBar;