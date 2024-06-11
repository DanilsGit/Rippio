/* eslint-disable react/prop-types */
import './orderSliderPrincipalPage.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { OrderDetailModal } from '../../Modals/orderDetailModal/OrderDetailModal';
import { useEffect, useState } from 'react';

export function OrderSliderPrincipalPage({ orders }) {

    // Estado para abrir modal isOpen, closeModal, order, setSelectedOrder
    const [isOpen, setIsOpen] = useState(false);

    const [selectedOrder, setSelectedOrder] = useState(null);

    // UseEffect para añadir la clase MainContent-bodySection-orders-card-loaded
    useEffect(() => {
        const cards = document.querySelectorAll('.MainContent-bodySection-orders-card');
        if (cards) {
            cards.forEach(card => {
                card.classList.add('MainContent-bodySection-orders-card-loaded');
            })
        }
    }, [orders])

    return (
        <div className='MainContent-bodySection-orders-container'>
            <Swiper
                spaceBetween={100}
                navigation={false}
                breakpoints={
                    orders.length >= 3 ?
                        {
                            0: {
                                slidesPerView: 1.5,
                            },
                            300: {
                                slidesPerView: 1.5,
                            },
                            600: {
                                slidesPerView: 2.5,
                            },
                            850: {
                                slidesPerView: 3.2,
                            },
                        }
                        :
                        orders.length === 2 ?
                            {
                                0: {
                                    slidesPerView: 1.5,
                                },
                                600: {
                                    slidesPerView: 2,
                                }
                            }
                            :
                            {
                                0: {
                                    slidesPerView: 1,
                                }
                            }
                }
            >
                {orders.map((order, index) => (
                    <SwiperSlide key={order.id}>
                        <section className={`MainContent-bodySection-orders-card ${index % 3 === 0 ? 'bodySection-orders-card-blue' : index % 3 === 1 ? 'bodySection-orders-card-white' : 'bodySection-orders-card-yellow'}`}
                        >
                            <p>Tu pedido en</p>
                            <h2>{order.nombre}</h2>
                            <p
                                className='MainContent-bodySection-orders-card-status'
                            ><b>Estado:</b> {order.estado}</p>
                            <p>{order.fechayhora}</p>
                            {order.creditos_usados > 0 ?

                                <p>Total: $<del>{order.costo_total + order.creditos_usados}</del> ${order.costo_total}</p>
                                :
                                <p>Total: ${order.costo_total}</p>
                            }
                            <button
                                onClick={
                                    () => {
                                        setSelectedOrder(order);
                                        setIsOpen(true);
                                    }
                                }
                            >Más información</button>
                        </section>
                    </SwiperSlide>
                ))}
            </Swiper>
            <OrderDetailModal isOpen={isOpen} handleCloseModal={() => setIsOpen(false)} order={selectedOrder} setSelectedOrder={setSelectedOrder} />
        </div>
    )
}