/* eslint-disable react/prop-types */
import Modal from 'react-modal'
import './orderManage.css'
import { useEffect, useState } from 'react';
import { getOrderDetailRestaurantByID, updateOrderState } from '@/api/order'
import { useAuth } from '@m/core/hooks/useAuth';

export default function OrderManage({ order, isOpen, setIsOpen, setSelectedOrder, setOrders, arrOrders }) {

    // Conseguir el token del usuario con zustand
    const token = useAuth(state => state.token)

    // Estado para almacenar los productos del pedido
    const [orderDetail, setOrderDetail] = useState(null)

    // Estado para almacenar los datos del comprador
    const [buyerData, setBuyerData] = useState(null)

    // Estado para mostrar Cargando... mientras se obtienen los pedidos
    const [loading, setLoading] = useState(true)

    // useEffect para obtener los pedidos
    useEffect(() => {
        if (!order) return
        getOrderDetailRestaurantByID(token, order.id)
            .then(response => {
                response.data.products.forEach(product => {
                    product.observaciones = !product.observaciones || product.observaciones === 'N/A' ? 'No' : product.observaciones
                })
                setOrderDetail(response.data.products)
                setBuyerData(response.data.data[0])
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [order, token])

    // Función para cerrar el modal
    const handleClose = () => {
        setIsOpen(false);
        setSelectedOrder(null);
        setLoading(true);
        setOrderDetail(null);
    }

    // Estado para mandar el estado solo una vez isStatusSent
    const [isStatusSent, setIsStatusSent] = useState(false)

    // Función para actualizar el estado del pedido y los pedidos
    const handleUpdateOrderState = (status) => {
        if (isStatusSent) return
        setIsStatusSent(true)
        updateOrderState(token, order.id, status)
            .then(() => {
                const newOrders = arrOrders.map(orderInMap => {
                    if (order.id === orderInMap.id) {
                        return { ...orderInMap, estado: status }
                    }
                    return orderInMap
                })
                setOrders(newOrders)
                setIsStatusSent(false)
                handleClose()
            })
            .catch(error => {
                console.log(error)
                setIsStatusSent(false)
                handleClose()
            })
    }

    if (!order) return null;
    return (
        <div>
            <Modal className='OrderManage Modal'
                isOpen={isOpen} onRequestClose={handleClose}
            >
                <header className='OrderManage-header'>
                    <p>Gestión de pedido</p>
                    <p><b>{order.estado}</b></p>
                    <p className='OrderManage-header-date'>{order.fecha}</p>
                </header>
                <section className='OrderManage-content'>
                    <section className='OrderManage-content-items'>
                        {
                            loading ? <p>Cargando...</p> :
                                orderDetail && orderDetail.map((product, index) => (
                                    <article key={index} className='OrderManage-content-items-item'>
                                        <img draggable='false' src={product.img_product} alt='food' />
                                        <div>
                                            <div>
                                                <p>{product.nombre}</p>
                                                <p>Descripcion: {product.description}</p>
                                                <p>Observaciones: {product.observaciones}</p>
                                            </div>
                                            <div className='OrderManage-content-items-item-cost'>
                                                <p><b>Cantidad:</b>{product.cantidad_prod}</p>
                                                <p><b>Unidad:</b>${product.costo_unit}</p>
                                                <p><b>Subtotal: </b>${product.subtotal}</p>
                                            </div>
                                        </div>
                                    </article>
                                ))
                        }

                    </section>
                    {
                        loading ? null :
                            buyerData && (
                                <section className='OrderManage-content-info'>
                                    <div className='OrderManage-content-info-order'>
                                        <p><b>Enviar a:</b> {buyerData.nombre + ' ' + buyerData.apellido}</p>
                                        <p><b>Dirección:</b>  {buyerData.direccion}</p>
                                        <p>{buyerData.observacion_direccion}</p>
                                        <p><b>Subtotal:</b>  ${order.subtotal}</p>
                                        <p><b>Envío:</b>  ${order.costo_envio}</p>
                                        <p><b>Total:</b>  ${order.total}</p>
                                    </div>
                                    <div className='OrderManage-content-info-buttons'>

                                        {
                                            order.estado === 'Pendiente' &&
                                            <>
                                                <button className='OrderManage-content-info-buttons-confirm'
                                                    onClick={
                                                        () => {
                                                            handleUpdateOrderState('Preparando')
                                                        }}
                                                >Confirmar</button>
                                                <button className='OrderManage-content-info-buttons-reject'
                                                    onClick={
                                                        () => {
                                                            handleUpdateOrderState('Cancelado')
                                                        }
                                                    }
                                                >Rechazar</button>
                                            </>
                                        }
                                        {
                                            order.estado === 'Preparando' &&
                                            <button className='OrderManage-content-info-buttons-ready'
                                                onClick={
                                                    () => {
                                                        handleUpdateOrderState('En camino')
                                                    }}
                                            >Enviar pedido</button>
                                        }

                                        {
                                            order.estado === 'En camino' &&
                                            <button className='OrderManage-content-info-buttons-delivered'
                                                onClick={
                                                    () => {
                                                        handleUpdateOrderState('Entregado')
                                                    }}
                                            >Entregado</button>
                                        }

                                        <button className='OrderManage-content-info-buttons-exit'
                                            onClick={
                                                () => {
                                                    handleClose()
                                                }}
                                        >Salir</button>
                                    </div>
                                </section>
                            )
                    }
                </section>
            </Modal>
        </div>
    )
}

