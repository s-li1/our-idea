import React, { useContext } from 'react';
import './Message.css';
import { FirebaseContext } from '../../components/Firebase';
import {ChatAppClient} from '../../clients/ChatAppClient/ChatAppClient';
import { SessionContext } from '../../components/Session';

function Message(props) {
  const { message: { text, senderID } } = props;
  const { session: { userID } } = useContext(SessionContext);

  return (
    <div>
      {senderID === userID ? 
      <div className="messageContainer justfyEnd">
        <div className="messageBox backgroundPurple">
          <p className="messageText white">{text}</p>
        </div>
      </div> : 
      <div className= "messageContainer justifyStart">
        <div className="messageBox backgroundLight">
          <p className="messageText dark">{text}</p>
        </div>
      </div>}
    </div>
  );
}

export default Message;