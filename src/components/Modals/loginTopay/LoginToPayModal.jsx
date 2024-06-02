/* eslint-disable react/prop-types */
import './loginToPayModal.css'
import Modal from 'react-modal';

export default function LoginToPayModal({ isOpen, HandleCancel, HandleLogin }) {


    return (
        <div>
            <Modal className='LoginToPayModal Modal' isOpen={isOpen} onRequestClose={HandleCancel}>
                <h1>¡Sólo falta un paso!</h1>
                <p>Para continuar con tu compra inicia sesión o crea una cuenta</p>
                <div>
                    <button className='LoginToPayModal-btn' onClick={HandleCancel}>Cancelar</button>
                    <button className='LoginToPayModal-btn' onClick={HandleLogin}>Iniciar sesión</button>
                </div>
            </Modal>
        </div>
    )
}