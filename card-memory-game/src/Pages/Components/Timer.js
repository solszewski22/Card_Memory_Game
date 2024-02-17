import React, { useRef, useState, useEffect, useContext } from 'react'
import { GameContext } from './GameContext'

function Timer() {
    const routeRedirect = useContext(GameContext);

    const ref = useRef(null);
    const [timer, setTimer] = useState("00:00");
    
    const getTimeRemaining = (e) => {
        const totalTime = Date.parse(e) - Date.parse(new Date());
        const seconds = Math.floor((totalTime / 1000) % 60);
        const minutes = Math.floor((totalTime / 1000 / 60) % 60);

        return {totalTime, minutes, seconds};
    };

    const startTimer = (e) => {
        let {totalTime, minutes, seconds} = getTimeRemaining(e);
        if(totalTime >= 0){
            setTimer((minutes > 9 ? minutes : "0" + minutes) + ":" + (seconds > 9 ? seconds : "0" + seconds));
            if(totalTime === 5000){
                document.getElementById('timer').classList.toggle('timer_blink');
            }
        }
        else{
            setTimeout(() => {
                routeRedirect.setShouldRedirect('/game-over-loser');
            });
        };
    };

    const clearTimer = (e) => {
        setTimer("00:20");
        if(ref.current) {
            clearInterval(ref.current);
        }
        const id = setInterval(() => {
            startTimer(e);
        }, 1000);
        ref.current = id;
    }

    const getDeadTime = () => {
        let deadline = new Date();
        deadline.setSeconds(deadline.getSeconds() + 20);
        return deadline;
    };

    useEffect(() => {
        clearTimer(getDeadTime());
    }, []);

    return(
        <div className='timer' id='timer'>{timer}</div>
    )
}

export default Timer;