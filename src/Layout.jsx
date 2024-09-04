import { Outlet } from "react-router-dom"
import { CartModal } from '@m/core/modals/cartModal/CartModal.jsx';
import { ModalConflictProduct } from '@m/core/modals/differentRestaurantModal/ModalConflictProduct.jsx';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getLocation } from "@m/core/utils/location.js";

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