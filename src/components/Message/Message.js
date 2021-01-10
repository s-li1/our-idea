import React, { useContext } from 'react';
import './Message.css';
import { FirebaseContext } from '../../components/Firebase';
import {ChatAppClient} from '../../clients/ChatAppClient/ChatAppClient';
import { SessionContext } from '../../components/Session';


function Message(props) {
  
  const { message: { text, senderID } } = props;
  const client = useContext(FirebaseContext);
  const userID = client.auth.currentUser.uid;
  console.log(userID);
  const isSender = senderID === userID ? 'sent' : 'received';

  return (
    <div className={`message ${isSender}`}>
      <p>{text}</p>
    </div>
  );
}

export default Message;