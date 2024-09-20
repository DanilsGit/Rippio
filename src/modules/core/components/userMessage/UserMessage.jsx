/* eslint-disable react/prop-types */
import './userMessage.css';

export default function UserMessage({ message, date, image }) {
    const hour = new Date(date).toLocaleTimeString();
    return (
        <div className='ChatModal-body_message_user'>
            <div className='ChatModal-body_message_user_text'>
                <p className='ChatModal-body_message_user_text_content'>{message}</p>
                <p className='ChatModal-body_message_user_text_hour'>{hour}</p>
            </div>
            <img className='ChatModal-body_message_user_image' src={image} alt='User' />
        </div>
    )
}