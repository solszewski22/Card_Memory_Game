import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

let numOfPairs = 0;

function Game(props){
    const [activeCardOne, setActiveCardOneState] = useState(0);
    const [activeCardTwo, setActiveCardTwoState] = useState(0);
    const [shouldRedirect, setShouldRedirect] = useState(false);


    const handleClick = e => {
        if(activeCardOne === 0){
            setActiveCardOneState(e.currentTarget.id);
        }
        else {
            if(activeCardTwo !== 0){
                setActiveCardOneState(e.currentTarget.id);
                setActiveCardTwoState(0);
            }
            else{
                setActiveCardTwoState(e.currentTarget.id);
            }

        }
    }

    const isMatch = () => {
        new Promise(resolve => {
            if(activeCardOne && activeCardTwo !== 0){
                if((parseInt(activeCardTwo) - 10 === parseInt(activeCardOne)) || (parseInt(activeCardTwo) + 10 === parseInt(activeCardOne))){
                    setTimeout(() => {
                        numOfPairs++;
                        console.log("Adding to Pair Count.");
                        document.getElementById(activeCardOne).style.visibility = "hidden";
                        document.getElementById(activeCardTwo).style.visibility = "hidden";
                        if(numOfPairs === ((props.cards.length / 2))){
                            setShouldRedirect(true);
                        }
                    }, 1000)
                }
            }
            resolve();
        })
        
    };

    useEffect(() => {
        isMatch();
    }, [activeCardOne, activeCardTwo]);
    
    return (
        <div className="grid">
            <div className="grid-container">
                {props.cards.map(card => {
                    return (
                        <div className={`${((card.id == activeCardOne) || (card.id == activeCardTwo)) ? "showingCard" : "faceDownCard"}`} key={card.id} id={card.id} onClick={handleClick}>
                            <img id={`img-${card.id}`} src={`images/${card.imgURL}`} height="50" width="auto" alt="card-img"/>
                            <div>
                                <h4 id={`title-${card.id}`}><b>{card.title}</b></h4>
                            </div>
                            {shouldRedirect ? (
                                <Navigate to="/complete" />
                            ) : null}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Game;