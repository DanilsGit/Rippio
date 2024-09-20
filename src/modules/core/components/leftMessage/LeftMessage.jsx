/* eslint-disable react/prop-types */
import './leftMessage.css';

export default function LeftMessage({ message, date, image }) {
    const hour = new Date(date).toLocaleTimeString().split(':').slice(0, 2).join(':');
    return (
        <div className='ChatModal-body_message_left'>
            <img className='ChatModal-body_message_left_image' src={image} alt='left' />
            <div className='ChatModal-body_message_left_text'>
                <p className='ChatModal-body_message_left_text_content'>{message}</p>
                <p className='ChatModal-body_message_left_text_hour'>{hour}</p>
            </div>
        </div>
    )
}