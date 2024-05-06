/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import './restaurantsInformationResult.css'
import { useCart } from '../../../hooks/useCart'
import { ProductModal } from '../../productModal/ProductModal'
import { useState } from 'react'
import { checkProductInCart } from '../../../constants/cart'


export function RestaurantsInformationResult({ results }) {
    const cart = useCart((state) => state.cart)
    const addToCart = useCart((state) => state.addToCart)
    const removeFromCart = useCart((state) => state.removeFromCart)
    const [selectedProduct, setSelectedProduct] = useState(null)

    const selectProduct = (product) => {
        setSelectedProduct(product)
    }


    return (
        <section className="searchPage-restaurantInformationResult">
            {results.restaurantes.map((restaurant) => {
                return (
                    <section key={restaurant.id} className='restaurantInformation-item'>
                        <header className='restaurantInformation-item-header'>
                            <Link to={`/restaurant/${restaurant.id}`}>
                                <img draggable='false' className='restaurantInformation-item-header-img' src={restaurant.imagen} alt={restaurant.nombre} />
                            </Link>
                            <h2 className='restaurantInformation-item-header-title'>{restaurant.nombre}</h2>
                            <div className='restaurantInformation-item-calificacion'>
                                <img draggable='false' className='item-calificacion-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2Fstar.png?alt=media&token=c4b9595f-f850-46cc-8056-5ed106c0094e' alt='star' />
                                <span className='item-calificacion-text'>{restaurant.calificacion}</span>
                            </div>
                        </header>
                        <section className='restaurantInformation-item-products'>
                            {restaurant.productos.map((product) => {
                                return (
                                    <section key={product.id} className='restaurantInformation-item-products-product'>
                                        <button
                                            style={{
                                                backgroundColor: checkProductInCart(cart, product) ? '#032B2A' : '#01CBC3'
                                            }}
                                            onClick={() => {
                                                checkProductInCart(cart, product)
                                                    ? removeFromCart({ product })
                                                    : addToCart({ product, restaurant, quantity: 1 })
                                            }} className='restaurantInformation-item-products-product-button'>
                                            {checkProductInCart(cart, product)
                                                ? <img draggable='false' className='restaurantInformation-item-products-product-button-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FremoveIcon.png?alt=media&token=25ab08fb-5469-49d6-914e-310722e4e9cd' alt='plus' />
                                                : <img draggable='false' className='restaurantInformation-item-products-product-button-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FaddIcon.png?alt=media&token=ed181174-d4ad-4c8a-a7ad-4a3035dfd4f4' alt='plus' />}
                                        </button>
                                        <button className='restaurantInformation-item-products-product-buttonContainer' onClick={()=>selectProduct(product)}>
                                            <img draggable='false' className='restaurantInformation-item-products-product-img' src={product.imagen} alt={product.nombre} />
                                            <div>
                                                <span>{product.costo_unit}</span>
                                                <p>{product.nombre}</p>
                                            </div>
                                        </button>
                                        <ProductModal product={product} restaurant={restaurant} selectedProduct={selectedProduct} selectProduct={selectProduct} />
                                    </section>
                                )
                            })}
                        </section>
                    </section>
                )
            })}
        </section>
    )
}