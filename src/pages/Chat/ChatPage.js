import React, { useContext, useRef, useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom';
import MessageBar from '../../components/MessageBar/MessageBar';
import Message from '../../components/Message/Message';
import firebase from "firebase/app";
import { MESSAGES } from "../../constants/collections";
import './ChatPage.css'
export default function ChatPage() {
    const [messages, setMessages] = useState([]);
    const { id } = useParams(); // project id

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection(MESSAGES)
            .where('projectID', '==', id)
            .orderBy('timestamp')
            .onSnapshot((snapshot) => {
            setMessages(snapshot.docs.map((doc) => doc.data()));
            });
    
        return () => {
          unsubscribe();
        };
      }, []);

    return (
        <div className="screen-container">
            <Navbar />
            <div className="messages-container">
                {messages && messages.map((m, i) => <Message key={m.timestamp} message={m}/>)}
            </div>
                <MessageBar projectID={id}/>
        </div>
    )
}
