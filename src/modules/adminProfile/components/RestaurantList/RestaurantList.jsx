/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { formatDateYMDH_TO_DMY } from '../../utils/constants'
import SwitchState from '../switchState/SwitchState'
import './restaurantList.css'

export default function RestaurantList({ restaurants, loading, handleSwitchState }) {

    const navigate = useNavigate();

    const handleRowClick = (restaurantId) => {
        navigate(`/restaurant/${restaurantId}`);
    };


    if (loading) {
        return (
            <section className='restaurantList_container'>
                <div className='restaurantList_container_loading_content'>
                    <div className='restaurantList_container_loading'>⏳</div>
                </div>
            </section>
        )
    }

    if (!restaurants) {
        return (
            <section className='restaurantList_container'>
                <h3>Selecciona una ciudad para buscar</h3>
            </section>
        )
    }

    if (!restaurants.length) {
        return (
            <section className='restaurantList_container'>
                <h3>No hay restaurantes en esta ciudad</h3>
            </section>
        )
    }

    return (
        <section className='restaurantList_container'>
            <table className='restaurantList_table'>
                <thead>
                    <tr className='restaurantList_table_headtr'>
                        <th>Nombre</th>
                        <th>Ingreso</th>
                        <th>Estado</th>
                        <th className='restaurantList_restaurant_category'>Categoría</th>
                    </tr>
                </thead>
                <tbody className='restaurantList_table_body'>
                    {restaurants.map(restaurant => (
                        <tr key={restaurant.id} className='restaurantList_card'
                            onClick={() => handleRowClick(restaurant.id)}
                        >
                            <td>
                                <div className='restaurantList_card_imageName'>
                                    <img className='restaurantList_card_image' src={restaurant.img_icon} alt={restaurant.name} />
                                    <h3 className='restaurantList_card_text'>{restaurant.nombre}</h3>
                                </div>
                            </td>
                            <td>
                                <p className='restaurantList_card_text'>{formatDateYMDH_TO_DMY(restaurant.creado_en)}</p>
                            </td>
                            <td>
                                <div className='restaurantList_card_switchbtn'>
                                    <SwitchState state={restaurant.estado}
                                        handleSwitchState={(e) => handleSwitchState(e, restaurant.id)} />
                                </div>
                            </td>
                            <td className='restaurantList_restaurant_category'>
                                <p className='restaurantList_card_text'>{restaurant.category}</p>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}