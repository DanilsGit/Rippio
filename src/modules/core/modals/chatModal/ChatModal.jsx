/* eslint-disable react/prop-types */
import RestaurantMessage from '@m/core/components/restaurantMessage/RestaurantMessage';
import UserMessage from '@m/core/components/userMessage/UserMessage';
import './chatModal.css';
import Modal from 'react-modal'
import { useEffect } from 'react';
import { useChatMutation, useChatQuery, useChatSubscription } from '../../hooks/custom-hooks';

export default function ChatModal({ isOpen, closeModal, order }) {

    const { data, loading } = useChatQuery(order.id)
    const { handleSendMessage, error, handleChange, message } = useChatMutation(order.id);
    useChatSubscription(order.id);


    // Llevar el scroll del ChatModal-body al final
    useEffect(() => {
        if (!isOpen) return;
        const timer = setTimeout(() => {
            const chatModalBody = document.querySelector('.ChatModal-body');
            if (!chatModalBody) return;
            chatModalBody.scrollTop = chatModalBody.scrollHeight;
        }, 0);
        return () => clearTimeout(timer);
    }, [data, isOpen]);

    const exitModal = () => {
        closeModal();
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={exitModal}
                className='ChatModal Modal'
            >
                <header className='ChatModal-header'>
                    <img className='ChatModal-header_image' src={order.img_icon} alt='Chat' />
                    <h2>{order.nombre}</h2>
                    <button className='ChatModal-header_button' onClick={closeModal}>X</button>
                </header>
                <section className='ChatModal-body'>
                    <p className='ChatModal-body_initial'>Aquí empieza tu conversación con {order.nombre}</p>

                    {loading && <p>Cargando mensajes ⌛</p>}

                    {data && data.getchat_order.map((data, index) =>
                    (data.tipo_usuario == 1 ?
                        <UserMessage key={index} message={data.mensaje} date={data.fecha} image={data.img_icon} /> :
                        <RestaurantMessage key={index} message={data.mensaje} date={data.fecha} image={data.img_icon} />))}

                    {error && <p>{error}</p>}

                </section>
                <footer className='ChatModal-footer'>
                    <form
                        onSubmit={handleSendMessage}
                    >
                        <input className='ChatModal-footer_input' type='text' placeholder='Escribe un mensaje...'
                            onChange={handleChange} value={message}
                        />
                        <button className='ChatModal-footer_button'>
                            <img className='ChatModal-footer_button_image' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FsendIcon.png?alt=media&token=7d5c3f4d-08d5-42a8-8744-4e5cf8777b09' alt='Enviar' />
                        </button>
                    </form>
                </footer>
            </Modal>
        </div>
    )
}