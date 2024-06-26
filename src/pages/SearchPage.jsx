import { useParams } from 'react-router-dom';
import axios from 'axios';
import { HeaderSearch } from '../components/headerSearch/HeaderSearch';
import { RestaurantIconResult } from '../components/searchPage/restaurantResult/RestaurantIconResult';
import { RestaurantsInformationResult } from '../components/searchPage/RestaurantInformationResult/RestaurantsInformationResult';
import { Footer } from '../components/footer/Footer';

import './searchPage.css'

import { useEffect, useState } from 'react';
import { ProductModal } from '../components/Modals/productModal/ProductModal';
import { handleAddToCart } from '../constants/cart';
import { useCart } from '../hooks/useCart';

export function SearchPage() {
    const params = useParams();

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [RestaurantOfProduct, setRestaurantOfProduct] = useState(null);

    // UseEffect para llevar el scroll al inicio de la página
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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

    const addToCart = useCart((state) => state.addToCart)
    const handleAddBtn = (product, restaurant, quantity) => {
        handleAddToCart(addToCart, product, restaurant, quantity)
        setSelectedProduct(null)
        setRestaurantOfProduct(null)
        setIsOpen(false)
    }

    const handleCancelBtn = () => {
        setSelectedProduct(null)
        setRestaurantOfProduct(null)
        setIsOpen(false)
    }

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
                <RestaurantsInformationResult results={searchResults} selectProduct={setSelectedProduct} setModalProductOpen={setIsOpen} setRestaurantOfProduct={setRestaurantOfProduct} />
                <ProductModal isOpen={isOpen} productInModal={selectedProduct} restaurant={RestaurantOfProduct} handleAddBtn={handleAddBtn} handleCancelBtn={handleCancelBtn} />
            </section>
            <Footer />
        </main>
    )
}
