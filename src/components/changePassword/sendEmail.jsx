import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './sendEmail.css'

export function SendEmail() {
    return (
            <div className='send-background-container'>
                <div className='send-email-container'>
                    <div className='send-email-container-title'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2FRippioSad.png?alt=media&token=c51235d0-0054-4d2e-8e86-02ef0f69211e'></img>
                        <h1 className='send-email-title'>¿Olvidaste tu contraseña?</h1>
                        <p className='send-email-text'>Si has olvidado tu contraseña, ingresa tu correo electrónico y te enviaremos un enlace para que puedas restablecerla.</p>
                    </div>
                    <form className='send-email-form'>
                        <input type='email' placeholder='Correo electrónico' className='send-email-input' />
                        <button className='send-email-button'>Enviar</button>
                    </form>
                    <p className='send-email-text'>¿Recuerdas tu contraseña? <Link to='/login' className='send-email-link'>Inicia sesión</Link></p>
                </div>
            </div>
    )
}