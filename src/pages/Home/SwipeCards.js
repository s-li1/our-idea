import React, { useState, useEffect, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import firebase from "firebase/app";
import { PROJECTS } from "../../constants/collections";

import '../../components/Cards/SwipeCard/SwipeCards.css';
import Members from '../../components/Buttons/Members/Members';

export default function SwipeCards({ appClient }) {
    const [ myProjects, setMyProjects ] = useState([]);
    const [ projects, setProjects ] = useState([]);

    const userID = appClient.auth.currentUser.uid;

    useEffect(() => {
        async function fetchData() {
            const myProjs = await appClient.getMyProjects();
            const user = await appClient.getUser(userID);

            setMyProjects(myProjs);

            const unsubscribe = firebase
                .firestore()
                .collection(PROJECTS)
                .where('timestamp', '>', user.lastProjectTimestamp)
                .orderBy('timestamp', 'desc')
                .onSnapshot(async (snapshot) => {
                    setProjects(snapshot.docs.map((doc) => doc.data()).filter(p => p.createdBy !== userID 
                                                                                && p.currentMembers < p.maxMembers 
                                                                                && !myProjects.includes(p.projectID)));
                });

            return () => {
                unsubscribe();
            };
        }
        fetchData();
        
    }, [appClient, myProjects, userID]);

    let childRefs = useMemo(() => Array(projects.length).fill(0).map(i => React.createRef()), [projects]);

    const onSwipe = (projID, direction) => appClient.swipeProject(projID, direction); 

    const Xswipe = (dir) => {
        if (projects.length === 0) return;
        // TinderCard.swipe calls onSwipe handler
        childRefs.pop().current.swipe(dir); // Swipe the card!
    }

    return (
        <div className="cards SwipeCards">
            <div id="swipe-cards-container">
                {projects.map((proj, i) =>  <TinderCard
                                            ref={childRefs[i]} 
                                            className='swipe'
                                            onSwipe={(directionSwiped) => onSwipe(proj.projectID, directionSwiped)}
                                            flickOnSwipe={true}
                                            preventSwipe={['up', 'down']}
                                            key={proj.projectID}>
                                        <div className='swipe-card'>
                                            <div className="swipe-card-members"><Members proj={proj} locked={true}/></div>
                                            <img className="swipe-card-thumbnail" src="logo192.png" alt=""></img>
                                            <div className="swipe-card-name">
                                                {proj.name}
                                            </div>
                                            <div className="swipe-card-text">
                                                <p>{proj.description}</p>
                                            </div>
                                        </div>
                                        </TinderCard>)}
                {(projects.length === 0) ? <div id="no-projs-msg">No projects were found.</div> : null}
            </div>
            {/* <div className="buttons">
                <IconButton onClick={() => Xswipe('left')}>
                    <CloseIcon style={{ fontSize: 40, color: "#E86767" }}/>
                </IconButton>
                <div id="btn-padding"></div>
                <IconButton className="right-btn" onClick={() => Xswipe('right')}>
                    <DoneIcon className="right-btn" style={{ fontSize: 40, color: "#A7D5B1" }} />
                </IconButton>
            </div> */}
        </div>
    );
}