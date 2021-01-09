import app from 'firebase/app';
import 'firebase/auth'

import config from './config';

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.auth = app.auth();
    }

    createAccount = (email, password) => this.auth.createUserWithEmailAndPassword(email, password);
    login = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    logoff = () => this.auth.signOut();

    
}

export default Firebase;