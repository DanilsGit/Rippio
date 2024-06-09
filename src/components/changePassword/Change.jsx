import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './change.css'

export function Change() {
    return (
            <div className='change-background-container'>
                <div className='change-container'>
                    <h1 className='change-title'>Cambia tu contraseña</h1>
                    <p className='change-text'>Ingresa tu nueva contraseña.</p>
                    <form className='change-form'>
                        <input type='password' placeholder='Nueva contraseña' className='change-input' />
                        <input type='password' placeholder='Confirma tu nueva contraseña' className='change-input' />
                        <button className='change-button'>Cambiar contraseña</button>
                    </form>
                    <p className='change-text'>¿Recuerdas tu contraseña? <Link to='/login' className='change-link'>Inicia sesión</Link></p>
                </div>
            </div>
    )
}