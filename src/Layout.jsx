import { Outlet } from "react-router-dom"
import { CartModal } from './components/Modals/cartModal/CartModal.jsx';
import { ModalConflictProduct } from './components/Modals/differentRestaurantModal/ModalConflictProduct.jsx';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLocation } from "./constants/location.js";

export default function Layout() {

    const myRoute = useLocation();
    useEffect(() => {
        getLocation();
    }, [myRoute]);

    return (
        <>
            <CartModal />
            <ModalConflictProduct />
            <Outlet />
        </>
    )
}