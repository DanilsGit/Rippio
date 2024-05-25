/* eslint-disable react/prop-types */
import Modal from 'react-modal'
import './editProductModal.css'
import Tippy from '@tippyjs/react'
import  Select  from 'react-select'
import { useState } from 'react'

// categories={categories} isModalOpen={isModalEditProductOpen} handleCancelModalAddProductClick={setIsModalEditProductOpen} handleConfirmModalAddProductClick={handleConfirmModalEditProductClick} product={selectedProduct} setEditedProduct={setEditedProduct} editedProduct={editedProduct} />

export default function EditProductModal({ categories, isModalOpen, setIsModalEditProductOpen, handleConfirmModalAddProductClick, product, setEditedProduct, editedProduct }) {

    if (!product) return null

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const categoryOptions = categories.map(category => {
        return {
            value: category.id,
            label: category.nombre
        }
    })

    
    const estados = [
        { value: 'disponible', label: 'Disponible' },
        { value: 'no disponible', label: 'No disponible' }
    ]

    const handleDragLeave = () => {

    }

    const handleDragOver = (e) => {

    }

    const handleFileSelect = (e) => {

    }

    const handleButtonClick = () => {

    }

    const handleInputProfileChange = async (e) => {

    }

    return (
        <div>
            <Modal
                className='AddProductMenuModal Modal'
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalEditProductOpen(false)}
                contentLabel="Agregar nuevo producto"
            >
                <div>
                    <h1>{product.nombre}</h1>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault()
                            handleConfirmModalAddProductClick()
                        }}
                        className='AddProductMenuModal-form'
                    >
                        <div className='AddProductMenuModal-form-selects'>
                            <div
                                className='AddProductMenuModal-form-inputCategory'
                            >
                                <label htmlFor="categories">Categoría</label>
                                <Select
                                    className='AddProductMenuModal-form-inputCategory-select'
                                    required
                                    id="categories"
                                    name="categories"
                                    isMulti
                                    options={categoryOptions}
                                    onChange={
                                        (selectedCategories) => {
                                            setEditedProduct({
                                                ...editedProduct,
                                                categories: selectedCategories.map(category => category.value)
                                            })
                                        }}
                                    placeholder="Categorías disponibles"
                                />
                            </div>
                            <div
                                className='AddProductMenuModal-form-inputState'
                            >
                                <label htmlFor="estado">Estado</label>
                                <Select
                                    className='AddProductMenuModal-form-inputCategory-select'
                                    required
                                    id="estado"
                                    name="estado"
                                    options={estados}
                                    onChange={
                                        (estado) => {
                                            setEditedProduct({
                                                ...editedProduct,
                                                estado: estado.value
                                            })
                                        }}
                                    placeholder="Estado"
                                />
                            </div>

                        </div>
                        <div
                            className='AddProductMenuModal-form-input AddProductMenuModal-form-inputName'>
                            <label htmlFor="nombre">Nombre</label>
                            <input required type="text" id="nombre" name="nombre" onChange={(e) => setEditedProduct({ ...editedProduct, nombre: e.target.value })} />
                        </div>
                        <div
                            className='AddProductMenuModal-form-input AddProductMenuModal-form-inputDescription'>
                            <label htmlFor="descripcion">Descripción</label>
                            <input required type="text" id="descripcion" name="descripcion" onChange={(e) => setEditedProduct({ ...editedProduct, descripcion: e.target.value })} />
                        </div>
                        <div
                            onDragLeave={handleDragLeave}
                            onDragOver={handleDragOver}
                            onDrop={handleFileSelect}
                            className='AddProductMenuModal-form-input AddProductMenuModal-form-inputImage'
                        >
                            <label className="hidden-label">Subir imagen</label>

                            {
                                loading
                                    ? <img src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2Floading.png?alt=media&token=b1a554d7-4784-4f3c-892b-662ff72a3804' alt='loading' className='AddProductMenuModal-form-inputImage-img AddProductMenuModal-form-inputImage-imgLoading' />
                                    : image.length > 0
                                        ? <img className="AddProductMenuModal-form-inputImage-img" src={image} alt="Imagen del producto" />
                                        : <img className="AddProductMenuModal-form-inputImage-img AddProductMenuModal-form-inputImage-imgDefault" src="https://cdn-icons-png.flaticon.com/512/32/32339.png" alt="Imagen del producto" />
                            }
                            <input required type="file" id="uploadProductImage" name="uploadImage" accept=".png, .jpg"
                                onChange={handleInputProfileChange} />
                            <Tippy content='Intentaremos dar la mejor presentación al público'>
                                <button className="AddProductMenuModal-form-inputImage-Btn" onClick={handleButtonClick}>
                                    <img draggable='false' className="AddProductMenuModal-form-inputImage-imgBtn" src="https://icons.veryicon.com/png/o/miscellaneous/linear-small-icon/edit-246.png" alt="Upload Icon" />
                                </button>
                            </Tippy>
                        </div>
                        <div
                            className='AddProductMenuModal-form-input AddProductMenuModal-form-inputPrice'
                        >
                            <label htmlFor="costo_unit">Costo unitario</label>
                            <input required type="number" id="costo_unit" name="costo_unit" onChange={(e) => setEditedProduct({ ...editedProduct, costo_unit: e.target.value })} />
                        </div>
                        <div className='AddProductMenuModal-form-btnContainer'>
                            <button>Agregar</button>
                            <button type='button' onClick={() => setIsModalEditProductOpen(false)}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}