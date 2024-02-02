import React, { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Timer() {
    const ref = useRef(null);
    const [timer, setTimer] = useState("00:00");
    const navigate = useNavigate();
    
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
                navigate('/game-over-loser');
            });
        };
    };

    const clearTimer = (e) => {
        setTimer("01:00");
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
        deadline.setSeconds(deadline.getSeconds() + 60);
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