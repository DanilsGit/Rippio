import { Footer } from "@m/core/components/footer/Footer";
import HeaderSearch from "@m/core/components/headerSearch/HeaderSearch";
import { Outlet } from 'react-router-dom';

import './profile.css'

import { useAuth } from "@m/core/hooks/useAuth";
import { ProfilePanel } from "@m/core/components/ProfilePanel/ProfilePanel";
import { ProfileIcon } from "@m/core/components/profileIcon/ProfileIcon";
import { useCart } from "@m/core/hooks/useCart";


const links = [
    {
        to: '/profile/settings',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FsettingsIcon.png?alt=media&token=10bb50e5-e52e-4516-9163-95f8bca1532b',
        text: 'Ajustes de cuenta'
    },
    {
        to: '/profile/directions',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FubicationIcon.png?alt=media&token=5b448b09-8a03-4e0d-805d-913417f783cc',
        text: 'Direcciones'
    },
    {
        to: '/profile/paymentmethods',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FpaymentMethod.png?alt=media&token=7e222e81-16d2-4dea-a72b-173747dccdc7',
        text: 'Métodos de pago'
    },
    {
        to: '/profile/credits',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcreditsIcon.png?alt=media&token=e608b819-b6cd-4999-a799-a4d27d172fdf',
        text: 'Créditos'
    },
    {
        to: '/profile/orders',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FwatchIcon.png?alt=media&token=0fd1e369-ac01-475f-a219-5a567f89c775',
        text: 'Últimos pedidos'
    }
]



export function Profile() {

    const user = useAuth((state) => state.user)
    const isAuthenticated = useAuth((state) => state.isAuthenticated)
    const logout = useAuth((state) => state.logout)

    const { loadCartFromLocalStorage, setTokenInCart } = useCart();

    const handleLogout = () => {
        loadCartFromLocalStorage();
        setTokenInCart(null);
        logout();
    }


    return (
        <main className="ProfilePage">
            <HeaderSearch />
            {
                isAuthenticated
                    ?
                    <section className="ProfilePageContent">

                        <section className="ProfileOptionsContainer">
                            <header className="ProfileOptions-header">

                                <ProfileIcon user={user} />

                                <div>
                                    <p>Mi perfil</p>
                                    <p>{user.nombre}</p>
                                </div>
                            </header>
                            <ProfilePanel links={links} />
                            <button onClick={handleLogout} className="ProfileOptions-logout">Cerrar sesión</button>
                        </section>
                        <section className="ProfileChildrenPage">
                            <Outlet />
                        </section>
                    </section>
                    : null
            }
            <Footer />
        </main>
    )
}