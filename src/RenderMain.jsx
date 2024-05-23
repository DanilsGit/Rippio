/* eslint-disable react/prop-types */
// Main.jsx
import React, { useEffect } from 'react';
import { CartModal } from './components/cartModal/CartModal.jsx';
import { ModalConflictProduct } from './components/differentRestaurantModal/ModalConflictProduct.jsx';
import { RouterProvider } from "react-router-dom";
import { useAuth } from './hooks/useAuth.jsx';
import { getUserData } from './api/auth.jsx';


function RenderMain({ router }) {

    const user = useAuth((state) => state.user);
    const setUser = useAuth((state) => state.setUser);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);

    const updateUserData = async () => {
        const newUser = await getUserData(user.id);
        setUser(newUser.data[0]);
    }

    useEffect(() => {
        if (isAuthenticated) {
            updateUserData();
        }
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