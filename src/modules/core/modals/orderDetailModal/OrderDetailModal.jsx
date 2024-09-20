/* eslint-disable react/prop-types */
import './orderDetailModal.css'
import Modal from 'react-modal'
import { useDetailOrderModal } from '../../hooks/custom-hooks';
import { useState } from 'react';
import ChatModal from '../chatModal/ChatModal';

export function OrderDetailModal({ isOpen, closeModal, order, setSelectedOrder }) {

    const { products, direction, paymentMethod, loading, setNull } = useDetailOrderModal(order)

    const [openChat, setOpenChat] = useState(false)

    if (!order) return null

    const handleCloseModal = () => {
        setNull()
        setSelectedOrder(null)
        closeModal()
    }

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onRequestClose={handleCloseModal}
                className='OrderDetailModal Modal'
            >
                <header className='OrderDetailModal-header'>
                    <p>{order.nombre}</p>
                    <p><span
                        style={
                            order.estado === 'Pendiente' ? { color: '#C4830C' } :
                                order.estado === 'Preparando' ? { color: '#03434A' } :
                                    order.estado === 'En camino' ? { color: '#66CACC' } :
                                        order.estado === 'Entregado' ? { color: '#3C966E' } :
                                            order.estado === 'Cancelado' ? { color: '#A33939' } :
                                                { color: 'black' }
                        }
                    >{order.estado}</span></p>
                    <p>{order.fecha}</p>
                </header>
                <section className='OrderDetailModal-body'>
                    {
                        loading ? <p>Cargando...</p> :
                            products ?
                                products.map((product, index) => (
                                    <article key={index} className='OrderDetailModal-product'>
                                        <img draggable='false' src={product.img_product} alt={product.nombre} />
                                        <div className='OrderDetailModal-productInfo'>
                                            <h3>{product.nombre}</h3>
                                            <p>{product.descripcion}</p>
                                            {product.observacionp &&
                                                <p>Observaciones del producto: {product.observacionp}</p>
                                            }
                                            <div className='OrderDetailModal-productInfo-footer'>
                                                <p>Cantidad: {product.cantidad_prod}</p>
                                                <p><b>Precio:</b> {product.costo_unit}</p>
                                            </div>
                                        </div>
                                    </article>
                                ))
                                : <p>No hay productos en este pedido</p>
                    }
                </section>
                <footer className='OrderDetailModal-footer'>
                    <div className='OrderDetailModal-footer-info'>
                        <div className='OrderDetailModal-footer-info-direction'>
                            <p><b>Dirección:</b></p>
                            <div>
                                <p>{direction ? direction[0] : 'Cargando...'}</p>
                                <p>{direction ? direction[1] : ''}</p>
                            </div>
                        </div>
                        <div className='OrderDetailModal-footer-info-payment'>
                            <p><b>Cobro:</b></p>
                            <p>{paymentMethod ? paymentMethod : 'Cargando...'}</p>
                        </div>
                        <button onClick={() => setOpenChat(true)}>Chat</button>
                    </div>
                    <div className='OrderDetailModal-footer-totals'>
                        <p><b>Subtotal: </b>$ {order.costo_total + order.creditos_usados - order.costo_envio}</p>
                        <p><b>Envío:</b>$ {order.costo_envio}</p>
                        {
                            order.creditos_usados > 0 &&
                            <p><b>Créditos:</b>$ -{order.creditos_usados}</p>
                        }
                        <p><span>Total:</span><b>$ {order.costo_total}</b></p>
                    </div>
                </footer>
                <ChatModal isOpen={openChat} closeModal={() => setOpenChat(false)} order={order} />
            </Modal>
        </div>
    )
}