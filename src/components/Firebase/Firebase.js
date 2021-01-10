import app from 'firebase/app';
import 'firebase/auth'
import "firebase/firestore";

import { USERS } from '../../constants/collections';

import config from './config';

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    /**
     * Creates a user account w/firebase auth & user data
     * @param {string} email 
     * @param {string} password 
     * @param {User} user 
     */
    createAccount = async (email, password, user) => {
        await this.auth.createUserWithEmailAndPassword(email, password);
        await app
            .firestore()
            .collection(USERS)
            .add({
                ...user, 
                userID: this.auth.currentUser.uid,
                lastProjectTimestamp: "0"
            })
    };

    login = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
    logoff = () => this.auth.signOut();
}

export default Firebase;