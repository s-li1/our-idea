import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { FirebaseContext } from '../../components/Firebase';
import { useParams } from 'react-router-dom';
import { Message, MessageBar } from '../../components/Message';

export default function ChatPage() {
    const client = useContext(FirebaseContext);
    // @ts-ignore
    const { id } = useParams();
    const [messages] = useCollectionData(client.getMessagesQuery(id), { idField: 'id' });

    return <div>
                <Navbar />
                <div>
                    <div>
                        {messages.map((m, i) => <Message key={i} message={m}/>)}
                    </div>
                    <MessageBar />
                </div>
            </div>;
}
