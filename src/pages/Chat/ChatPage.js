import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../../components/Firebase';
import { useParams } from 'react-router-dom';
import MessageBar from '../../components/MessageBar/MessageBar';
import Message from '../../components/Message/Message';

export default function ChatPage() {
    const client = useContext(FirebaseContext);
    // @ts-ignore
    const { id } = useParams();
    const [messages] = useCollectionData(client.getMessagesQuery(id), { idField: 'id' });

    return <div>
                <Navbar />
                <div>
                    {messages && messages.map((m, i) => <Message key={i} message={m} name="TODO"/>)}
                    <MessageBar projectID={id}/>
                </div>
            </div>;
}
