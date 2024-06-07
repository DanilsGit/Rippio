import Modal from 'react-modal'
import './orderManage.css'

export default function OrderManage() {
    return (
        <div>
            <Modal className='OrderManage Modal'
                isOpen={true} onRequestClose={false}
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
                                <p>Hamburguesa mixta</p>
                                <p>Observaciones: Sin cebolla</p>
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
                                <p>Hamburguesa mixta</p>
                                <p>Observaciones: Sin cebolla</p>
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
                                <p>Hamburguesa mixta</p>
                                <p>Observaciones: Sin cebolla</p>
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
                                <p>Hamburguesa mixta</p>
                                <p>Observaciones: Sin cebolla</p>
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
                                <p>Hamburguesa mixta</p>
                                <p>Observaciones: Sin cebolla</p>
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
                                <p>Hamburguesa mixta</p>
                                <p>Observaciones: Sin cebolla</p>
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
                                <p>Hamburguesa mixta</p>
                                <p>Observaciones: Sin cebolla</p>
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
                                <p>Hamburguesa mixta</p>
                                <p>Observaciones: Sin cebolla</p>
                                <div className='OrderManage-content-items-item-cost'>
                                    <p>Cantidad: <b>4</b></p>
                                    <p>Unidad: <b>$100</b></p>
                                    <p>Subtotal: <b>$400</b></p>
                                </div>
                            </div>
                        </article>


                    </section>


                    <section className='OrderManage-content-info'>
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

