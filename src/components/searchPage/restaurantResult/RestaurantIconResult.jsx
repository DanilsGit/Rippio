/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import './restaurantIconResult.css'

export function RestaurantIconResult({ results }) {
    return (
        <div>
            <section className='searchPage-iconsContainer'>
                {results.map((restaurant) => {
                    return (
                        <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id}>
                            <img key={restaurant.id} className='searchPage-iconsContainer-img' src={restaurant.img_icon} alt={restaurant.nombre} />
                        </Link>
                    )
                })}
            </section>
        </div>
    )
}