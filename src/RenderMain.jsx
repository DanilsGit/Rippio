/* eslint-disable react/prop-types */
// Main.jsx
import React, { useEffect } from 'react';
import { CartModal } from './components/cartModal/CartModal.jsx';
import { ModalConflictProduct } from './components/differentRestaurantModal/ModalConflictProduct.jsx';
import { RouterProvider } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAuth } from './hooks/useAuth.jsx';

function RenderMain({ router }) {
    useEffect(() => {
        const cookie = Cookies.get();
        console.log(cookie);
    }, []);

    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            Cookies.remove('token');
        }else{
            const cookie = Cookies.get();
            console.log(cookie);
        }
    }, [isAuthenticated]);

    return (
        <React.StrictMode>
            <CartModal />
            <ModalConflictProduct />
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default RenderMain;