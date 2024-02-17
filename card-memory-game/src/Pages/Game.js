// import React, { useState, useEffect } from 'react'
// import { Navigate } from 'react-router-dom'

import React, { useState } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import Board from './Components/Board';
import Timer from './Components/Timer';
import { GameContext } from './Components/GameContext';



function Game(props){
    const location = useLocation();
    const[shouldRedirect, setShouldRedirect] = useState(false);

    return(
        <GameContext.Provider value={{shouldRedirect, setShouldRedirect}}>
            <Board cards={props.cards}/>
            {location.state.withTimer ? (
                <Timer />
            ) : null}
            {shouldRedirect ? (
                <Navigate to={shouldRedirect} />
            ) : null}
        </GameContext.Provider>
    )
}

export default Game;