import './profileOrders.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { getOrders } from '../../api/order'
import { useAuth } from '../../hooks/useAuth'
import { formatDate } from '../../constants/formatDate'
import { OrderDetailModal } from '../../components/Modals/orderDetailModal/OrderDetailModal'

export function ProfileOrders() {

    //Estado para guardar los pedidos
    const [orders, setOrders] = useState([])

    //Estado loading para mostrar un Cargando... mientras se cargan los pedidos
    const [loading, setLoading] = useState(true)

    //Obtenemos el token del usuario en zustand
    const token = useAuth(state => state.token)

    //UseEffect para obtener los pedidos del usuario
    useEffect(() => {
        getOrders(token).then(response => {
            console.log(response.data);
            response.data.forEach(order => {
                let cantidad = 0;
                order.productos.forEach(product => {
                    product.Observaciones = product.Observaciones == 'N/A' || product.Observaciones == '' || !product.Observaciones ? '' : product.Observaciones
                    cantidad += product.cantidad
                })
                order.fecha = formatDate(order.fecha)
                order.cantidadProductos = cantidad
            })

            setOrders(response.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [token])

    //Estado para abrir el modal
    const [isOpen, setIsOpen] = useState(false)

    //Estado para seleccionar el pedido
    const [selectedOrder, setSelectedOrder] = useState(null)

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
                                        onMouseOver={
                                            () => {
                                                document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.visibility = 'visible'
                                                document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.opacity = '1'
                                                // Lo desplaza tan abajo como tenga de height el contenedor
                                                document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.transform = `translateY(${document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).clientHeight}px)`
                                                
                                            }
                                        }
                                        onMouseOut={
                                            () => {
                                                document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.visibility = 'hidden'
                                                document.querySelector(`.ProfileOrders-orderItem-body-AbsoluteInfo-${order.id}`).style.opacity = '0'
                                            }
                                        }
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
                                                <p className='ProfileOrders-orderItem-body-p'><span style={{textDecoration: 'line-through'}}>{`$${order.costo_total+order.creditos_usados}`}</span> {`$${order.costo_total}`}</p>
                                                : <p className='ProfileOrders-orderItem-body-p'><span>{`$${order.costo_total}`}</span></p>
                                        }
                                        <p className='ProfileOrders-orderItem-body-p'><span>{order.estado}</span></p>
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