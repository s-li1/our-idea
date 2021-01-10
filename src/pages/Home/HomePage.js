import React from 'react'
import Navigation from '../../components/Navigation/Navigation'
import SwipeCards from '../../components/Cards/SwipeCards'
import * as DUMMY_DATA from '../../constants/dummyData'

export default function HomePage() {
    return (
        <div>
            <Navigation/>
            <h1>Home</h1>
            <SwipeCards db={DUMMY_DATA.DB}/>
        </div>
    )
}
