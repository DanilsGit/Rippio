// Importa la función 'create' de la biblioteca 'zustand'
import { create } from 'zustand'

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Crea un nuevo hook personalizado llamado 'useCart'
export const useCart = create((set) => {
    // Define el estado inicial del carrito
    let initialCart = JSON.parse(localStorage.getItem('cart')) || {
        items: [], // Inicialmente, el carrito no tiene items
        total: 0 // El costo total inicialmente es 0
    };

    if (initialCart.total === null) {
        initialCart.total = 0;
    }
    return (
        {
            // Define el estado inicial del carrito
            cart: initialCart,
            // Define una función para agregar items al carrito
            addToCart: (item) => set((state) => {
                // Crea una copia del estado actual del carrito
                const cart = { ...state.cart }
                // Si el carrito ya tiene items y el restaurante del nuevo item es diferente al del primer item en el carrito
                if (cart.items.length > 0 && cart.items[0].restaurant.id !== item.restaurant.id) {
                    // Muestra una alerta y no agrega el item al carrito
                    return { ...state, showModal: true };
                }
                // Agrega una key única al item
                item.uniqueKey = Date.now();
                // Agrega el nuevo item al carrito
                cart.items = [...cart.items, item]
                // Aumenta el costo total del carrito
                cart.total = (cart.total || 0) + item.product.costo_unit * item.quantity
                // Retorna el nuevo estado del carrito
                saveCartToLocalStorage(cart);
                return { cart }
            }),
            // Define una función para remover items del carrito
            removeFromCart: (item) => set((state) => {
                // Crea una copia del estado actual del carrito
                const cart = { ...state.cart }
                //Total a restar
                let totalRestar = 0;
                // Busca el item en el carrito
                const itemsToRemove = cart.items.filter((i) => i.product.id === item.product.id)
                // Resta el precio de cada producto
                itemsToRemove.forEach((item) => {
                    totalRestar += item.product.costo_unit * item.quantity;
                });
                // Remueve el item del carrito
                cart.items = cart.items.filter((i) => i.product.id !== item.product.id)
                // Disminuye el costo total del carrito
                cart.total = (cart.total || 0) - totalRestar
                // Retorna el nuevo estado del carrito
                saveCartToLocalStorage(cart);
                return { cart }
            }),
            // Define una función para limpiar el carrito
            clearCart: () => set((state) => {
                // Retorna el estado inicial del carrito
                const cart = { ...state.cart }
                cart.items = []
                cart.total = 0
                saveCartToLocalStorage(cart);
                return { cart }
            }),
            //define una función para incrementar en 1 la cantidad de un producto en el carrito
            incrementProduct: (index) => set((state) => {
                const cart = { ...state.cart }
                const item = cart.items[index]
                item.quantity += 1
                cart.total += item.product.costo_unit
                saveCartToLocalStorage(cart);
                return { cart }
            }),
            //define una función para decrementar en 1 la cantidad de un producto en el carrito
            decrementProduct: (index) => set((state) => {
                const cart = { ...state.cart }
                const item = cart.items[index]
                if (item.quantity > 1) {
                    item.quantity -= 1
                    cart.total -= item.product.costo_unit
                } else {
                    cart.items.splice(index, 1);
                    cart.total -= item.product.costo_unit
                }
                saveCartToLocalStorage(cart);
                return { cart }
            }),
            // Define una función para mostrar un modal de conflictos
            showModal: false,
            toggleModal: () => set((state) => ({ showModal: !state.showModal })),
            // Define una función para cerrar el modal de carrito
            showCartModal: false,
            toggleCartModal: () => set((state) => ({ showCartModal: !state.showCartModal }))
        }
    )
});