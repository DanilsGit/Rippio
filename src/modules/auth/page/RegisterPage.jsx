import { useState } from 'react';
import HeaderNav from '@m/core/components/headerNav/HeaderNav';
import { Footer } from '@m/core/components/footer/Footer';
import './registerPage.css'
import { Register } from '@m/auth/components/register/Register';
import { CartLocalDBModal } from '@m/core/modals/sendLocalToDBCartModal/CartLocalDBModal';
import { textToLogins } from '../utils/dataText';
import { UserRegisterAndLogin } from '../hooks/UserRegisterAndLogin';

export default function RegisterPage() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  const { isUserMode,
    isOpenCartToDBModal,
    setIsOpenCartToDBModal,
    handleConfirmMoveCart,
    dontMoveCart,
    setUserLogin,
    setUserRegister,
    handleSubmitLogin,
    handleSubmitRegister,
    handleSwitchUserToRestaurant,
    errors
  } = UserRegisterAndLogin();

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