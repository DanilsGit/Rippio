import {useCart} from '../hooks/useCart'

export function Debugger(){
    const cart = useCart((state) => state.cart)
    return(
        <div>
            <h1>Debugger</h1>
            <h2>{cart.items.map((item)=>
                <div key={item.product.id}>
                    <h3>{item.product.nombre}</h3>
                    <h4>{item.quantity}</h4>
                    <h5>unit {item.product.costo_unit}</h5>
                </div>
            )}</h2>
            <h1>{
                        cart.total == null ? 
                        <p>{cart.total}null</p> : <p>total:{cart.total}</p>
                    }</h1>
        </div>
    )
}