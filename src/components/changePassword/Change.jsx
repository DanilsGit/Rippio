import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import './change.css'

export function Change() {
    return (
            <div className='chg-background-container'>
                <div className='chg-container'>
                    <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2FRippioHappy.png?alt=media&token=0dc72f88-d0da-446d-9a8e-70165ba3983c'></img>
                    <h1 className='chg-title'>Cambia tu contraseña</h1>
                    <p className='chg-text'>Ingresa tu nueva contraseña, recuerda elegir una contraseña segura para proteger tu información.</p>
                    <form className='chg-form'>
                        <input type='password' placeholder='Nueva contraseña' className='chg-input' />
                        <input type='password' placeholder='Confirma tu nueva contraseña' className='chg-input' />
                        <button className='chg-button'>Cambiar contraseña</button>
                    </form>
                    <p className='chg-text'>¿Recuerdas tu contraseña? <Link to='/login' className='chg-link'>Inicia sesión</Link></p>
                </div>
            </div>
    )
}