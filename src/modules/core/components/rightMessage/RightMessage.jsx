/* eslint-disable react/prop-types */
import './rightMessage.css';

export default function RightMessage({ message, date, image }) {
    const hour = new Date(date).toLocaleTimeString().split(':').slice(0, 2).join(':');
    return (
        <div className='ChatModal-body_message_right'>
            <div className='ChatModal-body_message_right_text'>
                <p className='ChatModal-body_message_right_text_content'>{message}</p>
                <p className='ChatModal-body_message_right_text_hour'>{hour}</p>
            </div>
            <img className='ChatModal-body_message_right_image' src={image} alt='User' />
        </div>
    )
}