import { useCart } from '../../hooks/useCart';
import Modal from 'react-modal';
import './modalOrder.css';

export const ModalOrder = () => {
    const { clearCart, showModal, toggleModal, cart } = useCart();

    const closeModal = () => {
        clearCart()
        toggleModal()
    }

    return (
        <div>
            <Modal className='Modal' isOpen={showModal} onRequestClose={toggleModal}>
                <header className='modal-header'>
                    <img draggable='false' alt='rippioIcon' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FrippioFoodHappyIcon.png?alt=media&token=aadfafd8-dec8-43ae-847e-e46b3d44945a' />
                    {
                        cart.items.length > 0 ?
                            <h2>¡Espera! ¿Qué quieres comer?</h2>
                            :
                            <h2>¡Carrito vacío!</h2>
                    }
                </header>
                {
                    cart.items.length > 0 ?
                        <div className='modal-aviso'>
                            <p>Ya tienes productos de
                                <span>{cart.items[0].restaurantName}</span>
                                en tu pedido
                            </p>
                            <p>¿Deseas descartar la orden?</p>
                        </div>
                        :
                        <p>No tienes productos en tu pedido, ¿Qué esperas?</p>
                }
                <div className='modal-btnContainer'>
                    {
                        cart.items.length > 0 ?
                            <>
                                <button onClick={closeModal}>Si</button>
                                <button onClick={toggleModal}>No</button>
                            </>
                            :
                            <button onClick={toggleModal}>¡Quiero pedir ya!</button>
                    }
                </div>
            </Modal>
        </div>
    );
};