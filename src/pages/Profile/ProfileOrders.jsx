import './profileOrders.css'
import orders from '../../utilities/recentOrders.json'

export function ProfileOrders() {
    return (
        <section className="ProfileOrders">
            <header className='ProfileOrders-header'>
                <h1>Últimos pedidos</h1>
                <p>Aquí puedes consultar información acerca de los pedidos que has hecho anteriormente.</p>
            </header>
            <section className='ProfileOrders-ordersContainer'>
                {orders.map((order, index) => (
                    <article key={index} className='ProfileOrders-orderItem'>
                        <div className='ProfileOrders-orderItem-header'>
                            <h2>{order.restaurante}</h2>
                            <p>Fecha del pedido:  {order.fecha}</p>
                            <p>Id:     {order.idPedido}</p>
                        </div>
                        <div className='ProfileOrders-orderItem-body'>
                            <ul className='ProfileOrders-orderItem-body-ul'>
                                {order.productos.map((product, index) => (
                                    <li key={index} className='ProfileOrders-orderItem-body-li'>
                                            <p className='ProfileOrders-orderItem-body-li-p'>{product.nombre}</p>
                                            <p className='ProfileOrders-orderItem-body-li-p'>$ {product.precio}</p>
                                    </li>
                                ))}
                            </ul>
                            {
                                order.observaciones === '' ? null : <p className='ProfileOrders-orderItem-body-observations'>Observaciones del pedido: <span>{order.observaciones}</span></p>
                            }
                            <p className='ProfileOrders-orderItem-body-p'>Costo total: <span>${order.CostoTotal}</span></p>
                        </div>
                    </article>
                ))}
            </section>
        </section>
    )
}