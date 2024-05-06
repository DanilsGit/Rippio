// import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Header } from '../components/header/Header';
import { RestaurantIconResult } from '../components/searchPage/restaurantResult/RestaurantIconResult';
import { RestaurantsInformationResult } from '../components/searchPage/RestaurantInformationResult/RestaurantsInformationResult';
import { Footer } from '../components/footer/Footer';

import { resultados } from '../utilities/searchQuery.json';

import './searchPage.css'
export function SearchPage() {
    const params = useParams();

    return (
        <main className='searchPage'>
            <Header />
            <section className='searchPage-content'>
                <h1 className='searchPage-title'> Mira lo que encontramos para <span>{params.search}</span> </h1>
                <RestaurantIconResult results={resultados} />
                <RestaurantsInformationResult results={resultados} />
            </section>
            <Footer />
        </main>
    )
}
