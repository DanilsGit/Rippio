/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './informationAside.css'

export function InformationAside({ name, direction, schedule, rating, logo, banner }) {

    const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth < 700);
    const [showSchedule, setShowSchedule] = useState(true);

    const handleShowSchedule = () => {
        schedule = document.querySelector('.RestaurantPage-content-aside-information-schedule-days');
        schedule.classList.toggle('RestaurantPage-content-aside-information-schedule-days-active');
        setShowSchedule(!showSchedule);
    }

    useEffect(() => {

        const checkScreenSize = () => {
            setIsScreenSmall(window.innerWidth < 700);
            if (window.innerWidth > 700) {
                setShowSchedule(true);
            } else {
                setShowSchedule(false);
            }
        };
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);



    return (
        <aside className='RestaurantPage-content-aside'>
            {
                isScreenSmall
                    ?
                    <section className='RestaurantPage-content-aside-presentation'>
                        <div className='aside-presentation-bannerAndLogo'>
                            <img draggable='false' className='aside-presentation-banner' src={banner} alt='Banner'></img>
                            <div>
                                <img draggable='false' className='aside-presentation-logo' src={logo} alt='Logo'></img>
                                <h1 className='aside-presentation-name'>{name}</h1>
                            </div>
                        </div>
                    </section>
                    :
                    <section className='RestaurantPage-content-aside-presentation'>
                        <div className='aside-presentation-bannerAndLogo'>
                            <img draggable='false' className='aside-presentation-banner' src={banner} alt='Banner'></img>
                            <img draggable='false' className='aside-presentation-logo' src={logo} alt='Logo'></img>
                        </div>
                        <h1 className='aside-presentation-name'>{name}</h1>
                    </section>
            }
            <section className='RestaurantPage-content-aside-information'>
                <p>{direction}</p>
                <section className='RestaurantPage-content-aside-information-stats'>
                    <div>Delivery <span>10 min</span></div>
                    <div>Envío <span>$3000</span></div>
                    <div>Calificación <span className='RestaurantPage-content-aside-information-stats-rating'>
                    <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2Fstar.png?alt=media&token=3b3b3b7b-4b3b-4b3b-8b3b-3b3b3b3b3b3b' alt='Star'></img>
                    {rating}</span></div>
                </section>
                <section className='RestaurantPage-content-aside-information-schedule'>
                    <button
                        className='RestaurantPage-content-aside-information-schedule-btn'
                        onClick={handleShowSchedule}
                    >
                        Horarios
                        {
                            isScreenSmall
                                ? showSchedule
                                    ? <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FupArrow.png?alt=media&token=9a1a8d3a-4d3a-4e0c-9e3a-0e8c9a1b3f7d' alt='Arrow'></img>
                                    : <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdownArrow.png?alt=media&token=2eb9a78a-94b0-4c11-b2c0-41788a4f46cc' alt='Arrow'></img>
                                : showSchedule
                                    ? <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FupArrow.png?alt=media&token=9a1a8d3a-4d3a-4e0c-9e3a-0e8c9a1b3f7d' alt='Arrow'></img>
                                    : <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdownArrow.png?alt=media&token=2eb9a78a-94b0-4c11-b2c0-41788a4f46cc' alt='Arrow'></img>
                        }
                    </button>
                    <div className={
                        isScreenSmall
                            ?
                            'RestaurantPage-content-aside-information-schedule-days'
                            :
                            'RestaurantPage-content-aside-information-schedule-days RestaurantPage-content-aside-information-schedule-days-active'
                    }
                    >
                        {
                            schedule
                                ? schedule.map((day, index) => {
                                    return (
                                        <div className='RestaurantPage-content-aside-information-schedule-day' key={index}>

                                            {
                                                (day.open === '00:00' && day.close === '00:00')
                                                    ? <>
                                                        <span>{day.day}</span>
                                                        <span>Cerrado</span>
                                                    </>
                                                    : <>
                                                        <span>{day.day}</span>
                                                        <span>{day.open} - {day.close}</span>
                                                    </>
                                            }
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                </section>
            </section>
        </aside>
    )
}