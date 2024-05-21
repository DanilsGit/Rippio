/* eslint-disable react/prop-types */
import uuid from 'react-uuid'
import './restaurantMenu.css'

export default function RestaurantMenu({categories, setCategories}) {

    const handleDragStart = (e, item) => {
        e.dataTransfer.setData('itemIds', [item.uniqueKey, item.id])
    }

    const handleDrop = (e, categoryDrop) => {
        e.preventDefault()
        const itemTransfer = e.dataTransfer.getData('itemIds')
        const itemIds = itemTransfer.split(',')
        const categoryItem = categories.find(category =>
            category.productos.find(product => product.uniqueKey == itemIds[0])
        );

        if (categoryDrop === categoryItem) return

        const item = categoryItem.productos.find(product => product.uniqueKey == itemIds[0])


        const itemInCategoryDrop = categoryDrop.productos.find(product => product.id == itemIds[1])


        if (itemInCategoryDrop) if (item.id == itemInCategoryDrop.id) { alert('El producto ya está en la categoría "' + categoryDrop.nombre + '"'); return }


        const newCategoryItemDeleted = {
            ...categoryItem,
            productos: categoryItem.productos.filter(product => product.uniqueKey != itemIds[0])
        }

        const newCategories = categories.map(category =>
            category === categoryItem ? newCategoryItemDeleted : category
        );

        const newCategoryItemAdded = {
            ...categoryDrop,
            productos: [...categoryDrop.productos, item]
        }

        const newCategoriesUpdated = newCategories.map(category =>
            category === categoryDrop ? newCategoryItemAdded : category
        );

        setCategories(newCategoriesUpdated)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
    }



    return (
        <section className='RestaurantProfileMenu-manage-products'>
            <h2>Gestión de productos</h2>
            <section className='RestaurantProfileMenu-manage-productsCategoriesContainer'>
                {
                    categories.map((category) => (
                        <section key={category.id} className='RestaurantProfileMenu-manage-row'>
                            <h3>{category.nombre}</h3>
                            <div
                                className='RestaurantProfileMenu-manage-ddZone'
                                onDragOver={(e) => handleDragOver(e)}
                                onDrop={(e) => handleDrop(e, category)}
                            >
                                {
                                    category.productos.map((product) => {
                                        const uniqueKey = uuid()
                                        return (
                                            <article draggable='true' onDragStart={(e) => handleDragStart(e, product)}
                                                key={uniqueKey} className='RestaurantProfileMenu-manage-ddZone-product'>
                                                <img draggable='false' src={product.imagen} alt="product" />
                                                <h4>{product.nombre}</h4>
                                                <p>{product.descripcion}</p>
                                                <span>{product.costo_unit}</span>
                                                <button>🖌</button>
                                            </article>
                                        )
                                    })
                                }
                            </div>
                        </section>
                    ))
                }
            </section>
        </section>
    )
}