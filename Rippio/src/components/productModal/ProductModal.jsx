/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import './productModal.css';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart';

export const ProductModal = ({ product, restaurant, selectedProduct, selectProduct }) => {

    const [quantity, setQuantity] = useState(1)

    const { addToCart } = useCart()

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }
// { product, restaurantId: restaurant.id, restaurantName: restaurant.nombre, quantity: 1 }
// product -> {id, estado, nombre, descripcion, imagen, costo_unit}
    return (
        <div>
            <Modal className='ProductModal' isOpen={product === selectedProduct} onRequestClose={() => { selectProduct(null); setQuantity(1) }}>
                
                <header className='ProductModal-header'>
                    {product.nombre}
                </header>
                <section className='ProductModal-section-container'>
                    <section className='ProductModal-sectionImg'>
                        <div className='ProductModal-sectionImg-imgContainer'>
                            <img draggable='false' src={product.imagen} alt={product.nombre} />
                        </div>
                        <div className='ProductModal-sectionImg-quantityContainer'>
                            <button className='ProductModal-sectionImg-quantityContainer-btn' onClick={decreaseQuantity}>-</button>
                            <span className='ProductModal-sectionImg-quantityContainer-text'>{quantity}</span>
                            <button className='ProductModal-sectionImg-quantityContainer-btn' onClick={increaseQuantity}>+</button>
                        </div>
                    </section>
                    <section className='ProductModal-sectionInfo'>
                        <div className='ProductModal-sectionInfo-infoContainer'>
                            <span>$ {product.costo_unit}</span>
                            <p>{product.descripcion}</p>
                            {/* <div className='ProductModal-sectionInfo-infoContainer-overflow'>
                                PENSANDO EN IMPLEMENTACIÓN
                            </div> */}
                        </div>
                        <div className='ProductModal-btnContainer'>
                        <button className='ProductModal-btnContainer-btn'>Agregar e ir al carrito</button>
                            <button onClick={
                                () => {
                                    addToCart({ product, restaurant, quantity })
                                    setQuantity(1)
                                    selectProduct(null)
                                }
                            
                            } className='ProductModal-btnContainer-btn'>Agregar y seguir comprando</button>
                        </div>
                    </section>
                </section>
            </Modal>
        </div>
    );
};