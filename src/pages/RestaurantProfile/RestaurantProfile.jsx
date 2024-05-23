import { Footer } from "../../components/footer/Footer";
import { HeaderNav } from "../../components/headerNav/HeaderNav";
import { Outlet } from 'react-router-dom';

import './restaurantProfile.css'
import { ProfilePanel } from "../../components/ProfilePanel/ProfilePanel";
import { uploadFile } from "../../constants/image";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";


const links = [
    {
        to: '/restaurantProfile/settings',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FsettingsIcon.png?alt=media&token=10bb50e5-e52e-4516-9163-95f8bca1532b',
        text: 'Información básica'
    },
    {
        to: '/restaurantProfile/menu',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcreditsIcon.png?alt=media&token=4f8e4d3c-3e6b-4c0b-9d5b-1e4c4d7b4b0e',
        text: 'Menú'
    },
    {
        to: '/restaurantProfile/horarios',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FwatchIcon.png?alt=media&token=0fd1e369-ac01-475f-a219-5a567f89c775',
        text: 'Horarios'
    },
    {
        to: '/info',
        icon: 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FhelpIcon.png?alt=media&token=04620c4d-2768-49b5-b2b7-e207d36c1ce0',
        text: 'Centro de ayuda'
    }
]

export function RestaurantProfile() {

    const user = useAuth((state) => state.user)
    const setUser = useAuth((state) => state.setUser)
    const token = useAuth((state) => state.token)
    const isAuthenticated = useAuth((state) => state.isAuthenticated)
    const logout = useAuth((state) => state.logout)

    const [loading, setLoading] = useState(false)


    const handleInputProfileChange = async (e) => {
        setLoading(true);
        try {
            const newImage = await uploadFile(e.target.files[0], 'RestaurantIcon', user.id);
            await axios.post('https://rippio-api.vercel.app/api/profile/modify_profile_image',
            {
                image: newImage
            },
            {
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
        <main className="ProfileRestaurantPage">
            <HeaderNav />
            {
                isAuthenticated
                    ?
                    <section className="ProfileRestaurantPageContent">
                        <section className="ProfileRestaurantOptionsContainer">
                            <header className="ProfileRestaurantOptions-header">
                                {
                                    loading
                                        ? <img id="ProfileRestauran-imgProfile" className="ProfileRestaurantOptions-header-imgProfile loading" draggable='false' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2Floading.png?alt=media&token=b1a554d7-4784-4f3c-892b-662ff72a3804' alt="Foto de perfil" />
                                        : <img id="ProfileRestauran-imgProfile" className="ProfileRestaurantOptions-header-imgProfile" draggable='false' src={user.img_icon} alt="Foto de perfil" />
                                }
                                <div className="ProfileRestaurantOptionsContainer-uploadIconContainer">
                                    <label className="hidden-label" htmlFor="upload">Subir imagen:</label>
                                    <input type="file" id="upload" name="upload" accept=".png, .jpg"
                                        onChange={handleInputProfileChange} />
                                    <button className="ProfileRestaurantOptions-header-button" onClick={handleButtonClick}>
                                        <img draggable='false' className="ProfileRestaurantOptions-header-imgEdit" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="Upload Icon" />
                                    </button>
                                </div>
                                <div>
                                    <h1 className="RestaurantProfileTitle">{user.nombre}</h1>
                                </div>
                            </header>
                            <ProfilePanel links={links} />
                            <button onClick={logout} className="ProfileOptions-logout">Cerrar sesión</button>
                        </section>
                        <section className="ProfileRestaurantChildrenPage">
                            <Outlet />
                        </section>
                    </section>
                    : null
            }
            <Footer />
        </main>
    )
}