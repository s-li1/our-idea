import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import SwipeCards from '../../components/Cards/SwipeCards'
import * as DUMMY_DATA from '../../constants/dummyData'

export default function HomePage() {
    return (
        <div>
            <Navbar/>
            <SwipeCards db={DUMMY_DATA.DB}/>
        </div>
    )
}
