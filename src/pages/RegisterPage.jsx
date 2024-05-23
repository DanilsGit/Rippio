import { useState } from 'react';
import { HeaderNav } from '../components/headerNav/HeaderNav';
import { Footer } from '../components/footer/Footer';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import './registerPage.css'

export function RegisterPage() {


  const register = useAuth((state) => state.register)
  const login = useAuth((state) => state.login)
  const errors = useAuth((state) => state.errors)
  const userLogged = useAuth((state) => state.user)
  const navigator = useNavigate()


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
    e.preventDefault()
    await register(userRegister)
    if (userLogged) navigator('/profile')
  }

  const [userLogin, setUserLogin] = useState({
    email: '',
    password: ''
  })

  const handleSubmitLogin = async (e) => {
    e.preventDefault()
    console.log(userLogin);
    await login(userLogin)
    if (userLogged) navigator('/profile')
  }

  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const handleRegisterClick = () => {
    setIsRegisterMode(true);
  };

  const handleLoginClick = () => {
    setIsRegisterMode(false);
  };


  return (
    <main
      className={`register-login-page ${isRegisterMode ? "registerPage-mode" : "loginPage-mode"
        }`}
    >
      <HeaderNav />
      <button onClick={(e)=>{e.preventDefault(); console.log(userLogged); console.log(errors)}}>mostrar</button>
      <button onClick={(e)=>{e.preventDefault(); navigator('/profile')}}>perfil</button>

      <section className="register-login-page-background">
        <section className="register-login-page-content">
          <section className="loginPage-content">
            <form
              onSubmit={handleSubmitLogin}
              className="loginPage-form">
              <h2 className="loginPage-form-h2">Te damos la bienvenida</h2>
              <div className="loginPage-form-input">
                <i className="fas fa-user"></i>
                <input type="text" placeholder="Correo electrónico"
                  onChange={(e) => setUserLogin((user) => ({
                    ...user,
                    email: e.target.value
                  }))}
                />
              </div>
              <div className="loginPage-form-input">
                <i className="fas fa-lock"></i>
                <input type="password" placeholder="Contraseña"
                  onChange={(e) => setUserLogin((user) => ({
                    ...user,
                    password: e.target.value
                  }))} />
              </div>
              {
                errors
                ? <p className="incorrect">{errors.message}</p>
                : null
              }
              <input
                type="submit"
                value="Iniciar Sesión"
                className="loginPage-form-button"
              />
              <p className="info">
                ¿Aún no tienes una cuenta?{" "}
                <a
                  href="#"
                  id="registerPage-button2"
                  className="registerPage-button2"
                  onClick={handleRegisterClick}
                >
                  ¡Regístrate!
                </a>
              </p>
            </form>
          </section>

          <section className="registerPage-content">
            <form action="" className="registerPage-form"
              onSubmit={handleSubmitRegister}
            >
              <h2 className="registerPage-form-h2"> Queremos conocerte</h2>

              <div className="registerPage-form-input">
                <input required type="text" placeholder="Nombre" id='registerInputFirstName'
                  onChange={(e) => setUserRegister((user) => ({
                    ...user,
                    nombre: e.target.value
                  }))}
                />
              </div>

              <div className="registerPage-form-input">
                <input required type="text" placeholder="Apellido" id='registerInputLastName'
                  onChange={(e) => setUserRegister((user) => ({
                    ...user,
                    apellido: e.target.value
                  }))}
                />
              </div>

              <div className="registerPage-form-input">
                <input required type="text" placeholder="Número de identificación" id='registerInputId'
                  onChange={(e) => setUserRegister((user) => ({
                    ...user,
                    identificacion: e.target.value
                  }))}
                />
              </div>

              <div className="registerPage-form-input">
                <input required type="text" placeholder="Teléfono" id='registerInputTel'
                  onChange={(e) => setUserRegister((user) => ({
                    ...user,
                    telefono: e.target.value
                  }))}
                />
              </div>

              <div className="registerPage-form-input">
                <input required type="email" placeholder="Correo electrónico" id='registerInputEmail'
                  onChange={(e) => setUserRegister((user) => ({
                    ...user,
                    email: e.target.value
                  }))}
                />
              </div>

              <div className="registerPage-form-input">
                <input required type="password" placeholder="Contraseña" id='registerInputPass'
                  onChange={(e) => setUserRegister((user) => ({
                    ...user,
                    password: e.target.value
                  }))}
                />
              </div>

              <input
                type="submit"
                value="Registrate"
                className="registerPage-form-button"
              />
              <p className="info">
                ¿Ya tienes una cuenta?{" "}
                <a
                  href="#"
                  id="loginPage-button2"
                  className="loginPage-button2"
                  onClick={handleLoginClick}
                >
                  ¡Inicia sesión!
                </a>
              </p>
            </form>
          </section>

          <div className="panels-content">
            <div className="panel left-panel">
              <div className="left-panel-content">
                <h3>¿Ya tienes una cuenta?</h3>
                <p>
                  Si ya eres parte de la familia, inicia sesión para disfrutar de los mejores platillos.
                </p>
                <img className='right-panel-image' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2FDonutAnimation.png?alt=media&token=cd4285ad-cf40-42f4-a68e-eede58de09ec'></img>
                <button
                  id="loginPage-button"
                  className="loginPage-button"
                  onClick={handleLoginClick}
                >
                  Inicia sesion
                </button>
              </div>
            </div>

            <div className="panel right-panel">
              <div className="right-panel-content">
                <h3>¿Aún no tienes una cuenta?</h3>
                <p>
                  Registrándote con nosotros, tendrás acceso a cientos de restaurantes y platillos por probar.
                </p>
                <img className='right-panel-image' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2FSushiAnimation.png?alt=media&token=6712c17a-aa9c-4a54-92b8-7906fc053674'></img>
                <button
                  id="registerPage-button"
                  className="registerPage-button"
                  onClick={handleRegisterClick}
                >
                  Registrate
                </button>

              </div>
            </div>
          </div>
        </section>
      </section>
      <Footer />
    </main>
  );
}

export default RegisterPage;