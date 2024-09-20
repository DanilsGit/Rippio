/* eslint-disable react/prop-types */
import LeftMessage from '@m/core/components/leftMessage/LeftMessage';
import RightMessage from '@m/core/components/rightMessage/RightMessage';
import './chatModal.css';
import Modal from 'react-modal'
import { useEffect } from 'react';
import { useChatMutation, useChatQuery, useChatSubscription } from '../../hooks/custom-hooks';
import { useAuth } from "@m/core/hooks/useAuth";

export default function ChatModal({ isOpen, closeModal, order }) {
    const user = useAuth((state) => state.user);
    const { data, loading } = useChatQuery(order.id)
    const { handleSendMessage, handleChange, message } = useChatMutation(order.id);
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

    console.log(order);


    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                className='ChatModal Modal'
            >
                <header className='ChatModal-header'>
                    <img className='ChatModal-header_image' src={order.img_icon} alt='Chat' />
                    {
                        user.tipo_usuario == 1 ?
                            <h3>{order.nombre}</h3>
                            : <h3>{order.cliente}</h3>
                    }
                    <button className='ChatModal-header_button' onClick={closeModal}>X</button>
                </header>
                <section className='ChatModal-body'>
                    {
                        user.tipo_usuario == 1 ?
                            <p className='ChatModal-body_initial'>Aquí empieza tu conversación con {order.nombre}</p>
                            : <p className='ChatModal-body_initial'>Aquí empieza tu conversación con {order.cliente}</p>
                    }

                    {loading && <p>Cargando mensajes ⌛</p>}

                    {user.tipo_usuario == 3 && data && data.getchat_order.map((data, index) =>
                    (data.tipo_usuario == 3 ?
                        <RightMessage key={index} message={data.mensaje} date={data.fecha} image={data.img_icon} /> :
                        <LeftMessage key={index} message={data.mensaje} date={data.fecha} image={data.img_icon} />))}

                    {user.tipo_usuario == 1 && data && data.getchat_order.map((data, index) =>
                    (data.tipo_usuario == 1 ?
                        <RightMessage key={index} message={data.mensaje} date={data.fecha} image={data.img_icon} /> :
                        <LeftMessage key={index} message={data.mensaje} date={data.fecha} image={data.img_icon} />))}

                </section>
                <footer className='ChatModal-footer'>
                    {(order.estado != "Cancelado" && order.estado != "Entregado") ?
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
                        : <p className='ChatModal-footer_message'>La conversación ha finalizado. El estado de la orden es {order.estado}</p>
                    }
                </footer>
            </Modal>
        </div>
    )
}