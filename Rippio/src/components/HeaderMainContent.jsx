import '../css/headerMainContent.css'
import { HeaderDrawer } from './HeaderDrawer'

export function HeaderMainContent() {
    return (
        <header className='mainContent-header'>
            <div className='mainContent-header-logo'>
                <a href='#'><img className='logoIcon' draggable='false' src='/icons/rippiofood.png' /></a>
            </div>
            <nav className='header-nav'>
                <ul>
                    <li><a href='#'>Principal</a></li>
                    <li><a href='#'>Categorías</a></li>
                    <li><a href='#'>Acerca de nosotros</a></li>
                </ul>
            </nav>
            <section className='header-userSection'>
                <div>
                    <a href='#' className='cartLink'><img className='cartIcon' src='/icons/cartIcon.png' /></a>
                </div>
                <div>
                    <a href='#'><div className='userlink'><img className='userIcon' src='/icons/userIcon.png' /><span className='userText'>Ingresa</span></div></a>
                </div>

                <HeaderDrawer />
            </section>
        </header>
    )
}