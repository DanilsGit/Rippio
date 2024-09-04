/* eslint-disable react/prop-types */
import Modal from 'react-modal';
import './productModal.css';
import { useState } from 'react';
import { useEffect } from 'react';

export const ProductModal = ({ productInModal, restaurant, isOpen, handleAddBtn, handleCancelBtn }) => {

    const [quantity, setQuantity] = useState(1)
    const [product, setProduct] = useState(productInModal)

    useEffect(() => {
        setProduct(productInModal)
    }, [productInModal])

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    if (!product) {
        return null
    }

    return (
        <>
            <div>
                <Modal className='ProductModal Modal' isOpen={isOpen} onRequestClose={handleCancelBtn}>
                    <header className='ProductModal-header'>
                        {product.nombre}
                    </header>
                    <section className='ProductModal-section-container'>
                        <section className='ProductModal-sectionImg'>
                            <div className='ProductModal-sectionImg-imgContainer'>
                                <img draggable='false' src={product.img_product} alt={product.nombre} />
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
                            </div>
                            <div className='ProductModal-sectionInfo-observationContainer'>
                                <textarea id='observation' name='observation' placeholder='Observaciones'
                                    onChange={
                                        (e) => {
                                            setProduct({ ...product, observation: e.target.value })
                                        }}
                                ></textarea>
                                <label htmlFor='observation'>Si las observaciones afectan el precio del producto, es posible que no se tomen en cuenta.
                                </label>
                            </div>
                            <div className='ProductModal-btnContainer'>
                                <button onClick={
                                    () => {
                                        handleAddBtn(product, restaurant, quantity)
                                        setQuantity(1)
                                    }
                                } className='ProductModal-btnContainer-btn'>Agregar al carrito</button>
                            </div>
                        </section>
                    </section>
                </Modal>
            </div>

        </>
    );
};