import { Outlet } from "react-router-dom"
import { CartModal } from './components/Modals/cartModal/CartModal.jsx';
import { ModalConflictProduct } from './components/Modals/differentRestaurantModal/ModalConflictProduct.jsx';

export default function Layout() {
    return (
        <>
            <CartModal />
            <ModalConflictProduct />
            <Outlet />
        </>
    )
}