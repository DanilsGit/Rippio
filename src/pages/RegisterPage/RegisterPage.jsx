import { useState } from 'react';
import { HeaderNav } from '../../components/headerNav/HeaderNav';
import { Footer } from '../../components/footer/Footer';
import { useAuth } from '../../hooks/useAuth';

import './registerPage.css'
import { Register } from './Register';
import { useCart } from '../../hooks/useCart';
import { CartLocalDBModal } from '../../components/Modals/sendLocalToDBCartModal/CartLocalDBModal';

import { addToCart } from '../../api/cart'

export function RegisterPage() {

  const register = useAuth((state) => state.register)
  const login = useAuth((state) => state.login)
  const errors = useAuth((state) => state.errors)

  const [isUserMode, setIsUserMode] = useState(true);

  const [userRegister, setUserRegister] = useState({
    identificacion: '',
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    password: '',
    tipo_usuario: 1
  })


  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })

  const [isOpenCartToDBModal, setIsOpenCartToDBModal] = useState(false)

  const { loadCartFromDatabase, loadCartFromLocalStorage, setTokenInCart, clearCart } = useCart();
  const cart = useCart((state) => state.cart)

  const handleConfirmMoveCart = async () => {
    await login(userLogin)
    const token = localStorage.getItem('token');
    if (token) {
      setTokenInCart(token);
      await clearCart();
      await Promise.all(cart.items.map(async (item) => {
        const observation = item.product.observation || 'N/A';
        await addToCart(token, item.product.id, item.quantity, observation)
      }))
      await loadCartFromDatabase(token);
    }
  }

const dontMoveCart = async () => {
  const userLoginTrim = { email: userLogin.email.trim(), password: userLogin.password.trim() }
  await login(userLoginTrim)
  const token = localStorage.getItem('token');
  if (token) {
    setTokenInCart(token);
    await loadCartFromDatabase(token);
  }
}
  const handleSubmitLogin = (e) => {
    e.preventDefault()
    if (cart.items.length > 0) {
      setIsOpenCartToDBModal(true)
    } else {
      dontMoveCart()
    }
  }

  const [clickOnRegister, setClickOnRegister] = useState(false);
  
  const handleSubmitRegister = async (e) => {
    if (clickOnRegister) return;
    setClickOnRegister(true);
    e.preventDefault();
    const newUserRegister = { ...userRegister };
    if (!isUserMode) {
      newUserRegister.apellido = '';
      newUserRegister.tipo_usuario = 3;
    }
    const UserRegisterTrim =
    {
      identificacion: newUserRegister.identificacion.trim(),
      nombre: newUserRegister.nombre.trim(),
      apellido: newUserRegister.apellido.trim(),
      email: newUserRegister.email.trim(),
      telefono: newUserRegister.telefono.trim(),
      password: newUserRegister.password.trim(),
      tipo_usuario: newUserRegister.tipo_usuario
    }
    const res = await register(UserRegisterTrim)
    if(!res) return
    await login({ email: UserRegisterTrim.email, password: UserRegisterTrim.password });
    const token = localStorage.getItem('token');
    if (token) {
      setTokenInCart(token);
      loadCartFromLocalStorage();
      await Promise.all(cart.items.map(async (item) => {
        const observation = item.product.observation || 'N/A';
        await addToCart(token, item.product.id, item.quantity, observation)
      }))
    }
  }


  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterMode(true);
  };

  const handleLoginClick = () => {
    setIsRegisterMode(false);
  };

  const handleSwitchUserToRestaurant = (e) => {
    e.preventDefault()
    setIsUserMode(!isUserMode)
  }

  const textToLogins = [
    // usuarios [0], restaurantes [1]
    {
      register: {
        title_register: 'Queremos conocerte',
        button_register: 'Regístrate',
        title_login: '¿Ya tienes una cuenta?',
        p_login: 'Si ya eres parte de la familia, inicia sesión para disfrutar de los mejores platillos.',
        button_login: 'Inicia sesión'
      },
      login: {
        title_login: 'Te damos la bienvenida',
        button_login: 'Inicia sesión',
        title_register: '¿Aún no tienes una cuenta?',
        p_register: 'Registrándote con nosotros, tendrás acceso a cientos de restaurantes y platillos por probar.',
        button_register: 'Registrarme'
      }
    },
    {
      register: {
        title_register: 'Bienvenido a la familia',
        button_register: 'Registrar restaurante',
        title_login: '¿Tu restaurante ya está en rippio?',
        p_login: 'Inicia sesión para actualizar la información de tu negocio, gestionar tus pedidos y atraer nuevos clientes.',
        button_login: '¡Accede ya!'
      },
      login: {
        title_login: 'Accede a tu restaurante',
        button_login: 'Iniciar sesión',
        title_register: '¿Aún no tienes una cuenta?',
        p_register: 'Al registrar tu restaurante con nosotros, tendrás acceso a numerosos beneficios y clientes potenciales. Tenemos las mejores tarifas y políticas del mercado.',
        button_register: '¡Comienza ya!'
      }
    }
  ]


  return (
    <main
      className={`register-login-page ${isRegisterMode ? "registerPage-mode" : "loginPage-mode"
        }`}
    >
      <CartLocalDBModal show={isOpenCartToDBModal} setShow={setIsOpenCartToDBModal} handleConfirm={handleConfirmMoveCart} handleCancel={dontMoveCart} />
      <HeaderNav />
      <section className="register-login-page-background">
        {
          isUserMode
            ?
            <Register userMode={isUserMode} text={textToLogins[0]} setUserLogin={setUserLogin} handleSubmitLogin={handleSubmitLogin} errors={errors} handleRegisterClick={handleRegisterClick} handleLoginClick={handleLoginClick} setUserRegister={setUserRegister} handleSubmitRegister={handleSubmitRegister} />
            :
            <Register userMode={isUserMode} text={textToLogins[1]} setUserLogin={setUserLogin} handleSubmitLogin={handleSubmitLogin} errors={errors} handleRegisterClick={handleRegisterClick} handleLoginClick={handleLoginClick} setUserRegister={setUserRegister} handleSubmitRegister={handleSubmitRegister} />
        }
        <section className='register-login-page-switchUserToRestaurant'>
          <div>
            {
              isUserMode
                ? <h1>¿Eres un restaurante?</h1>
                : <h1>¿Eres un usuario?</h1>
            }
          </div>
          <button onClick={handleSwitchUserToRestaurant}>
            {
              isUserMode
                ? <h2> Acceso negocios </h2>
                : <h2>¡Inicia sesión aquí!</h2>
            }
          </button>
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default RegisterPage;