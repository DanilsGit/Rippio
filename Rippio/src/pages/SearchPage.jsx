import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export function SearchPage() {
    const params = useParams();

    const [productos, setProductos] = useState([]);

    useEffect(() => {
        fetch(`https://dummyjson.com/products`)
            .then(res => res.json())
            .then(data => {
                setProductos(data.products)
            })
    },[]);

    return (
        <main className='searchPage'>
            <h1> Sección de búsqueda </h1>
            <p> Has buscado: {params.search} !!!! </p>
            <h2> Resultados de la búsqueda </h2>
            <Link to='/'>Volver al inicio</Link>
            <ul>
                {productos.map(producto => (
                    <li key={producto.id}>
                        <h3>{producto.title}</h3>
                        <img src={producto.thumbnail} alt={producto.title} />
                        <p>{producto.brand}</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}