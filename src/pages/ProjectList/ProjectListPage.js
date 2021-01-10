import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProjectList from './ProjectList';
import * as DUMMY_DATA from '../../constants/dummyData'


export default function ProjectListPage() {
    return (
        <div>
            <Navbar/>
            <ProjectList db={DUMMY_DATA.DB}/>
        </div>
    )
}
