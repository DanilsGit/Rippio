/* eslint-disable react/prop-types */
import Modal from 'react-modal'
import './addProductMenuModal.css'
import Select from 'react-select';
import { uploadFile } from '../../constants/image';
import { useState } from 'react';
import Tippy from '@tippyjs/react';



export default function AddProductMenuModal({ isModalOpen, handleCancelModalAddProductClick, handleConfirmModalAddProductClick, setCreatedProduct, categories, createdProduct }) {


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

    const handleButtonClick = () => {
        const uploadProductImage = document.getElementById('uploadProductImage');
        uploadProductImage.click();
    }

    const [image, setImage] = useState('')
    const [loading, setLoading] = useState(false)

    const uploadImage = async (file) => {
        setLoading(true);
        try {
            console.log(file);
            const newImage = await uploadFile(file, `ProductImage`, file.name);
            setImage(newImage);
            setCreatedProduct({
                ...createdProduct,
                imagen: newImage
            })
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    const handleInputProfileChange = async (e) => {
        await uploadImage(e.target.files[0]);
        e.files = null;
    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = 'copy';
        document.querySelector('.AddProductMenuModal-form-inputImage-Btn').style.opacity = '0.6';
    }

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        document.querySelector('.AddProductMenuModal-form-inputImage-Btn').style.opacity = '0';
    }

    const handleFileSelect = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            const reader = new FileReader();

            reader.onloadend = async () => {
                await uploadImage(file);
                setImage(reader.result);
            };

            reader.readAsDataURL(file);
            e.dataTransfer.clearData();
            document.querySelector('.AddProductMenuModal-form-inputImage-Btn').style.opacity = '0';
        }
    }


    return (
        <div>
            <Modal
                className='AddProductMenuModal Modal'
                isOpen={isModalOpen}
                onRequestClose={handleCancelModalAddProductClick}
                contentLabel="Agregar nuevo producto"
            >
                <div>
                    {
                        createdProduct?.nombre
                            ? <h1>{createdProduct.nombre}</h1>
                            : <h1>Nuevo producto</h1>
                    }
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
                                            setCreatedProduct({
                                                ...createdProduct,
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
                                            setCreatedProduct({
                                                ...createdProduct,
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
                            <input required type="text" id="nombre" name="nombre" onChange={(e) => setCreatedProduct({ ...createdProduct, nombre: e.target.value })} />
                        </div>
                        <div
                            className='AddProductMenuModal-form-input AddProductMenuModal-form-inputDescription'>
                            <label htmlFor="descripcion">Descripción</label>
                            <input required type="text" id="descripcion" name="descripcion" onChange={(e) => setCreatedProduct({ ...createdProduct, descripcion: e.target.value })} />
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
                            <input required type="number" id="costo_unit" name="costo_unit" onChange={(e) => setCreatedProduct({ ...createdProduct, costo_unit: e.target.value })} />
                        </div>
                        <div className='AddProductMenuModal-form-btnContainer'>
                            <button>Agregar</button>
                            <button type='button' onClick={handleCancelModalAddProductClick}>Cancelar</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}