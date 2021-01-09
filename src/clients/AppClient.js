import {RIGHT} from "../constants/swipeActions";
import {USERS, PROJECTS, MATCHES} from "../constants/collections";
import firebase from "firebase/app";

class AppClient {
    /**
     * Given project data, creates a project in the DB and returns the project ID.
     * @param {*} projectData 
     */
    async createProject(projectData) {
        return firebase
            .firestore()
            .collection(PROJECTS)
            .add(projectData)
            .then(qs => qs.id);
    }

    /**
     * Returns an array of all projects the authenticated user is a part of.
     */
    async viewProjects() {
        const uid = firebase.auth().currentUser.uid;
        const projectIDs = await firebase
            .firestore()
            .collection(MATCHES)
            .where("userID", "==", uid)
            .get()
            .then(qs => qs.docs.map(d => d.id));
        return firebase
            .firestore()
            .collection(PROJECTS)
            .where("projectID", 'in', projectIDs)
            .get()
            .then(qs => qs.docs.map(d => d.data()));
    }

    /**
     * Returns the next project the user should view.
     */
    async getNextProject() {
        const uid = firebase.auth().currentUser.uid;
        const user = await firebase
            .firestore()
            .collection(USERS)
            .doc(uid)
            .get()
            .then(d => {
                if (!d.exists) throw new Error("DNE");
                return d.data();
            });
        return firebase
            .firestore()
            .collection(PROJECTS)
            .where("projectID", ">", user.lastProjectID)
            .orderBy("projectID")
            .get()
            .then(qs => qs.docs[0].data());
    }

    /**
     * Handles a swipe on the given project
     * @param {*} projectID 
     * @param {string} direction Taken from the SwipeAction object
     */
    async swipeProject(projectID, direction) {
        const uid = firebase.auth().currentUser.uid;

        // If we have a match, add this to the project matches collection
        if (direction === RIGHT) {
            await firebase
                .firestore()
                .collection(MATCHES)
                .add({
                    userID: uid,
                    projectID
                });
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
     */
    async viewUser(userID) {
        return firebase
            .firestore()
            .collection(USERS)
            .doc(userID)
            .get()
            .then(d => d.data());
    }
}

export default AppClient;