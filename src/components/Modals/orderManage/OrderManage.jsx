import Modal from 'react-modal'
import './orderManage.css'
import { useEffect } from 'react';
import { useState } from 'react';

export default function OrderManage() {


    const [isScrolled, setIsScrolled] = useState(false);

useEffect(() => {
    const parent = document.querySelector('.OrderManage-content-items');
    if (parent) {
        const checkScroll = () => {
            if (parent.scrollTop + parent.clientHeight >= parent.scrollHeight) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        parent.addEventListener('scroll', checkScroll);
        return () => parent.removeEventListener('scroll', checkScroll);
    }
}, []);

    const handleClose = () => {
        console.log('close');
    }

    return (
        <div>
            <Modal className='OrderManage Modal'
                isOpen={false} onRequestClose={handleClose}
            >
                <header className='OrderManage-header'>
                    <p>Order Manage</p>
                    <p>Pendiente</p>
                    <p>06/06/2024</p>
                </header>
                <section className='OrderManage-content'>
                    <section className='OrderManage-content-items'>
                        <article className='OrderManage-content-items-item'>
                            <img draggable='false' src='https://via.placeholder.com/150' alt='food' />
                            <div>
                                <div>
                                    <p>Hamburguesa mixta</p>
                                    <p>Descripcion: Hamburguesa con carne de res y pollo</p>
                                    <p>Observaciones: <b>Sin cebolla</b></p>
                                </div>
                                <div className='OrderManage-content-items-item-cost'>
                                    <p>Cantidad: <b>4</b></p>
                                    <p>Unidad: <b>$100</b></p>
                                    <p>Subtotal: <b>$400</b></p>
                                </div>
                            </div>
                        </article>

                        <article className='OrderManage-content-items-item'>
                            <img draggable='false' src='https://via.placeholder.com/150' alt='food' />
                            <div>
                                <div>
                                    <p>Hamburguesa mixta</p>
                                    <p>Descripcion: Hamburguesa con carne de res y pollo</p>
                                    <p>Observaciones: <b>Sin cebolla</b></p>
                                </div>
                                <div className='OrderManage-content-items-item-cost'>
                                    <p>Cantidad: <b>4</b></p>
                                    <p>Unidad: <b>$100</b></p>
                                    <p>Subtotal: <b>$400</b></p>
                                </div>
                            </div>
                        </article>
                        <article className='OrderManage-content-items-item'>
                            <img draggable='false' src='https://via.placeholder.com/150' alt='food' />
                            <div>
                                <div>
                                    <p>Hamburguesa mixta</p>
                                    <p>Descripcion: Hamburguesa con carne de res y pollo</p>
                                    <p>Observaciones: <b>Sin cebolla</b></p>
                                </div>
                                <div className='OrderManage-content-items-item-cost'>
                                    <p>Cantidad: <b>4</b></p>
                                    <p>Unidad: <b>$100</b></p>
                                    <p>Subtotal: <b>$400</b></p>
                                </div>
                            </div>
                        </article>
                        <article className='OrderManage-content-items-item'>
                            <img draggable='false' src='https://via.placeholder.com/150' alt='food' />
                            <div>
                                <div>
                                    <p>Hamburguesa mixta</p>
                                    <p>Descripcion: Hamburguesa con carne de res y pollo</p>
                                    <p>Observaciones: <b>Sin cebolla</b></p>
                                </div>
                                <div className='OrderManage-content-items-item-cost'>
                                    <p>Cantidad: <b>4</b></p>
                                    <p>Unidad: <b>$100</b></p>
                                    <p>Subtotal: <b>$400</b></p>
                                </div>
                            </div>
                        </article>
                        <article className='OrderManage-content-items-item'>
                            <img draggable='false' src='https://via.placeholder.com/150' alt='food' />
                            <div>
                                <div>
                                    <p>Hamburguesa mixta</p>
                                    <p>Descripcion: Hamburguesa con carne de res y pollo</p>
                                    <p>Observaciones: <b>Sin cebolla</b></p>
                                </div>
                                <div className='OrderManage-content-items-item-cost'>
                                    <p>Cantidad: <b>4</b></p>
                                    <p>Unidad: <b>$100</b></p>
                                    <p>Subtotal: <b>$400</b></p>
                                </div>
                            </div>
                        </article>
                        <article className='OrderManage-content-items-item'>
                            <img draggable='false' src='https://via.placeholder.com/150' alt='food' />
                            <div>
                                <div>
                                    <p>Hamburguesa mixta</p>
                                    <p>Descripcion: Hamburguesa con carne de res y pollo</p>
                                    <p>Observaciones: <b>Sin cebolla</b></p>
                                </div>
                                <div className='OrderManage-content-items-item-cost'>
                                    <p>Cantidad: <b>4</b></p>
                                    <p>Unidad: <b>$100</b></p>
                                    <p>Subtotal: <b>$400</b></p>
                                </div>
                            </div>
                        </article>
                        <article className='OrderManage-content-items-item'>
                            <img draggable='false' src='https://via.placeholder.com/150' alt='food' />
                            <div>
                                <div>
                                    <p>Hamburguesa mixta</p>
                                    <p>Descripcion: Hamburguesa con carne de res y pollo</p>
                                    <p>Observaciones: <b>Sin cebolla</b></p>
                                </div>
                                <div className='OrderManage-content-items-item-cost'>
                                    <p>Cantidad: <b>4</b></p>
                                    <p>Unidad: <b>$100</b></p>
                                    <p>Subtotal: <b>$400</b></p>
                                </div>
                            </div>
                        </article>
                    </section>
                    <section className='OrderManage-content-info'>
                        {!isScrolled && <img className='scrollImg' draggable='false' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/stilldown.png?alt=media&token=d2737318-185b-48d1-ac28-018d39be23aa' alt='food' />}
                        <div className='OrderManage-content-info-order'>
                            <p>Enviar a: <strong>Nombre Apellido</strong></p>
                            <p>Dirección: <strong>Calle 123</strong></p>
                            <p>Subtotal: $100</p>
                            <p>Envío: $50</p>
                            <p>Total: <strong>$150</strong></p>
                        </div>
                        <div className='OrderManage-content-info-buttons'>
                            <button className='OrderManage-content-info-buttons-confirm'>Confirmar</button>
                            <button className='OrderManage-content-info-buttons-reject'>Rechazar</button>
                            <button className='OrderManage-content-info-buttons-exit'>Salir</button>
                        </div>
                    </section>
                </section>
            </Modal>
        </div>
    )
}

