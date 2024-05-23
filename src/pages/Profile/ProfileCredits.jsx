import { Link } from 'react-router-dom'
import './profileCredits.css'
import { useAuth } from '../../hooks/useAuth';

export function ProfileCredits(){
    const user = useAuth((state) => state.user);
    return (
        <>
            <section className='ProfileCredits-blackSection'>
                <h1 className="ProfileCredits-h1">Tus créditos</h1>
                <span>${user.creditos ? user.creditos : 0}</span>
            </section>
            <section className='ProfileCredits-questionSection'>
                <h2 className="ProfileCredits-questionSection-gridItem ProfileCredits-h2">Preguntas frecuentes</h2>
                <Link className='ProfileCredits-questionSection-gridItem' to="/info">¿Cómo funcionan los créditos?</Link>
                <Link className='ProfileCredits-questionSection-gridItem' to="/info">¿Cómo usar mis créditos?</Link>
                <Link className='ProfileCredits-questionSection-gridItem' to="/info">Maneras de adquirir créditos</Link>
                <Link className='ProfileCredits-questionSection-gridItem' to="/info">Más información acerca de los créditos</Link>
            </section>
        </>
    )
}