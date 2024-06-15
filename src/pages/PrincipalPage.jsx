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

import { getOrders } from '../api/order'
import { useAuth } from '../hooks/useAuth';
import { formatDate, formatDateWithoutHour } from '../constants/formatDate'
import { OrderSliderPrincipalPage } from '../components/principalPage/orderSlider/OrderSliderPrincipalPage';

import { getPayments } from '../api/payment'

import { getPlanById } from '../api/plan'
import { MyPlan } from '../components/principalPage/myPlan/MyPlan';

export function PrincipalPage() {

    const [city, setCity] = useState(null)
    const [topRestaurants, setTopRestaurants] = useState([{}]) //Array de restaurantes
    const [permission, setPermission] = useState(false) //Permiso de ubicación [true, false]
    const [location, setLocation] = useState(null) //Ubicación del usuario
    const [pay_method, setPay_method] = useState(null) //Método de pago del usuario
    const [plan, setPlan] = useState(null) //Plan del usuario
    //Traer token de zustand
    const token = useAuth(state => state.token)
    //Estado para guardar las ordenes del usuario que estén en un estado diferente a entregado
    const [orders, setOrders] = useState([])

    //Función para obtener la ubicación del usuario
    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=es`)
                    .then(res => {
                        const city = res.data.city
                        // if (city === null || city === undefined || city === 'Cali') {
                        //     setCity('Tuluá')
                        // } else {
                        //     setCity(city)
                        // }
                        setCity(city)
                        setLocation({
                            city: city,
                            principalSubdivision: res.data.principalSubdivision
                        })
                        setPermission(true)
                    }).catch(err => {
                        console.log(err);
                    })
            })
        } else {
            console.log('No se pudo obtener la ubicación');
        }
    }

    //Función para obtener el plan del usuario
    const getPlan = token => {
        if (token) {
            getPlanById(token)
                .then(res => {
                    // Si no hay plan o el plan está cancelado, se setea el plan a null
                    if (!(res.data) || res.data.estado === false) {
                        setPlan(null)
                        return
                    }
                    // res.data[0].descripcion es un string con los features separados por coma
                    const plan = res.data
                    plan.descripcion = plan.descripcion.split(',');
                    setPlan(plan)
                }).catch(err => {
                    console.log(err)
                })
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

    //UseEffect para traer las ordenes del usuario
    useEffect(() => {
        if (token) {
            getOrders(token)
                .then(res => {
                    // La fecha en formatDate(fecha) retorna en el formato Jun 10, 2024, 10:20 PM
                    // Se debe formatear a Jun 10, 2024 para comparar con la fecha actual sin la hora
                    const ordersFormatDate = res.data.map(order => {
                        return {
                            ...order,
                            fecha: formatDateWithoutHour(formatDate(order.fecha)),
                            fechayhora: formatDate(order.fecha),
                            subtotal: order.costo_total + order.creditos_usados - order.costo_envio
                        }
                    })
                    const newOrders = ordersFormatDate.filter(order => (order.estado !== 'Entregado' && order.fecha == formatDateWithoutHour(formatDate(new Date()))))
                    setOrders(newOrders)
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [])

    //UseEffect para traer los métodos de pago del usuario
    useEffect(() => {
        if (token) {
            getPayments(token)
                .then(res => {
                    if (res.data.length === 0) {
                        setPay_method([])
                        return
                    }
                    const newPayMethod = res.data.map(method => {
                        const firstFourthAndTwoLast = method.numero.slice(0, 4) + ' ❋❋❋❋ ❋❋❋❋ ' + '❋❋' + method.numero.slice(-2)
                        return {
                            value: method.id,
                            label: firstFourthAndTwoLast
                        }
                    })
                    setPay_method(newPayMethod)
                }).catch(err => {
                    console.log(err);
                })
        } else {
            setPay_method([])
        }
    }, [token])

    // UseEffect para traer el plan del usuario
    useEffect(() => {
        getPlan(token)
    }, [token])

    return (
        <main className='mainContent'>
            <HeaderNav />
            <section className='MainContent-bodySection'>
                {orders.length > 0 && <OrderSliderPrincipalPage orders={orders} />}
                <section className='MainContent-bodySection-content'>
                    <SearchSection location={location} />
                    <section className="MainContent-bodySection-firstSection">
                        <CarouselImage slides={slidesCarousel} />
                        <Categories items={itemsCategories} />
                    </section>
                    {
                        permission ?
                            (city && topRestaurants[0]?.id) && <RankingRestaurantSlider slides={topRestaurants} />
                            : <section className="bestNearRestaurant secondSection-child">
                                <h2 className='bestNearRestaurant-title'>Los mejores restaurantes cerca de ti</h2>
                                <div className='bestNearRestaurant-noLocation'>
                                    <p>Para una mejor experiencia en Rippio, por favor permita el acceso a su ubicación</p>
                                    <button onClick={() => { getLocation() }}>Permitir</button>
                                </div>
                            </section>
                    }
                    <MostSearch />
                </section>
                <section className="businessSection">
                    {
                        plan ?
                            <MyPlan plan={plan} setPlan={setPlan} />
                            :
                            <>
                                <h2 className='businessSection-title'>Únete a <span>RIPPIO</span></h2>
                                <PlanSection pay_method={pay_method} getPlan={getPlan} />
                            </>
                    }
                    {
                        !token && <TeamSection />
                    }
                </section>
            </section>
            <Footer />
        </main>
    )
}