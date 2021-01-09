import {RIGHT} from "../constants/swipeActions";
import {USERS, PROJECTS, MATCHES} from "../constants/collections";
import firebase from "firebase/app";

class AppClient {
    /**
     * Given project data, creates a project in the DB and returns the project ID.
     * @param {Project} project
     * @returns {Promise<string>} 
     */
    async createProject(project) {
        return firebase
            .firestore()
            .collection(PROJECTS)
            .add(project)
            .then(qs => qs.id);
    }

    /**
     * Returns an array of all projects the authenticated user is a part of.
     * @returns {Promise<Project[]>}
     */
    async viewProjects() {
        const uid = firebase.auth().currentUser.uid;
        const projectIDs = await firebase
            .firestore()
            .collection(MATCHES)
            .where("userID", "==", uid)
            .get()
            .then(qs => qs.docs.map(d => 
                (/** @type {Match} */ (d.data())).projectID)
            );

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
     * Returns the next project the user should view.
     * @returns {Promise<Project>}
     */
    async getNextProject() {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase
            .firestore()
            .collection(USERS)
            .doc(uid)
            .get()
            .then(d => 
                /** @type {User} */ d.data()
            );

        return firebase
            .firestore()
            .collection(PROJECTS)
            .where("projectID", ">", user.lastProjectID)
            .orderBy("projectID")
            .get()
            .then(qs => 
                /** @type {Project} */ (qs.docs[0].data())
            );
    }

    /**
     * Handles a swipe on the given project
     * @param {*} projectID 
     * @param {string} direction Taken from the SwipeAction object
     * @returns {Promise<void>}
     */
    async swipeProject(projectID, direction) {
        const uid = firebase.auth().currentUser.uid;

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

        // Increment the user project ID (do we have to do that in a transaction?)
        await firebase
            .firestore()
            .collection(USERS)
            .doc(uid)
            .update({
                lastProjectID: projectID
            });
    }

    /**
     * Given a user ID, returns all information associated with that user
     * @param {string} userID 
     * @returns {Promise<User>}
     */
    async viewUser(userID) {
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