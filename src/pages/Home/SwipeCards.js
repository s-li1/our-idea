import React, { useState, useEffect, useMemo } from 'react';
import TinderCard from 'react-tinder-card';
import { IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import firebase from "firebase/app";
import { PROJECTS } from "../../constants/collections";

import './SwipeCards.css';

const alreadyRemoved = [];

export default function SwipeCards({ appClient }) {
    const [ myProjects, setMyProjects ] = useState([]);
    const [ projects, setProjects ] = useState([]);
    const userID = appClient.auth.currentUser.uid;

    // TODO: component something outside of component...
    useEffect(() => {
        async function fetchData() {
            const myProjs = await appClient.getMyProjects();
            setMyProjects(myProjs);

            const unsubscribe = firebase
                .firestore()
                .collection(PROJECTS)
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
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

    const [ topCardIndex, setTopCardIndex ] = useState(projects.length - 1);

    const childRefs = useMemo(() => Array(projects.length).fill(0).map(i => React.createRef()), [projects]);

    const onSwipe = async (projID, direction) => {
        alreadyRemoved.push(projID);
        setTopCardIndex(topCardIndex - 1);
        await appClient.swipeProject(projID, direction); // TODO: check that the project list page updates
    }

    const swipe = (dir) => {
        console.log(`You hit the ${dir} button on ${topCardIndex}`);
        if (alreadyRemoved.length === projects.length || projects.length === 0) return;

        // TinderCard.swipe calls onSwipe handler
        childRefs[topCardIndex].current.swipe(dir); // Swipe the card!
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
            <div className="buttons">
                <IconButton onClick={() => swipe('left')}>
                    <CloseIcon style={{ fontSize: 40, color: "#E86767" }}/>
                </IconButton>
                <div id="btn-padding"></div>
                <IconButton className="right-btn" onClick={() => swipe('right')}>
                    <DoneIcon className="right-btn" style={{ fontSize: 40, color: "#A7D5B1" }} />
                </IconButton>
            </div>
        </div>
    );
}