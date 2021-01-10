import {RIGHT} from "../../constants/swipeActions";
import {USERS, PROJECTS, MATCHES} from "../../constants/collections";
import firebase from "firebase/app";

import {v1 as uuidv1} from 'uuid';
import Firebase from "../Firebase/Firebase";

class AppClient extends Firebase {

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
        const uuid = uuidv1();
        await firebase
            .firestore()
            .collection(PROJECTS)
            .doc(uuid)
            .set({
                ...project, 
                projectID: uuidv1(),
                timestamp: this.createUIDTimestamp()
            });

        /** @type {Match} */
        const match = { userID: this.auth.currentUser.uid, projectID: uuid };

        // Add the person direct to this project as a match
        await firebase
            .firestore()
            .collection(MATCHES)
            .add(match);

        return uuid;
    }

    /**
     * Returns an array of all projects the authenticated user is a part of.
     * @returns {Promise<Project[]>}
     */
    async getMyProjects() {
        const uid = this.auth.currentUser.uid;

        // Find all the matches
        const projectIDs = await firebase
            .firestore()
            .collection(MATCHES)
            .where("userID", "==", uid)
            .get()
            .then(qs => qs.docs.map(d => 
                (/** @type {Match} */ (d.data())).projectID)
            );

        // Using the IDS, finally grab the project data
        return firebase
            .firestore()
            .collection(PROJECTS)
            .where("projectID", 'in', projectIDs)
            .get()
            .then(qs => qs.docs.map(d => 
                /** @type {Project} */ (d.data()))
            );
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
            .where("projectID", "==", projectID)
            .get()
            .then(res => /** @type {Project} */ (res.docs[0].data()));
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

        // Finally, grab the next project to shows
        return /** @type {Promise<Project>} */ (firebase
            .firestore()
            .collection(PROJECTS)
            .where("timestamp", ">", user.lastProjectTimestamp)
            .orderBy("timestamp")
            .get()
            .then(qs => qs.docs.filter(v => !currentProjects.includes(v.data().projectID))[0].data()));
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
}

export default AppClient;