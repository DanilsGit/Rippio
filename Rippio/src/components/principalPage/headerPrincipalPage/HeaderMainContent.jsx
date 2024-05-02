import './headerPrincipalPage.css'
import { HeaderDrawer } from './HeaderDrawer'
import rippioFoodLogo from '/principalPage/icons/rippiofood.png'
import cartIcon from '/principalPage/icons/cartIcon.png'
import userIcon from '/principalPage/icons/userIcon.png'


export function HeaderMainContent() {
    return (
        <header className='mainContent-headerPrincipalPage'>
            <div className='mainContent-headerPrincipalPage-logo'>
                <a href='#'><img className='logoIcon' draggable='false' src={rippioFoodLogo} /></a>
            </div>
            <nav className='headerPrincipalPage-nav'>
                <ul className='headerPrincipalPage-ul'>
                    <li className='headerPrincipalPage-ul-li'><a className='headerPrincipalPage-a' href='#'>Principal</a></li>
                    <li className='headerPrincipalPage-ul-li'><a className='headerPrincipalPage-a' href='#'>Categorías</a></li>
                    <li className='headerPrincipalPage-ul-li'><a className='headerPrincipalPage-a' href='#'>Acerca de nosotros</a></li>
                </ul>
            </nav>
            <section className='headerPrincipalPage-userSection'>
                <div>
                    <a href='#' className='cartLink'><img className='cartIcon' src={cartIcon} /></a>
                </div>
                <div>
                    <a className='headerPrincipalPage-a'href='#'><div className='userlink'><img className='userIcon' src={userIcon} /><span className='userText'>Ingresa</span></div></a>
                </div>

                <HeaderDrawer />
            </section>
        </header>
    )
}