import Select from 'react-select'
import { Footer } from '../../components/footer/Footer'
import { HeaderSearch } from '../../components/headerSearch/HeaderSearch'
import './checkout.css'
import { useCart } from '../../hooks/useCart'
import { useEffect, useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { getAddresses } from '../../api/address'
import { getPayments } from '../../api/payment'
import { addOrder } from '../../api/order'
import { useNavigate } from 'react-router-dom'

export function Checkout() {

    const navigator = useNavigate()
    const cart = useCart(state => state.cart)
    const clearCart = useCart(state => state.clearCart)
    const user = useAuth(state => state.user)
    const token = useAuth(state => state.token)
    const loadCartFromDatabase = useCart(state => state.loadCartFromDatabase)
    const [costoEnvio, setCostoEnvio] = useState(3000)
    const [completeOrder, setCompleteOrder] = useState(false)

    //Estado para guardar las direcciones del usuario
    const [address, setAddress] = useState(null)

    //Estado para guardar los métodos de pago del usuario
    const [payment, setPayment] = useState(null)

    //Estado para saber si usar creditos
    const [useCredits, setUseCredits] = useState(false)

    //Estado para enviar la información del pedido
    const [order, setOrder] = useState({
        id_pago: '',
        id_direccion: '',
        useCreditos: useCredits,
        costoEnvio: costoEnvio,
    });

    //Objeto para la informacion previa del pedido
    const [orderBeforeInfo, setOrderBeforeInfo] = useState({})

    //Estado para guardar la información del pedido
    const [orderInfo, setOrderInfo] = useState({})

    //Estado para darle a comprar solo una vez
    const [buyOnce, setBuyOnce] = useState(false)

    //UseEffect para iniciar la información del pedido
    useEffect(() => {
        const NewOrderBeforeInfo = {
            totalCreditos: user.creditos,
            subTotal: cart.total,
            total: cart.total + costoEnvio,
        }
        setOrderBeforeInfo(NewOrderBeforeInfo)
        setOrderInfo(NewOrderBeforeInfo)
    }, [cart, cart.total, user.creditos, costoEnvio])

    //useEffect para cargar el carrito desde la base de datos
    useEffect(() => {
        loadCartFromDatabase(token)
        console.log('cargadoEnCheckout');
    }, [])

    //useEffect para cargar las direcciones del usuario
    useEffect(() => {
        getAddresses(token)
            .then(res => {
                const newAddress = res.data.map(address => {
                    return {
                        value: address.id,
                        label: `${address.ciudad}, ${address.barrio} - ${address.tipo_via} - ${address.numero_uno} - ${address.numero_dos} - ${address.observaciones}`
                    }
                })
                setAddress(newAddress)
            })
            .catch(err => {
                // console.log(err);
                console.log(err.response.data.message);
                if (err.response.data.message === 'No hay direcciones') {
                    setAddress([])
                }
            })
    }, [token])

    //useEffect para cargar los metodos de pago
    useEffect(() => {
        getPayments(token)
            .then(res => {
                const newPayment = res.data.map(payment => {
                    const firstFourthAndTwoLast = payment.numero.slice(0, 4) + ' ❋❋❋❋ ❋❋❋❋ ' + '❋❋' + payment.numero.slice(-2)
                    return {
                        value: payment.id,
                        label: firstFourthAndTwoLast
                    }
                })
                setPayment(newPayment)
            })
            .catch(err => {
                // console.log(err);
                console.log(err.response.data.message);
                if (err.response.data.message === 'No hay tarjetas') {
                    setPayment([])
                }
            })
    }, [token])



    //Si el carrito está vacío, no se muestra nada
    if (cart?.items.length === 0) {
        return;
    }


    //Función para calcular el costo de envío
    //TODO


    //Función para calcular el total del pedido si incluye creditos o no
    const calculateTotal = () => {
        const newUseCredits = !useCredits
        if (!newUseCredits) {
            setOrderInfo(orderBeforeInfo)
        } else {
            const newOrderInfo = { ...orderInfo }
            if (newOrderInfo.totalCreditos >= newOrderInfo.total) {
                newOrderInfo.totalCreditos -= newOrderInfo.total
                newOrderInfo.total = 0
            }
            else {
                newOrderInfo.total -= newOrderInfo.totalCreditos
                newOrderInfo.totalCreditos = 0
            }
            setOrderInfo(newOrderInfo)
        }
        setUseCredits(newUseCredits)
    }

    //funcion de confirmar pedido
    const handleBtnOrder = async () => {

        // const {  //Esto es lo que se espera recibir en el body
        //     id_payment_method,
        //     id_address,
        //     use_credits,
        //     shipping_cost,
        //   } = req.body;

        if (order.id_pago === '' || order.id_direccion === '') {
            alert('Por favor, selecciona una dirección y un método de pago')
            setBuyOnce(false)
            return;
        }

        const loadingStart = document.querySelector('.CheckoutPage-btn-loading')
        loadingStart.classList.add('CheckoutPage-btn-loadingStart')

        //Formato fecha:
        //2024-06-02 13:08:18
        //2024-06-02 20:20:53

        const newOrderToSend = {
            id_payment_method: order.id_pago.value,
            id_address: order.id_direccion.value,
            use_credits: useCredits,
            shipping_cost: Number(costoEnvio),
            date: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }

        addOrder(token, newOrderToSend).then(() => {
            loadingStart.classList.add('CheckoutPage-btn-loadingEnd')
            setCompleteOrder(true)
            setTimeout(() => {
                clearCart()
                navigator('/profile/orders')
            }, 2000)
        }).catch(err => {
            console.log(err);
            setBuyOnce(false)
        })
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
                                placeholder='Seleccionar...'
                                className='CheckoutPage-Select'
                                options={address}
                                onChange={(selectedOption) => setOrder({ ...order, id_direccion: selectedOption })}
                            />
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item'>
                        <section className='CheckoutPage-content-item-content CheckoutPage-content-item-content-select'>
                            <h2>Tarjeta de pago</h2>
                            <Select
                                placeholder='Seleccionar...'
                                className='CheckoutPage-Select'
                                onChange={(selectedOption) => setOrder({ ...order, id_pago: selectedOption })}
                                options={payment}
                            />
                        </section>
                    </div>
                    <div className='CheckoutPage-content-item'>
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
                    <div className='CheckoutPage-content-item'>
                        <section className='CheckoutPage-content-item-content'>
                            <h2 className='CheckoutPage-warning-title'>Por favor, revisa cada detalle de tu pedido antes de confirmar</h2>
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
                                    : () => {
                                        setBuyOnce(true)
                                        handleBtnOrder()
                                    }
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