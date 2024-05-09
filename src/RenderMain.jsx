/* eslint-disable react/prop-types */
// Main.jsx
import React, { useEffect } from 'react';
import { CartModal } from './components/cartModal/CartModal.jsx';
import { ModalConflictProduct } from './components/differentRestaurantModal/ModalConflictProduct.jsx';
import { RouterProvider } from "react-router-dom";

function RenderMain({ router }) {
    useEffect(() => {
    }, []);

    return (
        <React.StrictMode>
            <CartModal />
            <ModalConflictProduct />
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default RenderMain;