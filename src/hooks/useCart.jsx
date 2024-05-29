// Importa la función 'create' de la biblioteca 'zustand'
import { create } from 'zustand'
import { getCart, addToCart, removeFromCart, clearCart } from '../api/cart';
import uuid from 'react-uuid';


const saveCartToLocalStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart));
}


function updateCart(cart, item, token) {
    // si el producto ya existe en el carrito con las mismas observaciones, se aumenta la cantidad
    const existingItems = cart.items.filter((i) => i.product.id === item.product.id);
    let existingItemsWithSameObservation = [];

    for (let existingItem of existingItems) {
        if (existingItem.product.observation === item.product.observation) {
            existingItemsWithSameObservation.push(existingItem);
        }
    }

    if (existingItemsWithSameObservation.length > 0) {
        for (let existingItem of existingItemsWithSameObservation) {
            const newQuantity = existingItem.quantity + item.quantity;
            existingItem.quantity = newQuantity;
            cart.total += item.product.costo_unit * item.quantity;
            if (token) {
                const observation = item.product.observation || 'N/A';
                addToCart(token, item.product.id, newQuantity, observation)
            }
            else {
                saveCartToLocalStorage(cart);
            }
        }
    }
    if (existingItemsWithSameObservation.length === 0) return null;
    return { cart };
}

// Crea un nuevo hook personalizado llamado 'useCart'
export const useCart = create((set) => {
    // Define el estado inicial del carrito
    let initialCart = {
        items: [], // Inicialmente, el carrito no tiene items
        total: 0, // El costo total inicialmente es 0
        restaurant: null // Inicialmente, el carrito no tiene restaurante
    };

    const setTokenInCart = (token) => {
        set({ token });
    }

    const loadCartFromLocalStorage = () => {
        const cart = JSON.parse(localStorage.getItem('cart'));
        if (cart) {
            set({ cart });
        }else{
            set({ cart: initialCart });
        }
    };

    const loadCartFromDatabase = (token) => {
        getCart(token).then((res) => {
            if (res.data.length > 0) {
                const cart = {
                    items: res.data.map((item) => {
                        if (item.observacion === 'N/A') item.observacion = null
                        return {
                            product: {
                                id: item.id_producto,
                                costo_unit: item.cost_unit,
                                nombre: item.nombre,
                                descripcion: item.descripcion,
                                estado: item.disponible,
                                img_product: item.img_product,
                                observation: item.observacion,
                            },
                            quantity: item.cantidad_prod,
                            uniqueKey: uuid()
                        }
                    }),
                    total: res.data.reduce((acc, item) => acc + item.cost_unit * item.cantidad_prod, 0),
                    restaurant: {
                        id: res.data[0].id_restaurante,
                        nombre: res.data[0].nombre_restaurante
                    }
                }
                set({ cart });
            }
            else{
                set({ cart: initialCart });
            }
        }).catch((err) => {
            console.log(err);
        });
    };


    return (
        {
            // Define el estado inicial del carrito
            cart: initialCart,
            // Define el token inicial del carrito
            token: null,
            // Define una función para guardar el token en el carrito
            setTokenInCart,
            // Define una función para cargar el carrito desde el local storage
            loadCartFromLocalStorage,
            // Define una función para cargar el carrito desde la base de datos
            loadCartFromDatabase,
            // Define una función para agregar items al carrito
            addToCart: (item) => set((state) => {
                // Crea una copia del estado actual del carrito
                const cart = { ...state.cart }
                // Si el carrito ya tiene items y el restaurante del nuevo item es diferente al del primer item en el carrito
                if (cart.items.length > 0 && cart.restaurant.id !== item.restaurantNomId.id) {
                    // Muestra una alerta y no agrega el item al carrito
                    return { ...state, showModal: true };
                }

                //Si el producto ya existe en el carrito con las mismas observaciones, se aumenta la cantidad
                const updatedCart = updateCart(cart, item, state.token);

                // Retorna el nuevo estado del carrito
                if (updatedCart) return updatedCart;

                // Agrega una key única al item
                item.uniqueKey = uuid();
                // Agrega el nuevo item al carrito
                cart.items = [...cart.items,
                {
                    product: item.product,
                    quantity: item.quantity,
                    uniqueKey: item.uniqueKey,
                }
                ]
                //Si el carrito no tiene restaurante, se le asigna el restaurante del item
                if (cart.restaurant === null) {
                    cart.restaurant = {
                        id: item.restaurantNomId.id,
                        nombre: item.restaurantNomId.nombre
                    }
                }
                // Aumenta el costo total del carrito
                cart.total = (cart.total || 0) + item.product.costo_unit * item.quantity

                //Si está autenticado, se guarda el carrito en la base de datos.
                //token, id del producto, cantidad y observaciones
                if (state.token) {
                    const observation = item.product.observation || 'N/A';
                    addToCart(state.token, item.product.id, item.quantity, observation)
                }
                else {
                    saveCartToLocalStorage(cart);
                }

                // Retorna el nuevo estado del carrito
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
                if (cart.items.length === 0) {
                    cart.restaurant = null;
                }
                //Si está autenticado, remueve el producto de la base de datos
                if (state.token) {
                    const observation = item.product.observation || 'N/A';
                    removeFromCart(state.token, item.product.id, observation, true);
                }
                else {
                    saveCartToLocalStorage(cart);
                }
                return { cart }
            }),
            // Define una función para limpiar el carrito
            clearCart: () => set((state) => {
                // Retorna el estado inicial del carrito
                const cart = { ...state.cart }
                cart.items = []
                cart.total = 0
                cart.restaurant = null
                if (state.token) {
                    clearCart(state.token);
                }else{
                    saveCartToLocalStorage(cart);
                }
                return { cart }
            }),
            //define una función para incrementar en 1 la cantidad de un producto en el carrito
            incrementProduct: (index) => set( (state) => {
                const cart = { ...state.cart }
                const item = cart.items[index]
                const newQuantity = item.quantity + 1
                item.quantity = newQuantity
                cart.total += item.product.costo_unit
                if (state.token) {
                    const observation = item.product.observation || 'N/A';
                    addToCart(state.token, item.product.id, newQuantity, observation)
                } else {
                    saveCartToLocalStorage(cart);
                }
                return { cart }
            }),
            //define una función para decrementar en 1 la cantidad de un producto en el carrito
            decrementProduct: (index) => set((state) => {
                const cart = { ...state.cart }
                const item = cart.items[index]
                if (item.quantity > 1) {
                    const newQuantity = item.quantity - 1
                    item.quantity = newQuantity
                    cart.total -= item.product.costo_unit
                    if (state.token) {
                        const observation = item.product.observation || 'N/A';
                        addToCart(state.token, item.product.id, newQuantity, observation)
                    } else {
                        saveCartToLocalStorage(cart);
                    }
                }
                else {
                    cart.items.splice(index, 1);
                    cart.total -= item.product.costo_unit
                    if (cart.items.length === 0) {
                        cart.restaurant = null;
                    }
                    if (state.token) {
                        const observation = item.product.observation || 'N/A';
                        removeFromCart(state.token, item.product.id, observation, false);
                    } else {
                        saveCartToLocalStorage(cart);
                    }
                }
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