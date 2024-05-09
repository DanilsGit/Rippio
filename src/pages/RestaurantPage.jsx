/* eslint-disable react/prop-types */
import { Link, useParams } from "react-router-dom";
import './restaurantPage.css'

export function RestaurantPage() {
    const params = useParams();
    return (
        <div>
            <h1>Restaurant</h1>
            <p>id: {params.idRestaurant}</p>
            <Link to='/'>Go to Home</Link>
        </div>
    )
}