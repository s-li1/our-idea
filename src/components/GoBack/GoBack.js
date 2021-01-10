import React from 'react'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Link } from 'react-router-dom';
export default function GoBack({route}) {
    return (
        <Link to={route}>
        <AiOutlineArrowLeft size={40} className="back-link"/>
        </Link>
    )
}
