import {RIGHT} from "../../constants/swipeActions";
import {USERS, PROJECTS, MATCHES} from "../../constants/collections";
import firebase from "firebase/app";

import {v1 as uuidv1} from 'uuid';
import AuthClient from "../AuthClient/AuthClient";

import '../../types/Match';
import '../../types/User';
import '../../types/Project';

class BasicAppClient extends AuthClient {

    /**
     * A timestamp unique to this user (used for tie breaks)
     * @returns {string}
     */
    createUIDTimestamp = () => `${new Date().getTime().toString().padEnd(10, "0")}_${this.auth.currentUser.uid}`;

    /**
     * Given project data, creates a project in the DB and returns the project ID.
     * @param {Project} project
     * @returns {Promise<string>} 
     */
    async createProject(project) {
        const projectID = uuidv1();
        await firebase
            .firestore()
            .collection(PROJECTS)
            .doc(projectID)
            .set({
                ...project, 
                projectID,
                timestamp: this.createUIDTimestamp(),
                createdBy: this.auth.currentUser.uid
            });

        /** @type {Match} */
        const match = { userID: this.auth.currentUser.uid, projectID };

        // Add the person direct to this project as a match
        await firebase
            .firestore()
            .collection(MATCHES)
            .add(match);

        return projectID;
    }

    /**
     * Returns an array of all projects the authenticated user is a part of.
     * @returns {Promise<Project[]>}
     */
    async getMyProjects() {
        const uid = this.auth.currentUser.uid;

        /** @type {Match[]} */
        const matches = await firebase
            .firestore()
            .collection(MATCHES)
            .where("userID", "==", uid)
            .get()
            .then(qs => qs.docs.map(d => /** @type {Match} */ (d.data())));
        
        console.log(matches);

        return (await Promise.all(matches.map(m => this.getProject(m.projectID))))
            .sort((a, b) => a.timestamp < b.timestamp ? -1 : 1);
    }

    /**
     * 
     * @param {string} projectID 
     * @returns {Promise<Project>}
     */
    async getProject(projectID) {
        return firebase
            .firestore()
            .collection(PROJECTS)
            .doc(projectID)
            .get()
            .then(res => /** @type {Project} */ (res.data()));
    }

    /**
     * Returns the next project the user should view.
     * @returns {Promise<Project>}
     */
    async getNextProject() {
        const uid = this.auth.currentUser.uid;
        const user = await firebase
            .firestore()
            .collection(USERS)
            .doc(uid)
            .get()
            .then(d => 
                /** @type {User} */ d.data()
            );
        
        // Grab all the projects we're currently in to avoid them
        const currentProjects = (await this.getMyProjects()).map(p => p.projectID);

        // Finally, grab the next project to show
        return /** @type {Promise<Project>} */ (firebase
            .firestore()
            .collection(PROJECTS)
            .where("timestamp", ">", user.lastProjectTimestamp)
            .orderBy("timestamp")
            .get()
            .then(qs => qs.docs
                .map(v => /** @type {Project} */ (v.data()))
                .filter(p => p.createdBy !== uid && !currentProjects.includes(p.projectID))[0]));
    }

    /**
     * Handles a swipe on the given project
     * @param {*} projectID 
     * @param {string} direction Taken from the SwipeAction object
     * @returns {Promise<void>}
     */
    async swipeProject(projectID, direction) {
        const uid = this.auth.currentUser.uid;

        // If we have a match, add this to the project matches collection
        if (direction === RIGHT) {
             /** @type {Match} */
            const match = {
                userID: uid,
                projectID
            };

            await firebase
                .firestore()
                .collection(MATCHES)
                .add(match);
        }

        // Grab the given project so we can grab the timestamp
        const project = await this.getProject(projectID);

        // Set our last swiped timestamp
        await firebase
            .firestore()
            .collection(USERS)
            .doc(uid)
            .update({ lastProjectTimestamp: project.timestamp });
    }

    /**
     * Given a user ID, returns all information associated with that user
     * @param {string} userID 
     * @returns {Promise<User>}
     */
    async getUser(userID) {
        return firebase
            .firestore()
            .collection(USERS)
            .doc(userID)
            .get()
            .then(d => 
                /** @type {User} */ (d.data())
            );
    }

    /**
     * Given a project ID, boots this user from that group.
     * @param {string} projectID
     */
    async removeUserFromProject(projectID) {
        const docs = await firebase
            .firestore()
            .collection(MATCHES)
            .where("projectID", "==", projectID)
            .where("userID", "==", this.auth.currentUser.uid)
            .get();
        docs.forEach(d => d.ref.delete());
    }
}

export default BasicAppClient;