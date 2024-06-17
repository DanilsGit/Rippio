import { Link } from 'react-router-dom';
import './sendEmail.css'
import { useState } from 'react';
import { forgotPassword } from '../../api/user';

export function SendEmail() {

    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await forgotPassword(email, new Date())
            console.log(res.data);
            setSuccess(true)
        } catch (error) {
            console.log(error);
            setError(error.response.data.message)
            setTimeout(() => {
                setError(null)
            }, 3000);
        }
        setLoading(false)
    }
    
    return (
        <div className='send-background-container'>
            <div className='send-email-container'>
                {
                    success ?
                        <div className='send-email-container-title'>
                            <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2FRippioHappy.png?alt=media&token=0dc72f88-d0da-446d-9a8e-70165ba3983c'></img>
                            <h1 className='send-email-title'>Correo enviado!</h1>
                            <p className='send-email-text'>Hemos enviado un correo a tu dirección de correo electrónico con un enlace para que puedas restablecer tu contraseña.</p>
                        </div>
                        :
                        <>
                            <div className='send-email-container-title'>
                                <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2FRippioSad.png?alt=media&token=c51235d0-0054-4d2e-8e86-02ef0f69211e'></img>
                                <h1 className='send-email-title'>¿Olvidaste tu contraseña?</h1>
                                <p className='send-email-text'>Ingresa tu correo electrónico y te enviaremos un enlace para que puedas restablecerla.</p>
                            </div>
                            <form
                                onSubmit={handleSubmit}
                                className='send-email-form'>
                                <input type='email' placeholder='Correo electrónico' className='send-email-input'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button className='send-email-button'>
                                    {
                                        loading ? 'Enviando correo...' : 'Enviar correo'
                                    }
                                </button>
                            </form>
                        </>
                }
                <p className='send-email-text'>¿Recuerdas tu contraseña? <Link to='/login' className='send-email-link'>Inicia sesión</Link></p>
                {
                    error && <p
                        style={{ color: 'red' }}
                    >{error}</p>
                }
            </div>
        </div>
    )
}