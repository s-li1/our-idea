import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SwipeCards from './SwipeCards'
// import * as DUMMY_DATA from '../../constants/dummyData'
import { FirebaseContext } from '../../components/Firebase'

export default function HomePage() {
    return (
        <div className="screen-container">
            <Navbar/>
            {/* <SwipeCards db={DUMMY_DATA.DB}/> */}
            <FirebaseContext.Consumer>
                {BasicAppClient => <SwipeCards appClient={BasicAppClient}/>}
            </FirebaseContext.Consumer>
        </div>
    )
}
