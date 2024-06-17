import { useEffect, useState } from 'react';
import './mostSearch.css'
import { Link } from 'react-router-dom';
import { mostOrdered } from '../../../api/order'

export function MostSearch() {

    // Lo más pedido
    const [mostSearched, setMostSearched] = useState(null)

    // Función para traer lo más pedido
    const getMostSearched = async () => {
        const date = new Date()
        const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        const response = await mostOrdered(fecha)
        // Ir retrocediendo la fecha hasta que se encuentre un día con pedidos
        let ordered = response.data;
        while (ordered.length === 0) {
            date.setDate(date.getDate() - 1)
            const fecha = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
            const response = await mostOrdered(fecha)
            ordered = response.data
        }
        setMostSearched(ordered)
    }

    // UseEffect para traer los productos más pedidos
    useEffect(() => {
        getMostSearched()
    }, [])

    if (!mostSearched) return null

    return (
        <section className='thirdSection'>
            <section className="mostSearched">
                <h2 className="mostSearched-title">Lo más pedido hoy</h2>
                <section className="mostSearched-content-items">
                    {
                        mostSearched.map((item, index) => (
                            <div key={index} className="mostSearched-item">
                                <Link to={`/searchpage/${item.category}`} className='mostsearched-link'>{item.category}</Link>
                            </div>
                        ))
                    }
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