import React from 'react'
import { Link } from 'react-router-dom'

function Loser() {
    return (
        <div className="body-text">
            <h1 className="header-title">Game Over</h1>
            <Link className="header-btn" to="/">Play Again</Link>
        </div>
    )
}

export default Loser;