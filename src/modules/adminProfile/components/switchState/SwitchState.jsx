import './switchState.css'
/* eslint-disable react/prop-types */
export default function SwitchState({ state, handleSwitchState }) {
    return (
        <button className='restaurantList_card_button' onClick={handleSwitchState}>
            <div
            className={`restaurantList_card_button_circle ${state ? 'restaurantList_card_button_circle_active' : 'restaurantList_card_button_circle_inactive'}`}></div>
        </button>
    )
}