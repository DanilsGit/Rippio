import windowIcon from '../assets/windowIcon.png';
import userIcon from '../assets/user.png';
import searchIcon from '../assets/searchIcon.png';
import shoppingCartIcon from '../assets/shoppingCartIcon.png';
import '../css/HeaderMainContent.css'

export function HeaderMainContent() {
    return (
        <header className='mainContent-header'>

            <div className='mainContent-header-div header-child'>
                <a href='#' className='mainContent-header-div-a'>
                    <img draggable='false' className='locoIcon' src={windowIcon} alt="Rippio" />
                </a>
            </div>

            <section className='mainContent-header-searchSection header-child'>
                <img className='mainContent-header-searchSection-img searchLogoIcon' draggable='false' src={windowIcon} alt="Rippio" />
                <input type='search' className='mainContent-header-searchSection-input' placeholder='¡Encuentra tus restaurantes favoritos!'>
                </input>
                <button className='mainContent-header-searchSection-button' type='submit' href='#'>
                    <img className='mainContent-header-searchSection-img' draggable='false' src={searchIcon} alt="Buscar" />
                </button>
            </section>

            <section className='mainContent-header-userSection header-child'>
                <a href='#' className='mainContent-header-userSection-a'>
                    <img draggable='false' className='shoppingCart' src={shoppingCartIcon}></img>
                </a>
                <a className='mainContent-header-userSection-a' href='#'>
                    <div className='mainContent-header-userSection-a-div'>
                        <img draggable='false' className='userIcon' src={userIcon}></img>
                        <p className='mainContent-header-userSection-a-div-p'>Ingresar</p>
                    </div>
                </a>
            </section>
        </header>
    )
}