/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import './restaurantPage.css'
import { Header } from '../../components/header/Header';
import { Footer } from "../../components/footer/Footer";
import { InformationAside } from "./aside/InformationAside";
import { RestaurantMain } from "./main/RestaurantMain";

import restaurantInfo from '../../utilities/restaurantInfo.json'

export function RestaurantPage() {

    const {id, nombre, direction, schedule, calificacion, logo, banner, categories} = restaurantInfo
    const params = useParams();
    const restaurant = {id, nombre}
    return (
        <main className="RestaurantPage">
            <Header />
            <section className="RestaurantPage-content">
                <InformationAside name={nombre} direction={direction} schedule={schedule} rating={calificacion} logo={logo} banner={banner} />
                <RestaurantMain categories={categories} restaurant={restaurant} />
            </section>
            <Footer />
        </main>
    )
}