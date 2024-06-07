import Select from 'react-select'
import './restaurantProfileOrders.css'
import OrderManage from '../../../components/Modals/orderManage/OrderManage'

export default function RestaurantProfileOrders() {


    const options = [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'aceptado', label: 'Aceptado' },
        { value: 'entregado', label: 'Entregado' },
        { value: 'cancelado', label: 'Cancelado' },
    ]



    return (
        <section className='restaurantProfileOrders'>
            <header className='restaurantProfileOrders-header'>
                <h1>Pedidos recientes</h1>
                <p>Estos son los pedidos que has recibido recientemente</p>
            </header>
            <section className='restaurantProfileOrders-filters'>
                <h2>Filtrar por estado</h2>
                <Select
                    options={options}
                />
            </section>
            <section className='restaurantProfileOrders-content'>
                <article className='restaurantProfileOrders-content-item'>
                    <header className='restaurantProfileOrders-content-item-header'>
                        <h2>Pedido #1</h2>
                        <span>Pendiente</span>
                        <p>01/01/2024</p>
                    </header>
                    <section className='restaurantProfileOrders-content-item-content'>
                        <p>Enviar a: <strong>Nombre Apellido</strong></p>
                        <p>Dirección: <strong>Calle 123</strong></p>
                        <p>Subtotal: $100</p>
                        <p>Envío: $50</p>
                        <p>Total: <strong>$150</strong></p>
                    </section>
                    <footer className='restaurantProfileOrders-content-item-footer'>
                        <button>Ver detalles</button>
                    </footer>
                </article>


            </section>
            <OrderManage />
        </section>
    )
}