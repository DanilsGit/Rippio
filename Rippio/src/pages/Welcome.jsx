import { useEffect, useState } from "react";
import './welcome.css'

export function Welcome() {

    const [firstTime, setFirstTime] = useState(window.localStorage.getItem('firstTime'))

    const firstTimeFunction = () => {
        document.querySelector('.welcome').classList.add('WelcomeHidden')
        window.localStorage.setItem('firstTime', true)
        setTimeout(() => {
            setFirstTime(true)
            document.body.style.overflowY = 'auto';
        }, 500)
    }

    useEffect(() => {
        if (firstTime === null) {
            document.body.style.overflowY = 'hidden';
        }
    })

    return (
        <div style={
            {
                display: firstTime ? 'none' : 'flex',
                filter: firstTime ? 'brightness(1)' : 'brightness(0.8)'
            }
            } className="welcome">
            <div className="welcome-content">
            <h1>Bienvenido a Rippio</h1>
            <p>Tus comidas favoritas en un solo lugar</p>
            <button className="welcome-content-btn" onClick={firstTimeFunction}>Continuar</button>
            </div>
            <div className="welcome-img">
            <img width='200px' src="/icons/rippioFoodHappyIcon.png"></img></div>
        </div>
    )
}