import Modal from 'react-modal';
import { useCart } from '../../hooks/useCart';
import './cartModal.css'


export function CartModal() {

    const { cart, showCartModal, toggleCartModal, incrementProduct, decrementProduct } = useCart()

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
                                                <img draggable='false' alt='product' src={item.product.img_product} />
                                                <div className='ModalCart-content-item-info'>
                                                    <h3>{item.product.nombre}</h3>
                                                    <p>{item.product.description}</p>
                                                    <p>Cantidad: {item.quantity}</p>
                                                    <p>Precio: {item.product.costo_unit}</p>
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
                                    <h3>Total: {cart.total}</h3>
                                </div>
                            </section>
                            <footer className='ModalCart-footer'>
                            </footer>
                        </>
                        :
                        <>
                            <section className='ModalCart-content'>
                                <div className='ModalCart-content-items'>
                                    <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/CartModal%2FEmptyIcon.png?alt=media&token=c47e70d1-4819-499d-b6e2-d6a4bdbb140a'></img>
                                    <h3>Tu carrito está vacío...</h3>
                                </div>
                            </section>
                        </>
                }
            </Modal>
        </div>
    )
}
