/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import './orderDetailModal.css'
import Modal from 'react-modal'
import { getOrderDetailByID } from '../../../api/order'

export function OrderDetailModal({ isOpen, closeModal, order, setSelectedOrder }) {

    //Estado mientras se cargan los productos
    const [loading, setLoading] = useState(true)

    //Estado para guardar los productos
    const [products, setProducts] = useState(null)

    //Estado para la dirección de envío
    const [direction, setDirection] = useState(null)

    //Estado para el método de pago
    const [paymentMethod, setPaymentMethod] = useState(null)


    useEffect(() => {
        if (order) {
            getOrderDetailByID(order.id).then(response => {
                // console.log(response.data)
                response.data.forEach(product => {
                    product.observacionp = product.observacionp == 'N/A' || product.observacionp == '' || !product.observacionp ? '' : product.observacionp
                    product.observaciond = product.observaciond == 'N/A' || product.observaciond == '' || !product.observaciond ? '' : product.observaciond
                })
                const direction = `${response.data[0].ciudad}, ${response.data[0].barrio}, ${response.data[0].tipo_via} ${response.data[0].numero_via} # ${response.data[0].numero_uno} - ${response.data[0].numero_dos}`
                const observacion_direction = response.data[0].observaciond
                const newDirection = [direction, observacion_direction]
                setDirection(newDirection)
                const paymentMethod = response.data[0].numero.slice(0, 4) + ' ❋❋❋❋ ❋❋❋❋ ' + '❋❋' + response.data[0].numero.slice(-2)
                setPaymentMethod(paymentMethod)
                setProducts(response.data)
                setLoading(false)
            }).catch(error => {
                console.log(error)
                setLoading(false)
            })
        }
    }, [order], [])

    if (!order) return null

    const handleCloseModal = () => {
        setLoading(true)
        setProducts(null)
        setSelectedOrder(null)
        setDirection(null)
        setPaymentMethod(null)
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
                        order.estado === 'Pendiente' ? {color: '#C4830C'} :
                        order.estado === 'Preparando' ? {color: '#03434A'} :
                        order.estado === 'En camino' ? {color: '#66CACC'} : 
                        order.estado === 'Entregado' ? {color: '#3C966E'} : 
                        order.estado === 'Cancelado' ? {color: '#A33939'} :
                        {color: 'black'}
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
            </Modal>
        </div>
    )
}