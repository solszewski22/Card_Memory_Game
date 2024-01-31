import React from 'react'
import {Link} from 'react-router-dom'

function Home(props){
    return (
        <div className="header">
            <h1 className="header-title">{props.headerTitle}</h1>
            <Link className="header-btn" to="/play">{props.btnTitle}</Link>
        </div>
    )
}

export default Home;