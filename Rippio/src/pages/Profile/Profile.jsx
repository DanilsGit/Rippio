import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import {Outlet, NavLink } from 'react-router-dom';

import './profile.css'

function getLinkClass({ isActive }) {
    return isActive ? 'ProfileOption-activeLink' : 'ProfileOption-Link';
}

export function Profile() {
    return (
        <main className="ProfilePage">
            <Header />
            <section className="ProfilePageContent">
                <section className="ProfileOptionsContainer">
                    <header className="ProfileOptions-header">
                        <img draggable='false' src="https://via.placeholder.com/150" alt="Foto de perfil" />
                        <div>
                            <p>Mi perfil</p>
                            <p>Invitado</p>
                        </div>
                    </header>
                    <section>
                        <nav>
                            <ul>
                                <li><NavLink className={getLinkClass} to="/profile/settings">
                                <img src="https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FsettingsIcon.png?alt=media&token=10bb50e5-e52e-4516-9163-95f8bca1532b" alt="icono de ajustes" />
                                Ajustes de cuenta</NavLink></li>
                                <li><NavLink className={getLinkClass} to="/profile/credits">
                                <img src="https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcreditsIcon.png?alt=media&token=e608b819-b6cd-4999-a799-a4d27d172fdf" alt="icono de créditos" />
                                Créditos</NavLink></li>
                                <li><NavLink className={getLinkClass} to="/profile/orders">
                                <img src="https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FwatchIcon.png?alt=media&token=0fd1e369-ac01-475f-a219-5a567f89c775" alt="icono de pedidos" />
                                Últimos pedidos</NavLink></li>
                                <li><NavLink className={getLinkClass} to="/profile/help">
                                <img src="https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FhelpIcon.png?alt=media&token=04620c4d-2768-49b5-b2b7-e207d36c1ce0" alt="icono de ayuda" />
                                Centro de ayuda</NavLink></li>
                            </ul>
                        </nav>
                    </section>
                </section>
                <section className="ProfileChildrenPage">
                    <Outlet />
                </section>
            </section>
            <Footer />
        </main>
    )
}