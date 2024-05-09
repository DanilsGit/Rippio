import { Link } from 'react-router-dom'
import './profileCredits.css'

export function ProfileCredits(){
    return (
        <>
            <section className='ProfileCredits-blackSection'>
                <h1 className="ProfileCredits-h1">Tus créditos</h1>
                <span>$100</span>
            </section>
            <section className='ProfileCredits-questionSection'>
                <h2 className="ProfileCredits-questionSection-gridItem ProfileCredits-h2">Preguntas frecuentes</h2>
                <Link className='ProfileCredits-questionSection-gridItem' to="/">¿Cómo funcionan los créditos?</Link>
                <Link className='ProfileCredits-questionSection-gridItem' to="/">¿Cómo usar mis créditos?</Link>
                <Link className='ProfileCredits-questionSection-gridItem' to="/">Maneras de adquirir créditos</Link>
                <Link className='ProfileCredits-questionSection-gridItem' to="/">Más información acerca de los créditos</Link>
            </section>
        </>
    )
}