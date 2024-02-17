import React from 'react'
import {useNavigate} from 'react-router-dom'

function Home(props){
    const navigate = useNavigate();
    const playGame = (retVal)=>{
        navigate('/play', {state:{'withTimer': retVal}});
    }

    let i = 1;
    while( i === 1){
        window.location.reload();
        i++;
    }

    return (
        <div class="header-container">
            <div className="header body-text">
                <h1 className="header-title">{props.headerTitle}</h1>
                <button className="header-btn" onClick={() => playGame(false)}>Play</button>
                <button className="header-btn" onClick={() => playGame(true)}>Play Timed</button>
            </div>
        </div>
    )
}

export default Home;