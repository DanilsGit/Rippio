import { Link } from 'react-router-dom';
import './header.css'

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../hooks/useCart'

import { handleClickCartModal } from '../../constants/cart'

export function Header() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const cart = useCart((state) => state.cart)
    const { toggleCartModal } = useCart()


    return (
        <header className='header'>
            <img draggable='false' onClick={() => { navigate(`/`) }} alt='logo_rippio' className='header-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FrippioSimpleLogo.png?alt=media&token=5193a73b-7876-4531-b4ae-0e2098936a40' />
            <form onSubmit={(e) => {
                e.preventDefault;
                search.trim() && navigate(`/searchpage/${search}`);
            }} className='header-form'>
                <input onChange={(e) => { setSearch(e.target.value) }} className='header-form-text' type='text' placeholder='¡Encuentra tus restaurantes favoritos!' />
                <button className='header-form-btn' type='submit'>
                    <img className='header-form-btn-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FsearchIcon.png?alt=media&token=3c385ca2-5e59-4e6e-a2c0-b59e2142a3e3' />
                </button>
            </form>
            <nav className='header-nav'>
                <ul className='header-ul'>
                    <li className='header-li'>
                        <button 
                        onClick={()=>handleClickCartModal(toggleCartModal)}
                        className='header-li-link' to='/cart'>
                            {
                                cart.items.length > 0 ?
                                    <img draggable='false' alt='cart' className='header-li-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcartContainIcon.png?alt=media&token=a3667264-0a76-40ee-92cc-b2344651ab54' />
                                    :
                                    <img draggable='false' alt='cart' className='header-li-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FcartIcon.png?alt=media&token=8544fcaa-130f-4eea-9122-47ada0a95082' />
                            }
                        </button>
                    </li>
                    <li className='header-li'>
                        <Link className='header-li-link' to='/search'>
                            <div className='header-li-div'>
                                <img draggable='false' alt='User' className='header-li-img' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2FdefaultUserIcon.png?alt=media&token=4cf7ae75-e6ac-4fc4-b33f-e3d869739818' />
                                <span>Ingresa</span>
                            </div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}