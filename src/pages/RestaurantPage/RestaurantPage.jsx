/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import './restaurantPage.css'
import { HeaderSearch } from '../../components/headerSearch/HeaderSearch';
import { Footer } from "../../components/footer/Footer";
import { InformationAside } from "./aside/InformationAside";
import { RestaurantMain } from "./main/RestaurantMain";

import { getCatAndProdByResId, getInfo } from '../../api/restaurant'

// import restaurantInfo from '../../utilities/restaurantInfo.json'
import { useEffect, useState } from "react";
import { ProductModal } from "../../components/Modals/productModal/ProductModal";
import { useCart } from "../../hooks/useCart";

import { handleAddToCart } from '../../constants/cart'

export function RestaurantPage() {
    const params = useParams();
    const [restaurantInfo, setRestaurantInfo] = useState({})
    const [categories, setCategories] = useState([])


    const [isOpen, setIsOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [RestaurantOfProduct, setRestaurantOfProduct] = useState(null);


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

const formatHours = (hour) => {
    if (!hour) return ('');
    let parts = hour.split(':');
    return parts[0] + ':' + parts[1];
}

useEffect(() => {
    getInfo(params.idRestaurant).then(res => {
        let data = res.data;
        data.horario = data.horario.map(item => {
            return {
                ...item,
                open: formatHours(item.open),
                close: formatHours(item.close)
            };
        });
        setRestaurantInfo(data);
    })
}, [params.idRestaurant])


    useEffect(()=>{
        getCatAndProdByResId(params.idRestaurant).then(res => {
            setCategories(res.data)})
    },[params.idRestaurant])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const {id, nombre, direccion, horario, calificacion, img_icon, img_banner} = restaurantInfo
    const restaurant = {id, nombre}
    return (
        <main className="RestaurantPage">
            <ProductModal isOpen={isOpen} productInModal={selectedProduct} restaurant={RestaurantOfProduct} handleAddBtn={handleAddBtn} handleCancelBtn={handleCancelBtn} />
            <HeaderSearch />
            <section className="RestaurantPage-content">
                <InformationAside name={nombre} direction={direccion} schedule={horario} rating={calificacion} logo={img_icon} banner={img_banner} />
                <RestaurantMain categories={categories} restaurant={restaurant} selectProduct={setSelectedProduct} setModalProductOpen={setIsOpen} setRestaurantOfProduct={setRestaurantOfProduct} />
            </section>
            <Footer />
        </main>
    )
}