import Select from 'react-select'
import { Footer } from '@m/core/components/footer/Footer'
import HeaderSearch from '@m/core/components/headerSearch/HeaderSearch'
import './checkout.css'
import { useAuth } from '@m/core/hooks/useAuth'
import { useCheckout, useUserDeriveryData } from '../hooks/custon-hooks'

export function Checkout() {

    const user = useAuth(state => state.user)
    const { address, payment } = useUserDeriveryData()
    const { orderBeforeInfo, orderInfo, costoEnvio, updateOrder, completeOrder, buyOnce, cart, handleSubmit, useCredits, calculateTotal } = useCheckout()

    //Si el carrito está vacío, no se muestra nada
    if (cart?.items.length === 0) {
        return;
    }

    //funcion de confirmar pedido
    const handleBtnOrder = async () => {
        try {
            await handleSubmit()
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className='CheckoutPage-main'>
            <HeaderSearch isCheckout={true} />
            <section className='CheckoutPage'>
                <header>
                    <h1>Confirmación de pedido</h1>
                </header>
                <section className='CheckoutPage-content'>
                    <div className='CheckoutPage-content-item'>
                        <section className='CheckoutPage-content-item-content CheckoutPage-content-item-content-select'>
                            <h2>Dirección de entrega</h2>
                            <Select
                                isSearchable={false}
                                placeholder='Seleccionar...'
                                className='CheckoutPage-Select'
                                options={address}
                                onChange={(selectedOption) => updateOrder('id_direccion', selectedOption.value)}
                                noOptionsMessage={() => {
                                    if (!address) return 'Cargando direcciones...'
                                    return 'Registra direcciones en tu perfil'
                                }}
                            />
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item'>
                        <section className='CheckoutPage-content-item-content CheckoutPage-content-item-content-select'>
                            <h2>Tarjeta de pago</h2>
                            <Select
                                isSearchable={false}
                                placeholder='Seleccionar...'
                                className='CheckoutPage-Select'
                                onChange={(selectedOption) => updateOrder('id_pago', selectedOption.value)}
                                options={payment}
                                noOptionsMessage={() => {
                                    if (!payment) return 'Cargando métodos de pago...'
                                    return 'Registra tarjetas en tu perfil'
                                }}
                            />
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item CheckoutPage-content-cart'>
                        <section className='CheckoutPage-content-item-content CheckoutPage-content-item-content-cart'>
                            <h2>{cart.restaurant.nombre}</h2>
                            <section className='CheckoutPage-content-item-content-cart'>
                                {
                                    cart &&
                                    cart.items.map((item) => (
                                        <section key={item.uniqueKey} className='CheckoutPage-content-item-content-cart-item'>
                                            <img draggable='false' src={item.product.img_product} alt={item.product.nombre} />
                                            <section>
                                                <h3>{item.product.nombre}</h3>
                                                <p>{item.product.descripcion}</p>
                                                {item.product.observation && <p><span>Observaciones: </span> {item.product.observation}</p>}
                                                <p>{item.product.precio}</p>
                                                <p>Cantidad: <span>{item.quantity}</span></p>
                                                <p>Precio por unidad <span>${item.product.costo_unit}</span></p>
                                            </section>
                                        </section>
                                    ))}
                            </section>
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item advise'>
                        <section className='CheckoutPage-content-item-content CheckoutPage-content-item-content-advise'>
                            <h2 className='CheckoutPage-warning-title'>! Por favor, revisa cada detalle de tu pedido antes de confirmar</h2>
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item'>
                        <section className='CheckoutPage-content-item-content CheckoutPage-content-item-content-credits'>
                            <h2>¿Deseas usar tus créditos para esta orden?</h2>
                            <div>
                                <label className='hidden-label'>Usar créditos</label>
                                <span
                                    className={
                                        useCredits ? 'CheckoutPage-credits-active' : ''
                                    }
                                >(${
                                        useCredits ?
                                            orderInfo.totalCreditos
                                            : user.creditos
                                    })</span>
                                {
                                    orderBeforeInfo.totalCreditos > 0 &&
                                    <input
                                        type='checkbox'
                                        onChange={calculateTotal}
                                        checked={useCredits}
                                    />
                                }
                            </div>
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item'>
                        <section className='CheckoutPage-content-item-content'>
                            <h2>Subtotal</h2>
                            <span>${cart.total}</span>
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item'>
                        <section className='CheckoutPage-content-item-content'>
                            <h2>Costo de envío</h2>
                            <span>${costoEnvio}</span>
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item'>
                        <section className='CheckoutPage-content-item-content'>
                            <h2>Total</h2>
                            {
                                useCredits ?
                                    <>
                                        <div>
                                            <span className='text-strike'>${orderBeforeInfo.total}</span>
                                            {' '}
                                            <span>${orderInfo.total}</span>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <span>${orderBeforeInfo.total}</span>
                                    </>
                            }
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item'>
                        <button
                            onClick={
                                buyOnce ?
                                    null
                                    : handleBtnOrder
                            }
                            className='CheckoutPage-content-item-content-button'>
                            <p>
                                {
                                    completeOrder ?
                                        'Disfruta tu pedido!'
                                        : 'Realizar pedido'
                                }
                            </p>
                            <div className='CheckoutPage-btn-loading'>
                            </div>
                        </button>
                    </div>
                </section>
            </section>
            <Footer />
        </main>
    )
}