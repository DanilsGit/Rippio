import { useState } from 'react';
import { HeaderNav } from '../../components/headerNav/HeaderNav';
import { Footer } from '../../components/footer/Footer';
import { useAuth } from '../../hooks/useAuth';

import './registerPage.css'
import { Register } from './Register';

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


  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const newUserRegister = { ...userRegister };
    if (!isUserMode) {
      newUserRegister.apellido = '';
      newUserRegister.tipo_usuario = 3;
    }
    console.log(newUserRegister);
    await register(newUserRegister);
    setUserRegister(newUserRegister);
  }

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    await login(userLogin)
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
        title_register: 'Haz crecer tu restaurante',
        button_register: 'Registrar restaurante',
        title_login: '¿Tu restaurante ya está en rippio?',
        p_login: 'Inicia sesión para gestionar tu restaurante y ver tus pedidos.',
        button_login: 'Administrar!'
      },
      login: {
        title_login: 'Administra tu restaurante',
        button_login: 'Gestionar',
        title_register: '¿Aún no estás con nosotros?',
        p_register: 'Registra tu restaurante con nosotros y aumenta tus ventas.',
        button_register: 'Comenzar!'
      }
    }
  ]


  return (
    <main
      className={`register-login-page ${isRegisterMode ? "registerPage-mode" : "loginPage-mode"
        }`}
    >
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
                ? <h2>Consigue visibilidad</h2>
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