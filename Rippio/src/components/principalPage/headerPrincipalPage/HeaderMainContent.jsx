import './headerPrincipalPage.css'
import { HeaderDrawer } from './HeaderDrawer'
import { useCart } from '../../../hooks/useCart'
import { Link } from 'react-router-dom'
import { handleClickCartModal } from '../../../constants/cart'


export function HeaderMainContent() {
    const cart = useCart((state) => state.cart)

    const { toggleCartModal } = useCart()

    return (
        <header className='mainContent-headerPrincipalPage'>
            <div className='mainContent-headerPrincipalPage-logo'>
                <a href='#'><img className='logoIcon' draggable='false' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2Frippiofood.png?alt=media&token=3a5253e4-3033-4e9e-8412-a32e53d0358a' /></a>
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
                    <button onClick={()=>handleClickCartModal(toggleCartModal)} className='cartLink'>
                        {
                            cart.items.length > 0 ?
                                <img className='cartIcon' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcartContainIcon.png?alt=media&token=a3667264-0a76-40ee-92cc-b2344651ab54' />
                                :
                                <img className='cartIcon' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcartIcon.png?alt=media&token=8544fcaa-130f-4eea-9122-47ada0a95082' />
                        }
                    </button>
                </div>
                <div>
                    <Link to='/' className='headerPrincipalPage-a'><div className='userlink'><img className='userIcon' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdefaultUserIcon.png?alt=media&token=4cf7ae75-e6ac-4fc4-b33f-e3d869739818' /><span className='userText'>Ingresa</span></div></Link>
                </div>

                <HeaderDrawer />
            </section>
        </header>
    )
}