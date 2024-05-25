/* eslint-disable react/prop-types */
import {  useEffect, useState } from 'react';
import './categoriesAside.css'
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';

export default function CategoriesAside({ categories, setCategories, setSelectedCategory, setIsModalOpen}) {

    const token = useAuth((state) => state.token)

    const [error, setError] = useState(null);
    useEffect(() => {
        if (error) {
            setTimeout(() => {
                setError(null)
            }, 3000)
        }
    }, [error])
    
    const  handleClickExpandCategories = () => {
        const categories = document.querySelector('.RestaurantProfileMenu-manage-categoriesContainer')
        categories.classList.toggle('RestaurantProfileMenu-manage-category-active')
    }

    const [editingCategory, setEditingCategory] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [loading, setLoading] = useState(false);

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleEditClick = (id, categoryName) => {
        setEditingCategory(id);
        setEditedName(categoryName);
        setAddingCategory(false)
    };

    const handleConfirmClick = async () => {
        if (!editedName) return

        setLoading(true);

        await axios.post('https://rippio-api.vercel.app/api/section/update',
        {
            id_seccion: editingCategory,
            nombre_seccion: editedName
        },
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(() => {
            const newCategories = [...categories]
            newCategories.map(category => {
                if (category.id == editingCategory) {
                    category.nombre = editedName
                }
            })
            setCategories(newCategories)
            setEditingCategory(null);
            setEditedName('');
            setLoading(false);
        }).catch(error => {
            console.log(error.response.data.error);
            setError(error.response.data.error)
            setLoading(false);
        })
    };


    const [addingCategory, setAddingCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleAddCategoryClick = () => {
        setAddingCategory(!addingCategory);
        setEditingCategory(null);
        setEditedName('');
    }

    const handleNewCategoryNameChange = (event) => {
        setNewCategoryName(event.target.value);
    }

    
    const handleConfirmAddCategoryClick = async () => {
        if (!newCategoryName) return
        setLoading(true);

        

        await axios.post('https://rippio-api.vercel.app/api/section/add',
        {
            nombre_seccion: newCategoryName
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            const idCategory = res.data.id;
            const newCategory = {
                id: idCategory,
                nombre: newCategoryName,
                productos: []
            }
            setCategories([...categories, newCategory])
            setNewCategoryName('')
            setAddingCategory(false)
            setLoading(false);
        }).catch(error => {
            setError(error.response.data.error)
            setLoading(false);
        });
    }


    const handleCancelAddCategoryClick = () => {
        setNewCategoryName('')
        setAddingCategory(false)
    }



    return (
        <section className='RestaurantProfileMenu-manage-category'>
            <header>
                <h2>Categorías</h2>
                <button onClick={handleClickExpandCategories}>{' ⬇ '}</button>
            </header>
            <section className='RestaurantProfileMenu-manage-categoriesContainer'>
            {
                error ? <p className='RestaurantProfileMenu-manage-categoriesContainer-errorMsg'>{error}</p> : null
            }
            {
                    addingCategory
                        ? (
                            <div className='RestaurantProfileMenu-manage-categoriesContainer-addingCategory'>
                                <input
                                    type="text"
                                    value={newCategoryName}
                                    onChange={handleNewCategoryNameChange}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') handleConfirmAddCategoryClick()
                                        if (e.key === 'Escape') handleCancelAddCategoryClick()
                                    }}
                                />
                                <div>
                                    <button onClick={handleConfirmAddCategoryClick}
                                        className={loading ? 'RestaurantProfileMenu-manage-categoriesContainer-loadingBtn' : ''}
                                    >
                                        {loading ? '⌛' : '✅'}
                                    </button>
                                    {loading ? null : <button onClick={handleCancelAddCategoryClick}>❌</button>}
                                    
                                </div>
                            </div>
                        )
                        : <button className='RestaurantProfileMenu-manage-categoriesContainerAddBtn' onClick={handleAddCategoryClick}>+ Crear categoría</button>
                }
                {
                    categories.map((category) => (
                        <div key={category.id}>
                            {
                                editingCategory === category.id
                                    ? (
                                        <input
                                            type="text"
                                            value={editedName}
                                            onChange={handleNameChange}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleConfirmClick()
                                                if (e.key === 'Escape') setEditingCategory(null)
                                            }}
                                        />
                                    )
                                    : <h3>{category.nombre}</h3>
                            }
                            <div>
                                {
                                    editingCategory === category.id
                                        ? <button onClick={handleConfirmClick}
                                        className={loading ? 'RestaurantProfileMenu-manage-categoriesContainer-loadingBtn' : ''}
                                        >
                                            {loading ? '⌛' : '✅'}
                                        </button>
                                        :
                                        <>
                                            <button onClick={() => handleEditClick(category.id, category.nombre)}>🖌</button>
                                            <button onClick={() => {
                                                setSelectedCategory(category);
                                                setIsModalOpen(true);
                                            }}>🗑</button>
                                        </>
                                }
                            </div>
                        </div>
                    ))
                }
            </section>
        </section>
    )
}