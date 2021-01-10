import React, { useContext, useRef, useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../../components/Firebase';
import { useParams } from 'react-router-dom';
import ChatAppClient from '../../clients/ChatAppClient/ChatAppClient';
import MessageBar from '../../components/MessageBar/MessageBar';
import Message from '../../components/Message/Message';
import firebase from "firebase/app";
import { MESSAGES } from "../../constants/collections";


export default function ChatPage({appClient}) {
    const client = useContext(FirebaseContext);
    const dummy = useRef();

    const [formValue, setFormValue] = useState('');
    const [messages, setMessages] = useState([]);
    const { id } = useParams(); // project-id

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
          // This is cleanup...
          unsubscribe();
        };
      }, []);
      
    // @ts-ignore
    console.log(messages);
    

    return (
        <div className="screen-container">
            <Navbar />
            <div className="messages">
                {messages && messages.map((m, i) => <Message key={m.timestamp} message={m}/>)}
            </div>
                <MessageBar projectID={id}/>
        </div>
       
    )
}
