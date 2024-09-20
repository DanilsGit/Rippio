/* eslint-disable react/prop-types */
import './restaurantMessage.css';

export default function RestaurantMessage({ message, date, image }) {
    const hour = new Date(date).toLocaleTimeString();
    return (
        <div className='ChatModal-body_message_restaurant'>
            <img className='ChatModal-body_message_restaurant_image' src={image} alt='Restaurant' />
            <div className='ChatModal-body_message_restaurant_text'>
                <p className='ChatModal-body_message_restaurant_text_content'>{message}</p>
                <p className='ChatModal-body_message_restaurant_text_hour'>{hour}</p>
            </div>
        </div>
    )
}