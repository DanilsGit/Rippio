import './adminGraphs.css'
import { useAdminCharts } from '../../hooks/useAdminCharts';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import GraphWithTitle from '../GraphWithTitle/GraphWithTitle';

Chart.register(CategoryScale);

export default function AdminGraphs() {
    const
        {
            popularRestaurants,
            ordersByDays,
            averageSalesByDay,
            mostSoldProducts,
            mostSoldCategories,
        } = useAdminCharts();

    if (!popularRestaurants || !ordersByDays || !averageSalesByDay || !mostSoldProducts || !mostSoldCategories) {
        return (
            <section className='admin_graphs_section'>
                <h1>Gráficas generales de la aplicación</h1>
                <section className='admin_graphs_loading'>
                    ⌛
                </section>
            </section >
        )
    }

    return (
        <section className='admin_graphs_section'>
            <h1>Gráficas generales de la aplicación</h1>
            <div className='admin_graphs_container'>
                <GraphWithTitle title='Restaurantes populares hoy' data={popularRestaurants} />
                <GraphWithTitle title='Ordenes por días' data={ordersByDays} />
                <GraphWithTitle title='Gasto promedio por día' data={averageSalesByDay} />
                <GraphWithTitle title='Productos más vendidos hoy' data={mostSoldProducts} />
                <GraphWithTitle title='Categorías más vendidas hoy' data={mostSoldCategories} />
            </div>
        </section >
    )
}    