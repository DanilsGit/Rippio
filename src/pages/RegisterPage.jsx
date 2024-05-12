import { useState } from 'react';
import { useParams } from 'react-router-dom';

import './registerPage.css'
export function RegisterPage() {
    const [isRegisterMode, setIsRegisterMode] = useState(false);
    const params = useParams();

    const handleRegisterClick = () => {
        setIsRegisterMode(true);
    };

    const handleLoginClick = () => {
        setIsRegisterMode(false);
    };

    return (
        <main className={`register-login-page ${isRegisterMode ? 'registerPage-mode' : 'loginPage-mode'}`}>
            <section className='register-login-page-content'>
                <section className='loginPage-content'>
                    <form action="" className='loginPage-form'>
                        <h2 className='loginPage-form-h2'> Inicia Sesión</h2>
                        <div className='loginPage-form-input'>
                            <i className='fas fa-user'></i>
                            <input type="text" placeholder='Nombre de usuario' />
                        </div>
                        <div className='loginPage-form-input'>
                            <i className='fas fa-lock'></i>
                            <input type="password" placeholder='Contraseña' />
                        </div>
                        <input type="submit" value='Iniciar Sesión' className='loginPage-form-button' />
                    </form>
                </section>

                <section className='registerPage-content'>
                    <form action="" className='registerPage-form'>
                        <h2 className='registerPage-form-h2'> Registrate</h2>

                        <div className='registerPage-form-input'>
                            <input type="text" placeholder='Nombre' />
                        </div>

                        <div className='registerPage-form-input'>
                            <input type="password" placeholder='Apellido' />
                        </div>

                        
                        <div className='registerPage-form-input'>
                            <input type="text" placeholder='Número de identificación' />
                        </div>

                        <div className='registerPage-form-input'>
                            <input type="password" placeholder='Teléfono' />
                        </div>

                        
                        <div className='registerPage-form-input'>
                            <input type="text" placeholder='Correo electrónico' />
                        </div>

                        <div className='registerPage-form-input'>
                            <input type="password" placeholder='Contraseña' />
                        </div>

                        <input type="submit" value='Registrate' className='registerPage-form-button' />
                    </form>
                </section>

                <div className='panels-content'>
                    <div className='panel left-panel'>
                        <div className='left-panel-content'>
                            <h3>¿Ya tienes una cuenta?</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In voluptatem sit, sequi cupiditate, non odit perspiciatis libero voluptas deleniti fugit eius. Ipsam ratione maxime voluptates beatae sapiente asperiores doloribus perspiciatis.</p>
                            <button id='loginPage-button' class='loginPage-button' onClick={handleLoginClick}>Inicia sesion</button>
                        </div>
                        
                    </div>
                        
                    <div className='panel right-panel'>
                        <div className='right-panel-content'>
                            <h3>¿Aún no tienes una cuenta?</h3>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. In voluptatem sit, sequi cupiditate, non odit perspiciatis libero voluptas deleniti fugit eius. Ipsam ratione maxime voluptates beatae sapiente asperiores doloribus perspiciatis.</p>
                            <button id='registerPage-button' class='registerPage-button' onClick={handleRegisterClick}>Registrate</button>
                            
                        </div>
                    
                    </div> 

                    
                </div>

            </section>
        </main>
    )
}

export default RegisterPage;