import React from 'react'
import { Link } from 'react-router-dom'

function GameFinished() {
    return (
        <div className="body-text">
            <div className="wavy-text">
                <span style={{"--i":"1"}}>W</span>
                <span style={{"--i":"2"}}>I</span>
                <span style={{"--i":"3"}}>N</span>
                <span style={{"--i":"4"}}>N</span>
                <span style={{"--i":"5"}}>E</span>
                <span style={{"--i":"6"}}>R</span>
                <span style={{"--i":"7"}}>!</span>
            </div>
            {/* <h1 className="header-title">YOU WIN!</h1> */}
            <Link className="header-btn" to="/play">Play Again</Link>
        </div>
    )
}

export default GameFinished;