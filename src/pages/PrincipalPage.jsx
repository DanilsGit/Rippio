import { SearchSection } from '../components/principalPage/searchSection/SearchSection'
import { CarouselImage } from "../components/principalPage/promoSection/CarouselImage";
import { Categories } from "../components/principalPage/promoSection/Categories";

import { RankingRestaurantSlider } from '../components/principalPage/rankingrestaurantslider/RankingRestaurantSlider'
import { MostSearch } from '../components/principalPage/mostSearch/MostSearch'

import { PlanSection } from '../components/principalPage/businessSection/PlanSection'
import { TeamSection } from '../components/principalPage/businessSection/TeamSection'

import { HeaderNav } from '../components/headerNav/HeaderNav';
import { Footer } from '../components/footer/Footer';

import './principalPage.css'

import slidesCarousel from '../utilities/carrousel.json'
import itemsCategories from '../utilities/categories.json'
import { useEffect, useState } from 'react';
import axios from 'axios';



export function PrincipalPage() {

    const [city, setCity] = useState(null)
    const [topRestaurants, setTopRestaurants] = useState([{}]) //Array de restaurantes
    const [permission, setPermission] = useState(false) //Permiso de ubicación [true, false]

    //Función para obtener la ubicación del usuario
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`)
                    .then(res => {
                        const city = res.city
                        if (city === null || city === undefined || city === 'Cali') {
                            setCity('Tuluá')
                        } else {
                            setCity(city)
                        }
                        setPermission(true)
                    }).catch(err => {
                        console.log(err);
                    })
            })
        } else {
            console.log('No se pudo obtener la ubicación');
        }
    }    

    //UseEffect para preguntar permisos de ubicación
    useEffect(() => {
        getLocation()
    }, [])

    //UseEffect para traer los mejores restaurantes de la ciudad
    useEffect(() => {
        if (city) {
            axios.get(`https://rippio-api.vercel.app/api/restaurant/getTopByCity`,
                {
                    params: {
                        ciudad: city
                    }
                })
                .then(res => {
                    setTopRestaurants(res.data)
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [city])


    return (
        <main className='mainContent'>
            <HeaderNav />
            <section className='MainContent-bodySection'>
                <section className='MainContent-bodySection-content'>
                    <SearchSection />
                    <section className="MainContent-bodySection-firstSection">
                        <CarouselImage slides={slidesCarousel} />
                        <Categories items={itemsCategories} />
                    </section>
                    {
                        permission ?
                            (city && topRestaurants[0].id) && <RankingRestaurantSlider slides={topRestaurants} />
                            : <section className="bestNearRestaurant secondSection-child">
                                <h2 className='bestNearRestaurant-title'>Los mejores restaurantes cerca de ti</h2>
                                <div className='bestNearRestaurant-noLocation'>
                                    <p>Para una mejor experiencia en Rippio, por favor permita el acceso a su ubicación</p>
                                    <button onClick={()=>{getLocation()}}>Permitir</button>
                                </div>
                            </section>
                    }
                    <MostSearch />
                </section>
                <section className="businessSection">
                    <h2 className='businessSection-title'>Únete a <span>RIPPIO</span></h2>
                    <PlanSection />
                    <TeamSection />
                </section>
            </section>
            <Footer />
        </main>
    )
}