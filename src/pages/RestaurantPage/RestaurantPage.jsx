/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import './restaurantPage.css'
import { HeaderSearch } from '../../components/headerSearch/HeaderSearch';
import { Footer } from "../../components/footer/Footer";
import { InformationAside } from "./aside/InformationAside";
import { RestaurantMain } from "./main/RestaurantMain";

// import restaurantInfo from '../../utilities/restaurantInfo.json'
import { useEffect, useState } from "react";
import axios from "axios";

export function RestaurantPage() {
    const params = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState({})
    const [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get(`https://rippio-api.vercel.app/api/restaurant/getRestaurantInfoById/${params.idRestaurant}`)
            .then(res => {
                setRestaurantInfo(res.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, [params.idRestaurant])

    useEffect(()=>{
        axios.get(`https://rippio-api.vercel.app/api/restaurant/getCategoriesAndProductsByRestaurantId/${params.idRestaurant}`)
            .then(res => {
                setCategories(res.data)
            })
            .catch(error => {
                console.error(error);
            });
    },[params.idRestaurant])

    const {id, nombre, direccion, horario, calificacion, img_icon, img_banner} = restaurantInfo
    const restaurant = {id, nombre}
    return (
        <main className="RestaurantPage">
            <HeaderSearch />
            <section className="RestaurantPage-content">
                <InformationAside name={nombre} direction={direccion} schedule={horario} rating={calificacion} logo={img_icon} banner={img_banner} />
                <RestaurantMain categories={categories} restaurant={restaurant} />
            </section>
            <Footer />
        </main>
    )
}