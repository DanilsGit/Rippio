import Modal from 'react-modal';
import { useCart } from '@m/core/hooks/useCart';
import './cartModal.css'
import LoginToPayModal from '../loginTopay/LoginToPayModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function CartModal() {
    const { cart, showCartModal, toggleCartModal, incrementProduct, decrementProduct, token } = useCart()
    const [isOpen, setIsOpen] = useState(false)
    const navigator = useNavigate()


    const handleClickPayButton = () => {
        if (token) {
            toggleCartModal()
            navigator('/checkout')
        } else {
            setIsOpen(true)
        }
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleLogin = () => {
        setIsOpen(false)
        toggleCartModal()
        navigator('/login')
    }

    return (
        <div>
            <Modal className='ModalCart Modal' isOpen={showCartModal} onRequestClose={toggleCartModal}>
                <header className='ModalCart-header'>
                    <h2>Carrito de compras</h2>
                </header>
                {
                    cart.items.length !== 0
                        ? <>
                            <section className='ModalCart-content'>
                                <div className='ModalCart-content-items'>
                                    {
                                        cart.items.map((item, index) => (
                                            <div key={item.uniqueKey} className='ModalCart-content-item'>
                                                <div className='ModalCart-content-item-product'>
                                                    <img draggable='false' alt='product' src={item.product.img_product} />
                                                    <div className='ModalCart-content-item-info'>
                                                        <h3>{item.product.nombre}</h3>
                                                        {/* <p className='ModalCart-content-item-info-desc'>{item.product.descripcion}</p> */}
                                                        <p>Cantidad: <span> {item.quantity}</span></p>
                                                        <p>Precio: <span>${item.product.costo_unit}</span></p>
                                                        {
                                                            item.product.observation &&
                                                            <p>Observaciones: {item.product.observation}</p>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='ModalCart-content-item-actions'>
                                                    <button className='ModalCart-content-item-btn' onClick={() => decrementProduct(index)}>
                                                        {item.quantity === 1 ? '🗑' : '-'}
                                                    </button>
                                                    <button className='ModalCart-content-item-btn' onClick={() => incrementProduct(index)}>+</button>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                                <div className='ModalCart-content-total'>
                                    <h3>Total a pagar: <span>${cart.total}</span></h3>
                                    <button className='ModalCart-content-total-btn'
                                    onClick={handleClickPayButton}
                                    >Ir a pagar</button>
                                </div>
                            </section>
                            <footer className='ModalCart-footer'>
                            </footer>
                        </>
                        :
                        <>
                            <section className='ModalCart-content'>
                                <div className='ModalCart-content-items'>
                                    <img className='ModalCart-content-items-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/CartModal%2FEmptyIcon.png?alt=media&token=c47e70d1-4819-499d-b6e2-d6a4bdbb140a'></img>
                                    <h3 className='ModalCart-content-items-h3'>Aún no tienes productos en tu carrito</h3>
                                </div>
                            </section>
                        </>
                }
            </Modal>
            <LoginToPayModal isOpen={isOpen} HandleCancel={handleCancel} HandleLogin={handleLogin} />
        </div>
    )
}
