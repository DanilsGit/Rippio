import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './sendEmail.css'

export function SendEmail() {
    return (
            <div className='send-background-container'>
                <div className='send-email-container'>
                    <h1 className='send-email-title'>¿Olvidaste tu contraseña?</h1>
                    <p className='send-email-text'>Ingresa tu correo electrónico y te enviaremos un enlace para que puedas restablecer tu contraseña.</p>
                    <form className='send-email-form'>
                        <input type='email' placeholder='Correo electrónico' className='send-email-input' />
                        <button className='send-email-button'>Enviar</button>
                    </form>
                    <p className='send-email-text'>¿Recuerdas tu contraseña? <Link to='/login' className='send-email-link'>Inicia sesión</Link></p>
                </div>
            </div>
    )
}