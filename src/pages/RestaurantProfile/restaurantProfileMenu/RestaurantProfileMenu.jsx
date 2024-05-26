import { useEffect, useState } from 'react'
import './restaurantProfileMenu.css'
import uuid from 'react-uuid'
import CategoryDeleteModal from '../../../components/Modals/categoryDeleteModal/CategoryDeleteModal';
import CreateProductMenuModal from '../../../components/Modals/CreateProductMenuModal/CreateProductMenuModal';
import CategoriesAside from './CategoriesAside';
import RestaurantMenu from './RestaurantMenu';
import axios from 'axios';
import { useAuth } from '../../../hooks/useAuth';

export function RestaurantProfileMenu() {
    const user = useAuth((state) => state.user)
    const token = useAuth((state) => state.token)

    const [categories, setCategories] = useState(null)
    const [createdProduct, setCreatedProduct] = useState(null);
    const [isModalCategoriesOpen, setIsModalCategoriesOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loadingDeleteCategory, setLoadingDeleteCategory] = useState(false);
    const [isModalAddProductOpen, setIsModalAddProductOpen] = useState(false);
    const [error, setError] = useState(null);
    const [isModalEditProductOpen, setIsModalEditProductOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [editedProduct, setEditedProduct] = useState(null);
    const [loadingProduct, setLoadingProduct] = useState(false);

    const addUniqueKeyToProducts = (categories) => {
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
        return newCategories
    }

    // GET CATEGORIES AND PRODUCTS

    useEffect(() => {
        axios.get(`https://rippio-api.vercel.app/api/restaurant/getCatAndProdByResId/${user.id}`)
            .then(res => {
                const categoriesUuid = addUniqueKeyToProducts(res.data)
                setCategories(categoriesUuid)
            })
            .catch(error => {
                console.error(error)
                setError(error)
            })
    }, [])

    // CRUD CATEGORIES

    const handleConfirmRemoveModalCategoriesClick = async () => {
        setLoadingDeleteCategory(true);
        await axios.post(`https://rippio-api.vercel.app/api/section/remove`,
            {
                id_seccion: selectedCategory.id
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        )

        const newCategories = categories.filter(category => category.id !== selectedCategory.id);
        setCategories(newCategories);
        setIsModalCategoriesOpen(false);
        setSelectedCategory(null);
        setLoadingDeleteCategory(false);
    };

    const handleCancelModalCategoriesClick = () => {
        setIsModalCategoriesOpen(false);
    };

    // CRUD PRODUCTS

    const handleConfirmModalAddProductClick = async () => {
        setLoadingProduct(true);
        try {
            await axios.post(`https://rippio-api.vercel.app/api/product/add`,
                {
                    secciones: createdProduct.categories,
                    nombre: createdProduct.nombre,
                    descripcion: createdProduct.descripcion,
                    cost_unit: createdProduct.costo_unit,
                    img_product: createdProduct.imagen,
                    disponible: createdProduct.disponible
                },
                {
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                }
            ).then(res => {
                const newProduct = {
                    ...createdProduct,
                    id: res.data.response.id,
                    uniqueKey: uuid()
                }
                const newCategories = categories.map(category => {
                    if (newProduct.categories.includes(category.id)) {
                        return {
                            ...category,
                            productos: [...category.productos, {
                                id: newProduct.id,
                                disponible: newProduct.disponible,
                                nombre: newProduct.nombre,
                                descripcion: newProduct.descripcion,
                                img_product: newProduct.imagen,
                                costo_unit: newProduct.costo_unit
                            }]
                        }
                    }
                    return category
                })
                setCategories(newCategories)
                setCreatedProduct(null)
                setIsModalAddProductOpen(false);
            })
        } catch (error) {
            console.error(error)
        }
        setLoadingProduct(false);
    }

    const handleCancelModalAddProductClick = () => {
        setCreatedProduct(null)
        setIsModalAddProductOpen(false);
    }

    const handleConfirmModalEditProductClick = async () => {
        setLoadingProduct(true);
        await axios.post(`https://rippio-api.vercel.app/api/product/updateProd`,
        {
            id_producto: editedProduct.id,
            disponible: editedProduct.disponible,
            nombre: editedProduct.nombre,
            descripcion: editedProduct.descripcion,
            cost_unit: editedProduct.costo_unit,
            img_product: editedProduct.img_product,
            secciones: editedProduct.categories
        },
        {
            headers: {
                authorization: `Bearer ${token}`
            }
        }).then(() => {
            const categoryWithoutProduct = categories.map(category => {
                return {
                    ...category,
                    productos: category.productos.filter(product => product.id !== selectedProduct.id)
                }
            })
            const newCategories = categoryWithoutProduct.map(category => {
                if (editedProduct.categories.includes(category.id)) {
                    return {
                        ...category,
                        productos: [...category.productos, {
                            uniqueKey: uuid(),
                            id: editedProduct.id,
                            disponible: editedProduct.disponible,
                            nombre: editedProduct.nombre,
                            descripcion: editedProduct.descripcion,
                            img_product: editedProduct.img_product,
                            costo_unit: editedProduct.costo_unit
                        }]
                    }
                }
                return category
            })
    
            setCategories(newCategories)
            setIsModalEditProductOpen(false);
        }).catch(error => {
            console.error(error)
            setLoadingProduct(false);
        })
        setLoadingProduct(false);
    }

    useEffect(() => {
        if (categories && selectedProduct) {
            const categoriesFromProduct = categories.filter(category => category.productos.find(product => product.id == selectedProduct.id))

            const productWithCategories = {
                ...selectedProduct,
                categories: categoriesFromProduct.map(category => category.id)
            }

            setEditedProduct(productWithCategories)
        }
    }, [selectedProduct, categories])

    const handleCancelModalEditProductClick = () => {
        setSelectedProduct(null)
        setIsModalEditProductOpen(false);
    }

    return (
        <>
            {
                categories
                    ?
                    <>
                        <section className='RestaurantProfileMenu'>
                            {
                                categories.length > 0
                                    ?
                                    <section className="RestaurantProfileMenu-section">
                                        <header className='RestaurantProfileMenu-header'>
                                            <h1>Menú de restaurante</h1>
                                            <button onClick={() => {
                                                setIsModalAddProductOpen(true)
                                                setCreatedProduct({
                                                    nombre: '',
                                                    descripcion: '',
                                                    costo_unit: '',
                                                    imagen: '',
                                                    disponible: true
                                                })
                                            }}
                                            >Agregar producto</button>
                                        </header>
                                        <section className='RestaurantProfileMenu-manage'>

                                            <CategoriesAside categories={categories} setCategories={setCategories} setSelectedCategory={setSelectedCategory} setIsModalOpen={setIsModalCategoriesOpen} />
                                            <RestaurantMenu setEditProduct={setEditedProduct} setIsModalEditProductOpen={setIsModalEditProductOpen} setSelectedProduct={setSelectedProduct} categories={categories} setCategories={setCategories} />

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
                        <CategoryDeleteModal loadingDelete={loadingDeleteCategory} isModalOpen={isModalCategoriesOpen} handleCancelModalCategoriesClick={handleCancelModalCategoriesClick} selectedCategory={selectedCategory} handleConfirmModalCategoriesClick={handleConfirmRemoveModalCategoriesClick} />
                        <CreateProductMenuModal loadingProduct={loadingProduct} categories={categories} isModalOpen={isModalAddProductOpen} handleCancel={handleCancelModalAddProductClick} handleConfirm={handleConfirmModalAddProductClick} setProduct={setCreatedProduct} newProduct={createdProduct} />
                        <CreateProductMenuModal loadingProduct={loadingProduct} categories={categories} isModalOpen={isModalEditProductOpen} handleCancel={handleCancelModalEditProductClick} handleConfirm={handleConfirmModalEditProductClick} setProduct={setEditedProduct} newProduct={editedProduct} productSelectedToEdit={selectedProduct} />
                    </>
                    : error ? <h1>Hubo un error al cargar los productos</h1> : <h1>Cargando...</h1>
            }
        </>
    )
}
