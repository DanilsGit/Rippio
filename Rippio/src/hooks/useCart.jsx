// Importa la función 'create' de la biblioteca 'zustand'
import { create } from 'zustand'

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Crea un nuevo hook personalizado llamado 'useCart'
export const useCart = create((set) => ({
    // Define el estado inicial del carrito
    cart: JSON.parse(localStorage.getItem('cart')) || {
        items: [], // Inicialmente, el carrito no tiene items
        total: 0 // El costo total inicialmente es 0
    },
    // Define una función para agregar items al carrito
    addToCart: (item) => set((state) => {
        // Crea una copia del estado actual del carrito
        const cart = { ...state.cart }
        // Si el carrito ya tiene items y el restaurante del nuevo item es diferente al del primer item en el carrito
        if (cart.items.length > 0 && cart.items[0].restaurantId !== item.restaurantId) {
            // Muestra una alerta y no agrega el item al carrito
            return { ...state, showModal: true };
        }
        // Agrega el nuevo item al carrito
        cart.items = [...cart.items, item]
        // Aumenta el costo total del carrito
        cart.total += item.product.costo_unit
        // Retorna el nuevo estado del carrito
        saveCartToLocalStorage(cart);
        return { cart }
    }),
    // Define una función para remover items del carrito
    removeFromCart: (item) => set((state) => {
        // Crea una copia del estado actual del carrito
        const cart = { ...state.cart }
        // Remueve el item del carrito
        cart.items = cart.items.filter((i) => i.product.id !== item.product.id)
        // Disminuye el costo total del carrito
        cart.total -= item.product.costo_unit
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
    // Define una función para mostrar un modal
    showModal: false,
    toggleModal: () => set((state) => ({ showModal: !state.showModal })),
}));

