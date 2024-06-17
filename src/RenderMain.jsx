/* eslint-disable react/prop-types */
// Main.jsx
import React, { useEffect } from 'react';
import { RouterProvider } from "react-router-dom";
import { useAuth } from './hooks/useAuth.jsx';
import { getUserData } from './api/auth.jsx';
import { useCart } from './hooks/useCart.jsx';

function RenderMain({ router }) {

    const user = useAuth((state) => state.user);
    const setUser = useAuth((state) => state.setUser);
    const isAuthenticated = useAuth((state) => state.isAuthenticated);
    const fix = window.localStorage.getItem('fix5') == 'true';


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
    }, []);


    const updateUserData = async () => {
        const newUser = await getUserData(user.id);
        setUser(newUser.data[0]);
    }
    
    useEffect(() => {
        if (isAuthenticated) {
            updateUserData();
        }
        if (!fix) {
            window.localStorage.clear();
            window.localStorage.setItem('fix5', 'true');
        }
    }, []);


    return (
        <React.StrictMode>
            <RouterProvider router={router} />
        </React.StrictMode>
    );
}

export default RenderMain;