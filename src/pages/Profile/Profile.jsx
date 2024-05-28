import { Footer } from "../../components/footer/Footer";
import { HeaderSearch } from "../../components/headerSearch/HeaderSearch";
import { Outlet } from 'react-router-dom';

import './profile.css'

import { useAuth } from "../../hooks/useAuth";
import { ProfilePanel } from "../../components/ProfilePanel/ProfilePanel";
import { useState } from "react";
import axios from "axios";
import { uploadFile } from "../../constants/image";
import { ProfileIcon } from "../../components/profile/ProfileIcon";


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
    const setUser = useAuth((state) => state.setUser)
    const token = useAuth((state) => state.token)
    const isAuthenticated = useAuth((state) => state.isAuthenticated)
    const logout = useAuth((state) => state.logout)

    const [loading, setLoading] = useState(false)

    const handleInputProfileChange = async (e) => {
        setLoading(true);
        try {
            const newImage = await uploadFile(e.target.files[0], 'UserIcon', user.id);
            await axios.post('https://rippio-api.vercel.app/api/profile/modify_profile_image', {
                image: newImage
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setUser({ ...user, img_icon: newImage });
        } catch (error) {
            console.error(error);
        }
        e.target.value = null;
        setLoading(false);
    }

    const handleButtonClick = () => {
        const upload = document.getElementById('upload');
        upload.click();
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


                                <ProfileIcon loading={loading} handleInputProfileChange={handleInputProfileChange} handleButtonClick={handleButtonClick} user={user} />

                                <div>
                                    <p>Mi perfil</p>
                                    <p>{user.nombre}</p>
                                </div>
                            </header>
                            <ProfilePanel links={links} />
                            <button onClick={logout} className="ProfileOptions-logout">Cerrar sesión</button>
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