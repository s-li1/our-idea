import {LEFT, RIGHT} from "../constants/swipeActions";
import * as firebase from "firebase/app";

class AppClient {
    /**
     * @type {}
     */
    db;

    AppClient() {
        this.db = firebase.default.firestore();
    }

    /**
     * Given project data, creates a project in the DB and returns the project ID.
     * @param {*} projectData 
     */
    async createProject(projectData) {
        return "";
    }

    /**
     * Returns an array of all projects the authenticated user is a part of.
     */
    async viewProjects() {
        return [];
    }

    /**
     * Returns the next project the user should view.
     */
    async getNextProject() {
        return {};
    }

    /**
     * Handles a swipe on the given project
     * @param {*} projectID 
     * @param {string} direction Taken from the SwipeAction object
     */
    async swipeProject(projectID, direction) {
        switch (direction) {
            case LEFT:
            case RIGHT:
            default:
        }
    }

    /**
     * Given a user ID, returns all information associated with that user
     * @param {number} userID 
     */
    async viewUser(userID) {
        return {};
    }
}

export default AppClient;