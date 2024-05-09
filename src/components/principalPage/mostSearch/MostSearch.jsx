import './mostSearch.css'

export function MostSearch() {
    return (
        <section className='thirdSection'>
            <section className="mostSearched">
                <h2 className="mostSearched-title">Lo más buscado hoy</h2>
                <section className="mostSearched-content-items">
                    <div className="mostSearched-item"><p>Pollo Asado</p></div>
                    <div className="mostSearched-item"><p>Churrasco</p></div>
                    <div className="mostSearched-item"><p>Chicharrón</p></div>
                    <div className="mostSearched-item"><p>pizza</p></div>
                    <div className="mostSearched-item"><p>Empanadas</p></div>
                    <div className="mostSearched-item"><p>Salchipapa</p></div>
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