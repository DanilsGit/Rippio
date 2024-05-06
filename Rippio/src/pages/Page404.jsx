import { Link } from 'react-router-dom';
import './page404.css'

export function Page404() {
    return (
            <div className='background-container'>
                <div className='information-container'>
                    <h1 className='information-container-h1'>404</h1>
                    <h2 className='information-container-h2'>Opps! Página no encontrada</h2>
                    <p className='information-container-p'>La página que estás buscando no existe.</p>
                    <Link to='/'>
                        <button className='information-container-button'>Volver al inicio</button>
                    </Link>
                </div>
            </div>
    )
}