import React, { useState, useEffect, useContext } from 'react'
import { GameContext } from './GameContext';

let numOfPairs = 0;

function Board(props){ 
    const routeRedirect = useContext(GameContext);

    const [activeCardOne, setActiveCardOneState] = useState(0);
    const [activeCardTwo, setActiveCardTwoState] = useState(0);

    const handleClick = e => {
        if(activeCardOne === 0){
            setActiveCardOneState(e.currentTarget.id);
            document.getElementById(e.currentTarget.id).classList.toggle('is-flipped');
        }
        else {
            if(activeCardTwo !== 0){
                document.getElementById(activeCardOne).classList.toggle('is-flipped');
                document.getElementById(activeCardTwo).classList.toggle('is-flipped');

                setActiveCardOneState(e.currentTarget.id);
                document.getElementById(e.currentTarget.id).classList.toggle('is-flipped');

                setActiveCardTwoState(0);
            }
            else{
                setActiveCardTwoState(e.currentTarget.id);
                document.getElementById(e.currentTarget.id).classList.toggle('is-flipped');
            }

        }
    }

    const isMatch = () => {
        new Promise(resolve => {
            if(activeCardOne && activeCardTwo !== 0){
                if((parseInt(activeCardTwo) - 10 === parseInt(activeCardOne)) || (parseInt(activeCardTwo) + 10 === parseInt(activeCardOne))){
                    setTimeout(() => {
                        numOfPairs++;
                        document.getElementById(activeCardOne).classList.toggle('fade-out');
                        document.getElementById(activeCardTwo).classList.toggle('fade-out');
                        if(numOfPairs === ((props.cards.length / 2))){
                            routeRedirect.setShouldRedirect('/game-over-winner');
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
        // <div>
            <div className="grid">
                <div className="grid-container">
                    {props.cards.map(card => {
                        return (
                            <div className="card" id={card.id} key={card.id} onClick={handleClick}>
                                <div className="card-inner">
                                    <div className="card-back">
                                        <img id={`img-${card.id}`} src={`images/${card.imgURL}`} height="50" width="auto" alt="card-img"/>
                                        <div>
                                            <h4 id={`title-${card.id}`}><b>{card.title}</b></h4>
                                        </div>
                                    </div>
                                    <div className="card-front"></div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
    )
}

export default Board;