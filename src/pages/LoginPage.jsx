/* eslint-disable react/prop-types */
import { HeaderNav } from '../components/headerNav/HeaderNav';
import './loginPage.css'
// hook
import { useState } from 'react';


export function Login() {
    const [username, setusername] = useState('')
    const [password, setpassword] = useState('')
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false)

    const handleClickAdd = () => {
        if (username === '' || password === '') {
            document.getElementById('1').placeholder = 'Campo requerido'
            document.getElementById('2').placeholder = 'Campo requerido'
            setTimeout(() => {
                document.getElementById('1').placeholder = 'username'
                document.getElementById('2').placeholder = 'password'
            }, 2000)
            return
        }
        if (username.length < 3 || password.length < 3) {
            document.getElementById('1').value = ''
            document.getElementById('2').value = ''
            document.getElementById('1').placeholder = 'Usuario muy corto'
            document.getElementById('2').placeholder = 'Contraseña muy corta'
            setTimeout(() => {
                document.getElementById('1').placeholder = 'username'
                document.getElementById('2').placeholder = 'password'
            }, 2000)
            return
        }
        setUsers([...users, { username, password}])
        console.log(users)
    }

    const handleClickShow = () => {
        setShow(!show)
    }

    return (
        <main className='loginpage'>
            <HeaderNav />
            <div className='loginpage-container'>
                <form className='loginpage-form'>
                    <h1 className='loginpage-form-h1'>Inicia Sesión</h1>
                    <div className='loginpage-form-input'>
                        <input className='loginpage-form-input-username' id='1' placeholder='Usuario o correo' type="text" onChange={(e) => { setusername(e.target.value) }} />
                        <input className='loginpage-form-input-password' id='2' placeholder='Contraseña' type="password" onChange={(e) => { setpassword(e.target.value) }} />
                        <label className='loginpage-form-checkbox'>
                            <input type='checkbox' />
                            Recuérdame
                        </label>
                        <button className='loginpage-form-button' onClick={handleClickAdd} >Inicio</button>
                        <a className="loginpage-form-a" href='LoginPage.jsx'> ¿Olvidaste tu contraseña?</a>
                    </div>
                </form>
                <div className='loginpage-welcometext'>
                    <h2 className='loginpage-welcometext-h2'> LLEGASTE AL LUGAR INDICADO</h2>
                    <p className='loginpage-welcometext-p'>¡En <span>Rippio</span> cuentas con más de 1000 establecimientos verificados por nuestro personal para elegir!</p>
                    <p className='loginpage-welcometext-a'>¿Aún no tienes una cuenta? <a href='LoginPage.jsx'> <span>¡</span>Registrate<span>!</span></a></p>
                </div>
                <div className='loginpage-sideline'></div>
                <div className='loginpage-treeimage'>
                    <img src="https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/LoginPage%2Flogintree.png?alt=media&token=6d93b8af-bce2-46c5-8e3e-2e12b67fe2f9" alt="Arbol" />
                </div>
            </div>
        </main>
    )
}

export default Login;