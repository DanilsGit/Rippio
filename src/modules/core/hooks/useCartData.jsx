import { useEffect } from "react";
import { useCart } from '@m/core/hooks/useCart';

export const useCartData = () => {
    const { loadCartFromLocalStorage, loadCartFromDatabase, setTokenInCart } = useCart();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            console.log('cargada de database');
            setTokenInCart(token);
            loadCartFromDatabase(token);
        } else {
            setTokenInCart(null);
            loadCartFromLocalStorage();
        }
    }, [setTokenInCart, loadCartFromDatabase, loadCartFromLocalStorage]);
};