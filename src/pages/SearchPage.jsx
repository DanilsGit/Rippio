import { useParams } from 'react-router-dom';
import axios from 'axios';
import { HeaderSearch } from '../components/headerSearch/HeaderSearch';
import { RestaurantIconResult } from '../components/searchPage/restaurantResult/RestaurantIconResult';
import { RestaurantsInformationResult } from '../components/searchPage/RestaurantInformationResult/RestaurantsInformationResult';
import { Footer } from '../components/footer/Footer';


import './searchPage.css'

import { useEffect, useState } from 'react';

export function SearchPage() {
    const params = useParams();

    const [searchResults, setSearchResults] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://rippio-api.vercel.app/api/search', {
            params: {
                request: params.search
            }
        })
            .then(res => {
                setSearchResults(res.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
            });
    }, [params.search]);

    return (
        <main className='searchPage'>
            <HeaderSearch />
            <section className='searchPage-content'>
                {
                    isLoading
                        ? <h1 className='searchPage-title'>Cargando resultados...</h1>
                        : searchResults.length === 0
                            ? <h1 className='searchPage-title'> No encontramos resultados para <span>{params.search}</span> </h1>
                            : <h1 className='searchPage-title'> Mira lo que encontramos para <span>{params.search}</span> </h1>
                }
                <RestaurantIconResult results={searchResults} />
                <RestaurantsInformationResult results={searchResults} />
            </section>
            <Footer />
        </main>
    )
}
