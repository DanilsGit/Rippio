import { Footer } from "@m/core/components/footer/Footer";
import HeaderNav from "@m/core/components/headerNav/HeaderNav";
import { Outlet } from 'react-router-dom';

import './adminProfile.css'
import { ProfilePanel } from "@m/core/components/ProfilePanel/ProfilePanel";
import { useAuth } from "@m/core/hooks/useAuth";
import { ProfileIcon } from "@m/core/components/profileIcon/ProfileIcon";
import { links } from "../utils/constants";




export function AdminProfile() {

    const user = useAuth((state) => state.user)
    const isAuthenticated = useAuth((state) => state.isAuthenticated)
    const logout = useAuth((state) => state.logout)

    return (
        <main className="ProfileRestaurantPage">
            <HeaderNav />
            {isAuthenticated &&
                <section className="ProfileRestaurantPageContent">
                    <section className="ProfileRestaurantOptionsContainer">
                        <header className="ProfileRestaurantOptions-header">

                            <div className="ProfileRestaurantOptions-header-titleAndIcon">
                                <ProfileIcon />
                                <div>
                                    <h1 className="RestaurantProfileTitle">{user.nombre}</h1>
                                </div>
                            </div>
                        </header>
                        <ProfilePanel links={links} />
                        <button onClick={logout} className="ProfileOptions-logout">Cerrar sesión</button>
                    </section>
                    <section className="ProfileRestaurantChildrenPage">
                        <Outlet />
                    </section>
                </section>
            }
            <Footer />
        </main>
    )
}