import './headerNav.css'
import { HeaderDrawer } from '../headerDrawer/HeaderDrawer'
import { useCart } from '../../hooks/useCart'
import { Link, useMatch } from 'react-router-dom'
import { handleClickCartModal } from '../../constants/cart'
import { useAuth } from '../../hooks/useAuth'

export function HeaderNav() {
    const cart = useCart((state) => state.cart)
    const { toggleCartModal } = useCart()
    const isAuthenticated = useAuth((state) => state.isAuthenticated)
    const user = useAuth((state) => state.user)

    return (
        <header className='mainContent-headerPrincipalPage'>
            <div className='mainContent-headerPrincipalPage-logo'>
                <Link to='/'><img className='logoIcon' draggable='false' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FrippioHeader.png?alt=media&token=f16a9034-cf38-4a78-b93b-a2cedaa10aab' /></Link>
            </div>
            <nav className='headerPrincipalPage-nav'>
                <ul className='headerPrincipalPage-ul'>
                    <li className='headerPrincipalPage-ul-li'>
                        <Link className={useMatch('/') ? 'headerPrincipalPage-a active' : 'headerPrincipalPage-a'} to='/'>Principal</Link>
                    </li>
                    <li className='headerPrincipalPage-ul-li'>
                        <Link className={useMatch('/allrestaurants') ? 'headerPrincipalPage-a active' : 'headerPrincipalPage-a'} to='/allrestaurants'>Restaurantes</Link>
                    </li>
                    <li className='headerPrincipalPage-ul-li'>
                        <Link className={useMatch('/info') ? 'headerPrincipalPage-a active' : 'headerPrincipalPage-a'} to='/info'>Información</Link>
                    </li>
                </ul>
            </nav>
            <section className='headerPrincipalPage-userSection'>
                {
                    !isAuthenticated || user?.tipo_usuario !== 3
                        ?
                        <div>
                            <button onClick={() => handleClickCartModal(toggleCartModal)} className='cartLink'>
                                {
                                    cart.items.length > 0 ?
                                        <img className='cartIcon' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcartContainIcon.png?alt=media&token=acb40490-2b9a-4f8b-a335-25e1ced67b36' />
                                        :
                                        <img className='cartIcon' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcartIcon.png?alt=media&token=e8898b28-899f-4ef7-8468-513ffcde4f9e' />
                                }
                            </button>
                        </div>
                        : null
                }
                <div>
                    {
                        <Link to={isAuthenticated ? '/profile' : '/login'}
                            className='headerPrincipalPage-a'>
                            <div className='userlink'>
                                <img className='userIcon' 
                                src= {isAuthenticated ? user.img_icon : 'https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdefaultUserIcon.png?alt=media&token=4cf7ae75-e6ac-4fc4-b33f-e3d869739818'}
                                 />
                                <span className='userText'>{isAuthenticated ? user.tipo_usuario !== 3 ? user.nombre.split(' ')[0] : user.nombre : 'Ingresa'}
                                </span></div></Link>

                    }
                </div>
                <HeaderDrawer />
            </section>
        </header>
    )
}