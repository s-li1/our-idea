import BasicAppClient from "../BasicAppClient";
import firebase from "firebase/app";
import { MESSAGES } from "../../constants/collections";

class ChatAppClient extends BasicAppClient {
    /**
     * 
     * @param {string} projectID 
     * @param {string} text 
     */
    async sendMessage(projectID, text) {
        /** @type {import("../../types/Message").Message} */
        const message = {
            senderID: this.auth.currentUser.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            projectID,
            text
        };

        await firebase
            .firestore()
            .collection(MESSAGES)
            .add(message);
    }

    /**
     * 
     * @param {string} projectID 
     */
    getMessagesQuery(projectID) {
        return firebase
            .firestore()
            .collection(MESSAGES)
            .where('projectID', '==', projectID)
            .orderBy('timestamp');
    }
}

export default ChatAppClient;