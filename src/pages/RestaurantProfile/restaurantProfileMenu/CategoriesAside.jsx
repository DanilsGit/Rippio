/* eslint-disable react/prop-types */
import { useState } from 'react';
import './categoriesAside.css'
import uuid from 'react-uuid';

export default function CategoriesAside({ categories, setCategories, setSelectedCategory, setIsModalOpen}) {

    const  handleClickExpandCategories = () => {
        const categories = document.querySelector('.RestaurantProfileMenu-manage-categoriesContainer')
        categories.classList.toggle('RestaurantProfileMenu-manage-category-active')
    }

    const [editingCategory, setEditingCategory] = useState(null);
    const [editedName, setEditedName] = useState('');

    const handleNameChange = (event) => {
        setEditedName(event.target.value);
    };

    const handleEditClick = (id, categoryName) => {
        setEditingCategory(id);
        setEditedName(categoryName);
        setAddingCategory(false)
    };

    const handleConfirmClick = () => {
        // Aquí debes implementar la lógica para actualizar la categoría en la base de datos
        // usando `editingCategory` y `editedName`.

        if (!editedName) return

        const newCategories = [...categories]

        newCategories.map(category => {
            if (category.id == editingCategory) {
                category.nombre = editedName
            }
        })

        setCategories(newCategories)

        // Luego, restablece `editingCategory` y `editedName` a sus valores iniciales.
        setEditingCategory(null);
        setEditedName('');
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

    const handleConfirmAddCategoryClick = () => {
        if (!newCategoryName) return

        const newCategory = {
            id: uuid(),
            nombre: newCategoryName,
            productos: []
        }

        setCategories([...categories, newCategory])
        setNewCategoryName('')
        setAddingCategory(false)
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
                                    <button onClick={handleConfirmAddCategoryClick}>✅</button>
                                    <button onClick={handleCancelAddCategoryClick}>❌</button>
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
                                        ? <button onClick={handleConfirmClick}>✅</button>
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