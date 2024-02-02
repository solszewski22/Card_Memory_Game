import React from 'react'
import {Link, useNavigate} from 'react-router-dom'

function Home(props){
    const navigate = useNavigate();
    const playGame=(retVal)=>{
        navigate('/play',{state:{withTimer: retVal}});
          }

    return (
        <div className="header body-text">
            <h1 className="header-title">{props.headerTitle}</h1>
            <button className="header-btn" onClick={() => playGame(true)}>Play Timed</button>
            <button className="header-btn" onClick={() => playGame(false)}>{props.btnTitle}</button>
        </div>
    )
}

export default Home;