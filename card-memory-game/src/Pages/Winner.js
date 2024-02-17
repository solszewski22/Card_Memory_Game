import React from 'react'
import { Link } from 'react-router-dom'

function Winner() {
    document.body.classList.add("back-trans");
    return (
        <div className="body-text game-over">
            <div className="wavy-text">
                <span style={{"--i":"1"}}>W</span>
                <span style={{"--i":"2"}}>I</span>
                <span style={{"--i":"3"}}>N</span>
                <span style={{"--i":"4"}}>N</span>
                <span style={{"--i":"5"}}>E</span>
                <span style={{"--i":"6"}}>R</span>
                <span style={{"--i":"7"}}>!</span>
            </div>
            <Link className="header-btn" to="/">Play Again</Link>
        </div>
    )
}

export default Winner;