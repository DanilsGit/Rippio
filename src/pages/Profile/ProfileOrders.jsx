import './profileOrders.css'
import { useState } from 'react'
import { useEffect } from 'react'
import { getOrders } from '../../api/order'
import { useAuth } from '../../hooks/useAuth'

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
            console.log(response.data)
            response.data.forEach(order => {
                order.productos.forEach(product => {
                    product.Observaciones = product.Observaciones == 'N/A' || product.Observaciones == '' || !product.Observaciones ? '' : product.Observaciones
                })
            })
            
            setOrders(response.data)
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setLoading(false)
        })
    }, [token])


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
                                        <p>{order.fecha} UTC</p>
                                        <p>Id: {order.id}</p>
                                    </div>
                                    <div className='ProfileOrders-orderItem-body'>
                                        <ul className='ProfileOrders-orderItem-body-ul'>
                                            {order.productos.map((product, index) => (
                                                <li key={index} className='ProfileOrders-orderItem-body-li'>
                                                    <p className='ProfileOrders-orderItem-body-li-p'>{product.cantidad + " " + product.nombre}</p>
                                                    <p className='ProfileOrders-orderItem-body-li-p'>{product.Observaciones}</p>
                                                </li>
                                            ))}
                                        </ul>
                                        <div className='ProfileOrders-orderItem-body-footer'>
                                            <p className='ProfileOrders-orderItem-body-p'>Costo total: <span>${order.costo_total}</span></p>
                                            <button className='ProfileOrders-orderItem-body-button'>Ver detalles</button>
                                        </div>
                                    </div>
                                </article>
                            )) : <p>No tienes pedidos aún</p>
                }
            </section>
        </section>
    )
}