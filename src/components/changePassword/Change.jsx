/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './change.css'
import { useState } from 'react';
import { resetPassword } from '../../api/user';

export function Change({ token }) {

    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (newPassword !== confirmNewPassword) {
            setError('Las contraseñas no coinciden')
            setTimeout(() => {
                setError(null)
            }, 3000);
            return
        }
        setLoading(true)
        try {
            const res = await resetPassword(token, 'newPassword', 'newPassword', new Date())
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false)
    }

    const [error, setError] = useState(null)

    return (
        <div className='chg-background-container'>
            <div className='chg-container'>
                <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2FRippioHappy.png?alt=media&token=0dc72f88-d0da-446d-9a8e-70165ba3983c'></img>
                <h1 className='chg-title'>Cambia tu contraseña</h1>
                <p className='chg-text'>Ingresa tu nueva contraseña, recuerda elegir una contraseña segura para proteger tu información.</p>
                <form
                    onSubmit={handleSubmit}
                    className='chg-form'>
                    <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        type='password' placeholder='Nueva contraseña' className='chg-input' />
                    <input
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    type='password' placeholder='Confirma tu nueva contraseña' className='chg-input' />
                    <button className='chg-button'>
                        {
                            loading ? 'Cambiando contraseña...' : 'Cambiar contraseña'
                        }
                    </button>
                </form>
                <p className='chg-text'>¿Recuerdas tu contraseña? <Link to='/login' className='chg-link'>Inicia sesión</Link></p>
                {
                    error && <p
                        style={{ color: 'red' }}
                    >{error}</p>
                }
            </div>
        </div>
    )
}