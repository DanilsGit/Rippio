/* eslint-disable react/prop-types */
import Modal from 'react-modal'
import './categoryDeleteModal.css'

export default function CategoryDeleteModal({ loadingDelete, isModalOpen, handleCancelModalCategoriesClick, selectedCategory, handleConfirmModalCategoriesClick }) {
    return (
        <div>
            <Modal
                className='CategoryDeleteModal Modal'
                isOpen={isModalOpen}
                onRequestClose={handleCancelModalCategoriesClick}
                contentLabel="Confirmación de eliminación"
            >
                <div>
                    {
                        selectedCategory
                            ? selectedCategory.productos.length > 0
                                ? <div className='CategoryDeleteModal-haveProducts'>
                                    <h1>Para eliminar la categoría <span>{selectedCategory.nombre}</span></h1>
                                    <h2>Primero debes <span>eliminar</span> o <span>cambiar</span> de lugar los productos asociados a esta categoría</h2>
                                    <button onClick={handleCancelModalCategoriesClick}>Aceptar</button>
                                </div>
                                : <div className='CategoryDeleteModal-noHaveProducts'>
                                    <h1>¿Estás seguro de que deseas eliminar la categoría <span>{selectedCategory?.nombre}</span>?</h1>
                                    <div>
                                        {
                                            loadingDelete
                                                ? <button>Eliminando... </button>
                                                : <>
                                                    <button onClick={handleConfirmModalCategoriesClick}>Confirmar</button>
                                                    <button onClick={handleCancelModalCategoriesClick}>Cancelar</button>
                                                </>
                                        }
                                    </div>
                                </div>
                            : null
                    }
                </div>
            </Modal>
        </div>
    )
}