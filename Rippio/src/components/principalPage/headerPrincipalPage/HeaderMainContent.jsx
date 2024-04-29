import './headerPrincipalPage.css'
import { HeaderDrawer } from './HeaderDrawer'
import rippioFoodLogo from '/principalPage/icons/rippiofood.png'
import cartIcon from '/principalPage/icons/cartIcon.png'
import userIcon from '/principalPage/icons/userIcon.png'


export function HeaderMainContent() {
    return (
        <header className='mainContent-header'>
            <div className='mainContent-header-logo'>
                <a href='#'><img className='logoIcon' draggable='false' src={rippioFoodLogo} /></a>
            </div>
            <nav className='header-nav'>
                <ul className='header-ul'>
                    <li className='header-ul-li'><a className='header-a' href='#'>Principal</a></li>
                    <li className='header-ul-li'><a className='header-a' href='#'>Categorías</a></li>
                    <li className='header-ul-li'><a className='header-a' href='#'>Acerca de nosotros</a></li>
                </ul>
            </nav>
            <section className='header-userSection'>
                <div>
                    <a href='#' className='cartLink'><img className='cartIcon' src={cartIcon} /></a>
                </div>
                <div>
                    <a className='header-a'href='#'><div className='userlink'><img className='userIcon' src={userIcon} /><span className='userText'>Ingresa</span></div></a>
                </div>

                <HeaderDrawer />
            </section>
        </header>
    )
}