import { Footer } from "../../components/footer/Footer";
import { Header } from "../../components/header/Header";
import {Outlet } from 'react-router-dom';

import './profileRestaurant.css'
import { ProfilePanel } from "../../components/ProfilePanel/ProfilePanel";

const links = [
    {
        to: '/profileRestaurant/settings',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FsettingsIcon.png?alt=media&token=10bb50e5-e52e-4516-9163-95f8bca1532b',
        text: 'Información básica'
    },
    {
        to: '/profileRestaurant/menu',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcreditsIcon.png?alt=media&token=4f8e4d3c-3e6b-4c0b-9d5b-1e4c4d7b4b0e',
        text: 'Menú'
    },
    {
        to: '/profileRestaurant/horarios',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FwatchIcon.png?alt=media&token=0fd1e369-ac01-475f-a219-5a567f89c775',
        text: 'Horarios'
    },
    {
        to: '/profileRestaurant/help',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FhelpIcon.png?alt=media&token=04620c4d-2768-49b5-b2b7-e207d36c1ce0',
        text: 'Centro de ayuda'
    }
]

export function ProfileRestaurant() {
    return (
        <main className="ProfileRestaurantPage">
            <Header />
            <section className="ProfileRestaurantPageContent">
                <section className="ProfileRestaurantOptionsContainer">
                    <header className="ProfileRestaurantOptions-header">
                        <img draggable='false' src="https://via.placeholder.com/150" alt="Foto de perfil" />
                        <div>
                            <p>Restaurante nombre</p>
                        </div>
                    </header>
                    <ProfilePanel links={links} />
                </section>
                <section className="ProfileRestaurantChildrenPage">
                    <Outlet />
                </section>
            </section>
            <Footer />
        </main>
    )
}