import { Modal } from "@material-ui/core";
import firebase from "firebase";
import React, { useContext, useEffect, useState } from "react"
import { MATCHES } from "../../constants/collections";
import UserCard from "../Cards/UserCard/UserCard";
import { FirebaseContext } from "../Firebase";
import Spinner from "../Spinner/Spinner";

import "./MemberModal.css";

function MemberModal({projectID, open, handleClose}) {
    const client = useContext(FirebaseContext);

    /** @type {[User[], any]} */
    const [members, setMembers] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection(MATCHES)
            .where('userID', '==', client.auth.currentUser.uid)
            .where('projectID', '==', projectID)
            .onSnapshot(async (snapshot) => {
                const matches = snapshot.docs.map((doc) => doc.data());
                setMembers(await Promise.all(matches.map(m => client.getUser(m.userID))));
            });
    
        return unsubscribe;
      }, [projectID, client]);

    return <Modal open={open} onClose={handleClose} className="modal">
        {!members ? <Spinner /> : <> {members.map(m => <UserCard user={m}/>)} </>}
    </Modal> 
}

export default MemberModal;