import { useEffect, useState } from 'react'
import './restaurantProfileMenu.css'
import restaurantCategories from '../../../utilities/restaurantCategories.json'
import uuid from 'react-uuid'
import CategoryDeleteModal from '../../../components/categoryDeleteModal/CategoryDeleteModal';
import CategoryAddProductModal from '../../../components/addProductMenuModal/AddProductMenuModal';
import CategoriesAside from './CategoriesAside';
import RestaurantMenu from './RestaurantMenu';


export function RestaurantProfileMenu() {

    const [categories, setCategories] = useState(restaurantCategories)

    const addUniqueKeyToProducts = () => {
        const newCategories = categories.map(category => {
            const newProducts = category.productos.map(product => {
                product.uniqueKey = uuid()
                return product
            })
            return {
                ...category,
                productos: newProducts
            }
        })
        setCategories(newCategories)

    }

    const [createdProduct, setCreatedProduct] = useState(null);

    useEffect(() => {
        document.title = 'Menu'
        addUniqueKeyToProducts()
    }, [createdProduct])

    // no es necesario cuando se haga la petición a la API
    // TODO: hacer la petición a la API
    // Agregar las key únicas en la API

    const [isModalCategoriesOpen, setIsModalCategoriesOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleConfirmModalCategoriesClick = () => {
        const newCategories = categories.filter(category => category.id !== selectedCategory.id);
        setCategories(newCategories);
        setIsModalCategoriesOpen(false);
    };

    const handleCancelModalCategoriesClick = () => {
        setIsModalCategoriesOpen(false);
    };

    const [isModalAddProductOpen, setIsModalAddProductOpen] = useState(false);


    const handleConfirmModalAddProductClick = () => {
        const newProduct = {
            ...createdProduct,
            id: uuid()
        }

        const newCategories = categories.map(category => {
            if (createdProduct.categories.includes(category.id)) {
                return {
                    ...category,
                    productos: [...category.productos, {
                        id: newProduct.id,
                        estado: newProduct.estado,
                        nombre: newProduct.nombre,
                        descripcion: newProduct.descripcion,
                        imagen: newProduct.imagen,
                        costo_unit: newProduct.costo_unit
                    }]
                }
            }
            return category
        })

        setCategories(newCategories)
        setCreatedProduct(null)
        setIsModalAddProductOpen(false);
    }

    const handleCancelModalAddProductClick = () => {
        setIsModalAddProductOpen(false);
    }

    return (
        <>
            <section className='RestaurantProfileMenu'>
                {
                    categories.length > 0
                        ?
                        <section className="RestaurantProfileMenu-section">
                            <header className='RestaurantProfileMenu-header'>
                                <h1>Menú de restaurante</h1>
                                <button onClick={() => setIsModalAddProductOpen(true)}
                                >Agregar producto</button>
                            </header>
                            <section className='RestaurantProfileMenu-manage'>

                                <CategoriesAside categories={categories} setCategories={setCategories} setSelectedCategory={setSelectedCategory} setIsModalOpen={setIsModalCategoriesOpen} />
                                <RestaurantMenu categories={categories} setCategories={setCategories} />

                            </section>
                        </section>
                        :
                        <section className="RestaurantProfileMenu-noProducts">
                            <img draggable='false' className='RestaurantProfileMenu-noProducts-img' src="https://static.vecteezy.com/system/resources/previews/036/512/636/non_2x/ai-generated-bowl-of-tasty-hot-pot-with-shrimps-on-transparent-background-png.png" alt="menu" />
                            <h1 >Menú</h1>
                            <h2 >Empieza a crear tu menú con todo tipo de productos y categorías</h2>
                            <button className="RestaurantProfileMenu-noProducts-button">Iniciar</button>
                        </section>
                }
            </section>
            <CategoryDeleteModal isModalOpen={isModalCategoriesOpen} handleCancelModalCategoriesClick={handleCancelModalCategoriesClick} selectedCategory={selectedCategory} handleConfirmModalCategoriesClick={handleConfirmModalCategoriesClick} />
            <CategoryAddProductModal categories={categories} isModalOpen={isModalAddProductOpen} handleCancelModalAddProductClick={handleCancelModalAddProductClick} handleConfirmModalAddProductClick={handleConfirmModalAddProductClick} setCreatedProduct={setCreatedProduct} createdProduct={createdProduct} />
        </>
    )
}
