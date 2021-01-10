import React, { useState, useMemo } from 'react';
import TinderCard from 'react-tinder-card';

import { IconButton } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

import './SwipeCards.css';
// import AppClient from '../AppClient/AppClient';

const alreadyRemoved = [];

export default function SwipeCards(props) {
    let projectsState = props.db;

    const [ projects, setProjects ] = useState(props.db);
    const [ lastDirection, setLastDirection ] = useState();
    const [ topCardIndex, setTopCardIndex ] = useState(projects.length - 1);

    const childRefs = useMemo(() => Array(projects.length).fill(0).map(i => React.createRef()), [projects]);

    const onSwipe = async (projID, direction) => {
        console.log(`You swiped ${direction} on ${projID}`);
        setLastDirection(direction);
        alreadyRemoved.push(projID);
        setTopCardIndex(topCardIndex - 1);

        // let client = new AppClient();
        // await client.swipeProject(projID, direction);
    }

    const swipe = (dir) => {
        if (alreadyRemoved.length === projects.length) return;
        childRefs[topCardIndex].current.swipe(dir) // Swipe the card!
    }

    return (
        <div className="cards SwipeCards">

            <div id="swipe-cards-container">
                {projects.map((proj, i) =>  <TinderCard
                                            ref={childRefs[i]} 
                                            className='swipe'
                                            onSwipe={(directionSwiped) => onSwipe(proj.id, directionSwiped)}
                                            flickOnSwipe={true}
                                            preventSwipe={['up', 'down']}
                                            key={proj.id}>
                                        <div className='swipe-card'>
                                            <img className="swipe-card-thumbnail" src={proj.img} alt=""></img>
                                            <div className="swipe-card-name">
                                                {proj.name}
                                            </div>
                                            <div className="swipe-card-text">
                                                <p>{proj.desc}</p>
                                            </div>
                                        </div>
                                        </TinderCard>)}
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