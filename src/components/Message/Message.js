import React from 'react'
import './Message.css';

function Message ({ message: { text, user }, name }) {
  let isSentByCurrentUser = name === user ? true : false;
  //let isSentByCurrentUser = false;
  return (
    isSentByCurrentUser
      ? (
        <div className="messageContainer justifyEnd">
          <div className="messageBox backgroundSent">
            <p className="messageText">{text}</p>
          </div>
          <p className="sentText pr-10">{name}</p>
        </div>
        )
        : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundReceived">
              <p className="messageText">{text}</p>
            </div>
            <p className="sentText pl-10">{user.name}</p>
          </div>
        )
  );
}

export default Message;