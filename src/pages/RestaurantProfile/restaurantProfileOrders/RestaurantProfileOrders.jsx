import Select from 'react-select'
import './restaurantProfileOrders.css'
import OrderManage from '../../../components/Modals/orderManage/OrderManage'
import { useEffect, useState } from 'react'
import { getOrdersByRestaurant } from '../../../api/order'
import { useAuth } from '../../../hooks/useAuth'
import { formatDate } from '../../../constants/formatDate'

export default function RestaurantProfileOrders() {

    // Conseguir el token del usuario con zustand
    const token = useAuth(state => state.token)

    // Estado para mostrar el Cargando... mientras se obtienen los pedidos
    const [loading, setLoading] = useState(true)

    // Estado para obtener los pedidos
    const [orders, setOrders] = useState(null)

    // Estado para almacenar pedidos filtrados
    const [filteredOrders, setFilteredOrders] = useState(null)

    // Estado para almacenar la selección del filtro
    const [selectedFilter, setSelectedFilter] = useState(null)

    // useEffect para obtener los pedidos
    useEffect(() => {
        getOrdersByRestaurant(token)
            .then(response => {
                response.data.forEach(order => {
                    order.fecha = formatDate(order.fecha)
                    order.total = order.costo_total + order.creditos_usados
                    order.subtotal = order.costo_total + order.creditos_usados - order.costo_envio
                })
                setOrders(response.data)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }, [token])

    const options = [
        { value: 'Pendiente', label: 'Pendiente' },
        { value: 'Preparando', label: 'Preparando' },
        { value: 'En camino', label: 'En camino' },
        { value: 'Entregado', label: 'Entregado' },
        { value: 'Cancelado', label: 'Cancelado' },
        { value: 'Todos', label: 'Todos' }
    ]

    // UseEffect para filtrar los pedidos
    useEffect(() => {
        // Si no hay pedidos, no hacer nada
        if (!orders) return
        // Si no hay filtro seleccionado, mostrar los Pendiente
        if (!selectedFilter) {
            setSelectedFilter('Pendiente')
            return
        }
        if (selectedFilter === 'Todos') {
            setFilteredOrders(orders)
        } else {
            const filtered = orders.filter(order => order.estado === selectedFilter)
            setFilteredOrders(filtered)
        }
    }, [selectedFilter, orders])

    // Estado para mostrar el modal de detalles del pedido
    const [isOpen, setIsOpen] = useState(false)

    // Estado para almacenar el pedido seleccionado
    const [selectedOrder, setSelectedOrder] = useState(null)

    return (
        <section className='restaurantProfileOrders'>
            <header className='restaurantProfileOrders-header'>
                <h1>Pedidos recientes</h1>
                <p>Estos son los pedidos que has recibido recientemente</p>
            </header>
            <section className='restaurantProfileOrders-filters'>
                <h2>Filtrar por estado</h2>
                <Select
                    onChange={selectedOption => setSelectedFilter(selectedOption.value)}
                    options={options}
                />
            </section>
            <section className='restaurantProfileOrders-content'>
                {
                    loading ? <p>Cargando...</p> :
                        filteredOrders && filteredOrders.map(order => (
                            <article key={order.id} className='restaurantProfileOrders-content-item'>
                                <header className='restaurantProfileOrders-content-item-header'>
                                    <h2>Pedido #{order.id}</h2>
                                    <span>{order.estado}</span>
                                    <p>{order.fecha}</p>
                                </header>
                                <section className='restaurantProfileOrders-content-item-content'>
                                    <p>Enviar a: <b>{order.cliente}</b></p>
                                    <p>Dirección: <b>{order.direccion}</b></p>
                                    <p
                                        className='restaurantProfileOrders-content-item-content-obDir'>
                                        <b>{order.observacion_direccion}</b></p>
                                    <div>
                                        <p>Total: <b>${order.total}</b></p>
                                        <p>Envío: ${order.costo_envio}</p>
                                        <p>Subtotal: ${order.subtotal}</p>
                                    </div>
                                </section>
                                <footer className='restaurantProfileOrders-content-item-footer'>
                                    <button
                                        onClick={
                                            () => {
                                                setSelectedOrder(order)
                                                setIsOpen(true)
                                            }
                                        }
                                    >Ver detalles</button>
                                </footer>
                            </article>
                        ))
                }
            </section>
            <OrderManage order={selectedOrder} isOpen={isOpen} setIsOpen={setIsOpen} setSelectedOrder={setSelectedOrder} setOrders={setOrders} arrOrders={orders} />
        </section>
    )
}