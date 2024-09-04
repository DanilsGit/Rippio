/* eslint-disable react/prop-types */
import  Modal  from 'react-modal'
import './cartLocalDBModal.css'

export function CartLocalDBModal({ show, setShow, handleConfirm, handleCancel }) {
    return (
        <div>
            <Modal className='CartLocalDBModal Modal'
            isOpen={show} onRequestClose={() => setShow(false)}>
                <h2>¿Deseas mover tu carrito a la sesión?</h2>
                <p>Si tienes un carrito dentro de tu sesión, este se eliminará</p>
                <div>
                    <button onClick={
                        () => {
                            handleCancel();
                            setShow(false);
                        }
                    }>Conservar ambos</button>
                    <button onClick={
                        () => {
                            handleConfirm();
                            setShow(false);
                        }
                    }>Mover carrito</button>
                </div>
            </Modal>
            
        </div>
    )
}