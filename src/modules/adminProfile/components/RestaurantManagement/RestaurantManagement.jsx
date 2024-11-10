
import './restaurantManagement.css'
import Select from 'react-select'
import { useColombiaDepartments } from '@m/core/hooks/useColombiaDepartments'
import RestaurantList from '../RestaurantList/RestaurantList'
import { useRestaurantManagementCities } from '../../hooks/useRestaurantManagementCities';

export function RestaurantManagement() {

    // Obtener los departamentos
    const { departamentos } = useColombiaDepartments();
    // Obtener las ciudades
    const { cities,
        handleSelectDepartamentos,
        handleSelectCity,
        restaurants,
        handleNextPage,
        handlePrevPage,
        handleSwitchState,
        page,
        pages,
        loading } = useRestaurantManagementCities();

    return (
        <section className='restaurantManagement_container'>

            <h1 className='restaurantManagement_container_title'>Gestor de negocios</h1>

            <div className='restaurantManagement_container_select'>
                <h2 className='restaurantManagement_container_subtitle'>Restaurantes locales</h2>
                <div className='restaurantManagement_container_select_selects'>
                    <Select className='restaurantManagement_container_select_select'
                        options={departamentos}
                        placeholder='Departamento'
                        onChange={handleSelectDepartamentos}
                    />
                    <Select className='restaurantManagement_container_select_select'
                        options={cities}
                        placeholder='Ciudad'
                        onChange={handleSelectCity}
                    />
                </div>
            </div>
            <div className='restaurantManagement_container_list'>
                <RestaurantList restaurants={restaurants} loading={loading} handleSwitchState={handleSwitchState} />
                {restaurants && pages > 1 &&
                    <div className='restaurantManagement_container_pagination'>
                        <button onClick={handlePrevPage}>Anterior</button>
                        <p>{page} de {pages}</p>
                        <button onClick={handleNextPage}>Siguiente</button>
                    </div>}
            </div>
        </section>
    )
}