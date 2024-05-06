import {useCart} from '../hooks/useCart'

export function Debugger(){
    const cart = useCart((state) => state.cart)
    return(
        <div>
            <h1>Debugger</h1>
            <h2>{cart.items.map((item)=> item.product.nombre)}</h2>
        </div>
    )
}