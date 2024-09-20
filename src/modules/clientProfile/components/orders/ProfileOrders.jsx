import './profileOrders.css'
import { useState } from 'react'
import { OrderDetailModal } from '@m/core/modals/orderDetailModal/OrderDetailModal'
import { useOrders } from '../../hooks/custom-hooks'



export function ProfileOrders() {

    const { orders, loading } = useOrders()

    //Estado para abrir el modal
    const [isOpen, setIsOpen] = useState(false)

    //Estado para seleccionar el pedido
    const [selectedOrder, setSelectedOrder] = useState(null)

    const onMouseOverHandler = (order) => {
        if (!order) return
        document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.visibility = 'visible'
        document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.opacity = '1'
        // Lo desplaza tan abajo como tenga de height el contenedor
        document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.transform = `translateY(${document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).clientHeight}px)`
    }

    const onMouseOutHandler = (order) => {
            document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.visibility = 'hidden'
            document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.opacity = '0'
        }


    return (
        <section className="ProfileOrders">
            <header className='ProfileOrders-header'>
                <h1>Últimos pedidos</h1>
                <p>Aquí puedes consultar información acerca de los pedidos que has hecho anteriormente.</p>
            </header>
            <section className='ProfileOrders-ordersContainer'>
                {
                    loading ? <p>Cargando...</p> :
                        orders.length > 0 ?
                            orders.map((order) => (
                                <article key={order.id} className='ProfileOrders-orderItem'>
                                    <div className='ProfileOrders-orderItem-header'>
                                        <h2>{order.nombre}</h2>
                                        <p>{order.fecha}</p>
                                        <p>Id: {order.id}</p>
                                    </div>
                                    <div className='ProfileOrders-orderItem-body'
                                        onMouseOver={() => onMouseOverHandler(order)}
                                        onMouseOut={() => onMouseOutHandler(order)}
                                    >
                                        <p className='ProfileOrders-orderItem-body-p'>Productos</p>
                                        <p className='ProfileOrders-orderItem-body-p'><span>{order.cantidadProductos}</span></p>
                                        <div className={`ProfileOrders-orderItem-body-AbsoluteInfo ` + `ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`}
                                        >
                                            <ul className='ProfileOrders-orderItem-body-ul'>
                                                {order.productos.map((product, index) => (
                                                    <li key={index} className='ProfileOrders-orderItem-body-li'>
                                                        <p className='ProfileOrders-orderItem-body-li-p'>{product.cantidad + " " + product.nombre}</p>
                                                        {/* <p className='ProfileOrders-orderItem-body-li-p'>{product.Observaciones}</p> */}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='ProfileOrders-orderItem-body-footer'>
                                        {/* Si hizo compra con creditos, muestra tachado el costo_total y al lado el costo - creditos */}
                                        {
                                            order.creditos_usados > 0 ?
                                                <p className='ProfileOrders-orderItem-body-p'><span style={{ textDecoration: 'line-through' }}>{`$${order.costo_total + order.creditos_usados}`}</span> {`$${order.costo_total}`}</p>
                                                : <p className='ProfileOrders-orderItem-body-p'><span>{`$${order.costo_total}`}</span></p>
                                        }
                                        <p className='ProfileOrders-orderItem-body-p'><span
                                            style={
                                                order.estado === 'Pendiente' ? { color: '#C4830C' } :
                                                    order.estado === 'Preparando' ? { color: '#03434A' } :
                                                        order.estado === 'En camino' ? { color: '#66CACC' } :
                                                            order.estado === 'Entregado' ? { color: '#3C966E' } :
                                                                order.estado === 'Cancelado' ? { color: '#A33939' } :
                                                                    { color: 'black' }
                                            }
                                        >{order.estado}</span></p>
                                        <button
                                            onClick={() => {
                                                setSelectedOrder(order)
                                                setIsOpen(true)
                                            }}
                                            className='ProfileOrders-orderItem-body-button'>Ver detalles</button>
                                    </div>
                                </article>
                            )) : <p>No tienes pedidos aún</p>
                }
            </section>
            <OrderDetailModal isOpen={isOpen} closeModal={() => setIsOpen(false)} order={selectedOrder} setSelectedOrder={setSelectedOrder} />
        </section>
    )
}