import BasicAppClient from "../BasicAppClient";
import firebase from "firebase/app";
import { MESSAGES } from "../../constants/collections";

class ChatAppClient extends BasicAppClient {
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

    getMessagesQuery(projectID) {
        return firebase
            .firestore()
            .collection(MESSAGES)
            .where('projectID', '==', projectID)
            .orderBy('timestamp');
    }
}

export default ChatAppClient;