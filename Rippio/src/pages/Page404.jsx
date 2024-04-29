import { Link } from 'react-router-dom';


export function Page404() {
    return (
        <main className='searchPage'>
            <h1> 404 - Página no encontrada </h1>
            <Link to='/'>Volver al inicio</Link>
        </main>
    )
}