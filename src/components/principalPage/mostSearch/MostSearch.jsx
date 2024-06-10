import './mostSearch.css'
import { Link } from 'react-router-dom';

export function MostSearch() {
    return (
        <section className='thirdSection'>
            <section className="mostSearched">
                <h2 className="mostSearched-title">Lo más buscado hoy</h2>
                <section className="mostSearched-content-items">
                    <div className="mostSearched-item"><Link to="/searchpage/Pollo%20Asado" className='mostsearched-link'> Pollo Asado</Link></div>
                    <div className="mostSearched-item"><Link to="/searchpage/Ensalada?" className='mostsearched-link'>Ensalada</Link></div>
                    <div className="mostSearched-item"><Link to="/searchpage/chicharron?" className='mostsearched-link'>Chicharrón</Link></div>
                    <div className="mostSearched-item"><Link to="/searchpage/pizza?" className='mostsearched-link'>pizza</Link></div>
                    <div className="mostSearched-item"><Link to="/searchpage/Empanada?" className='mostsearched-link'>Empanadas</Link></div>
                    <div className="mostSearched-item"><Link to="/searchpage/salchipapa?" className='mostsearched-link'>Salchipapa</Link></div>
                    <div className="mostSearched-item"><Link to="/searchpage/alitas?" className='mostsearched-link'>Alitas</Link></div>
                </section>
            </section>
            <section className="problemReport">
                <img src="/principalPage/icons/warning.png" alt="undraw-Problem-solving-3xdc" border="0" />
                <section className='problemReport-info'>
                    <h2>¿Tuviste problemas con tu pedido?</h2>
                    <p>Contamos con cientos de asesores que están disponibles las 24 horas del día para ayudarte</p>
                </section>
            </section>
        </section>
    )
}