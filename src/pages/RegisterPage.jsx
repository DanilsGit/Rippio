import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HeaderMainContent } from '../components/principalPage/headerPrincipalPage/HeaderMainContent';

import './registerPage.css'
export function RegisterPage() {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const [isRegisterMode2, setIsRegisterMode2] = useState(false);
    const [isLoginMode2, setIsLoginMode2] = useState(false);
    const params = useParams();

    const handleRegisterClick = () => {
        setIsRegisterMode(true);
    };

    const handleLoginClick = () => {
        setIsRegisterMode(false);
    };

    // Estos botones son para el responsive

    const handleRegisterClick2 = () => {
        setIsRegisterMode2(true);
    };
    
    const handleLoginClick2 = () => {
        setIsLoginMode2(true);
    };

    return (
      <main
        className={`register-login-page ${
          isRegisterMode ? "registerPage-mode" : "loginPage-mode"
        }`}
      >
        <HeaderMainContent />
        <section className="register-login-page-background">
          <section className="register-login-page-content">
            <section className="loginPage-content">
              <form action="" className="loginPage-form">
                <h2 className="loginPage-form-h2">Te damos la bienvenida</h2>
                <div className="loginPage-form-input">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Correo electrónico" />
                </div>
                <div className="loginPage-form-input">
                  <i className="fas fa-lock"></i>
                  <input type="password" placeholder="Contraseña" />
                </div>
                <p className="incorrect">* La contraseña es incorrecta</p>

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
                    class="registerPage-button2"
                    onClick={handleRegisterClick}
                  >
                    ¡Regístrate!
                  </a>
                </p>
              </form>
            </section>

            <section className="registerPage-content">
              <form action="" className="registerPage-form">
                <h2 className="registerPage-form-h2"> Queremos conocerte</h2>

                <div className="registerPage-form-input">
                  <input type="text" placeholder="Nombre" />
                </div>

                <div className="registerPage-form-input">
                  <input type="password" placeholder="Apellido" />
                </div>

                <div className="registerPage-form-input">
                  <input type="text" placeholder="Número de identificación" />
                </div>

                <div className="registerPage-form-input">
                  <input type="password" placeholder="Teléfono" />
                </div>

                <div className="registerPage-form-input">
                  <input type="text" placeholder="Correo electrónico" />
                </div>

                <div className="registerPage-form-input">
                  <input type="password" placeholder="Contraseña" />
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
                    class="loginPage-button2"
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
                    class="loginPage-button"
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
                    class="registerPage-button"
                    onClick={handleRegisterClick}
                  >
                    Registrate
                  </button>
                  
                </div>
              </div>
            </div>
          </section>
        </section>
      </main>
    );
}

export default RegisterPage;