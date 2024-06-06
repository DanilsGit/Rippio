import './restaurantProfileOrders.css'

export default function RestaurantProfileOrders() {
    return (
        <section className='restaurantProfileOrders'>
            <header className='restaurantProfileOrders-header'>
                <h1>Pedidos recientes</h1>
                <p>Estos son los pedidos que has recibido recientemente</p>
            </header>
            <section className='restaurantProfileOrders-content'>
                <article className='restaurantProfileOrders-content-item'>
                    <header className='restaurantProfileOrders-content-item-header'>
                        <h2>Pedido #1</h2>
                        <span>Pendiente</span>
                        <p>01/01/2024</p>
                    </header>
                    <section className='restaurantProfileOrders-content-item-content'>
                        <p>Subtotal: $100</p>
                        <p>Envío: $50</p>
                        <p>Total: $150</p>
                    </section>
                    <footer className='restaurantProfileOrders-content-item-footer'>
                        <button>Ver detalles</button>
                    </footer>
                </article>
            </section>
        </section>
    )
}