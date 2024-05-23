import { Footer } from "../../components/footer/Footer";
import { HeaderSearch } from "../../components/headerSearch/HeaderSearch";
import {Outlet } from 'react-router-dom';

import './profile.css'

import { useAuth } from "../../hooks/useAuth";
import { ProfilePanel } from "../../components/ProfilePanel/ProfilePanel";


const links = [
    {
        to: '/profile/settings',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FsettingsIcon.png?alt=media&token=10bb50e5-e52e-4516-9163-95f8bca1532b',
        text: 'Ajustes de cuenta'
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
    },
    {
        to: '/info',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FhelpIcon.png?alt=media&token=04620c4d-2768-49b5-b2b7-e207d36c1ce0',
        text: 'Centro de ayuda'
    }
]

export function Profile() {

    const user = useAuth((state) => state.user)
    const isAuthenticated = useAuth((state) => state.isAuthenticated)



    return (
        <main className="ProfilePage">
            <HeaderSearch />
            {
                isAuthenticated
                ?
                <section className="ProfilePageContent">

                <section className="ProfileOptionsContainer">
                    <header className="ProfileOptions-header">
                        <img draggable='false' src={user.img_icon} alt="Foto de perfil" />
                        <div>
                            <p>Mi perfil</p>
                            <p>{user.nombre}</p>
                        </div>
                    </header>
                    <ProfilePanel links={links} />
                    <button className="ProfileOptions-logout">Cerrar sesión</button>
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