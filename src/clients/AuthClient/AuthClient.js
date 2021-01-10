import app from 'firebase/app';
import 'firebase/auth'
import "firebase/firestore";

import { USERS } from '../../constants/collections';

import config from './config';

class AuthClient {
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
            .doc(this.auth.currentUser.uid)
            .set({
                ...user, 
                userID: this.auth.currentUser.uid,
                lastProjectTimestamp: "0"
            })
    };

    login = async (email, password) => {
        await this.auth.setPersistence(app.auth.Auth.Persistence.LOCAL);
        await this.auth.signInWithEmailAndPassword(email, password)
    };
    logoff = () => this.auth.signOut();
    
}

export default AuthClient;