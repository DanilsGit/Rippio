import Select from 'react-select'
import './restaurantProfileOrders.css'
import OrderManage from '@m/core/modals/orderManage/OrderManage'
import ChatModal from '@m/core/modals/chatModal/ChatModal'
import { useRestaurantChat, useRestaurantOrders } from '../../hooks/custom-hooks'


export default function RestaurantProfileOrders() {

    const options = [
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Preparando', label: 'Preparando' },
        { value: 'En camino', label: 'En camino' },
        { value: 'Entregado', label: 'Entregado' },
        { value: 'Cancelado', label: 'Cancelado' },
        { value: 'Todos', label: 'Todos' }
    ]

    const { loading, handleChangeFilter, filteredOrders, handleOpenOrder, isOpen, selectedOrder, setIsOpen, setSelectedOrder, setOrders, orders } = useRestaurantOrders()

    const { isOpenChat, orderChat, handleCloseChat, handleOpenChat } = useRestaurantChat()


    return (
        <section className='restaurantProfileOrders'>
            <header className='restaurantProfileOrders-header'>
                <h1>Pedidos recientes</h1>
                <p>Estos son los pedidos que has recibido recientemente</p>
            </header>
            <section className='restaurantProfileOrders-filters'>
                <h2>Filtrar por estado</h2>
                <Select
                    onChange={handleChangeFilter}
                    isSearchable={false}
                    options={options}
                    placeholder='Selecciona un estado'
                />
            </section>
            <section className='restaurantProfileOrders-content'>
                {
                    loading ? <p>Cargando...</p> :
                        filteredOrders && filteredOrders.map(order => (
                            <article key={order.id} className='restaurantProfileOrders-content-item'>
                                <header className='restaurantProfileOrders-content-item-header'>
                                    <h2>Pedido #{order.id}</h2>
                                    <span
                                        style={
                                            order.estado === 'Pendiente' ? { color: '#C4830C' } :
                                                order.estado === 'Preparando' ? { color: '#03434A' } :
                                                    order.estado === 'En camino' ? { color: '#66CACC' } :
                                                        order.estado === 'Entregado' ? { color: '#3C966E' } :
                                                            order.estado === 'Cancelado' ? { color: '#A33939' } :
                                                                { color: 'black' }
                                        }
                                    >{order.estado}</span>
                                    <p>{order.fecha}</p>
                                </header>
                                <section className='restaurantProfileOrders-content-item-content'>
                                    <p><b>Enviar a:</b> {order.cliente}</p>
                                    <p><b>Dirección:</b> {order.direccion}</p>
                                    <p
                                        className='restaurantProfileOrders-content-item-content-obDir'>
                                        {order.observacion_direccion}</p>
                                    <div>
                                        <p><b>Total:</b> ${order.total}</p>
                                        <p><b>Envío: </b>${order.costo_envio}</p>
                                        <p><b>Subtotal:</b> ${order.subtotal}</p>
                                    </div>
                                </section>
                                <footer className='restaurantProfileOrders-content-item-footer'>
                                    <button
                                        onClick={() => handleOpenChat(order)}
                                    >Abrir chat</button>
                                    <button
                                        onClick={() => handleOpenOrder(order)}
                                    >Ver detalles</button>
                                </footer>
                            </article>
                        ))
                }
            </section>
            {isOpenChat && <ChatModal isOpen={isOpenChat} closeModal={handleCloseChat} order={orderChat} />}
            {isOpen && <OrderManage order={selectedOrder} isOpen={isOpen} setIsOpen={setIsOpen} setSelectedOrder={setSelectedOrder} setOrders={setOrders} arrOrders={orders} />}
        </section>
    )
}