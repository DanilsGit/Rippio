/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import './RestaurantMain.css'
import { ProductModal } from '../../../components/productModal/ProductModal'
import { useProductModal } from '../../../hooks/useProductModal'

export function RestaurantMain({ categories, restaurant }) {
    const selectProduct = useProductModal((state) => state.selectProduct)
    return (
        <section className='RestaurantPage-content-main'>
            <section className='RestaurantPage-content-main-content'>
                {   categories 
                ?
                    categories.map((category, index) => {
                        return (
                            <article className='RestaurantPage-content-main-content-article' key={index}>
                                <h3 className='RestaurantPage-content-main-content-articleTitle'>{category.nombre}</h3>
                                {
                                    category.productos
                                    ?
                                    category.productos.map((product, index) => {
                                        return (
                                            <section key={index}>
                                                <button className='RestaurantPage-content-main-content-articleCard'
                                                    onClick={() => {
                                                        selectProduct(product)
                                                    }}
                                                    >
                                                    <img draggable='false' src={product.img_product} alt={product.nombre} />
                                                    <div>
                                                        <h4>{product.nombre}</h4>
                                                        <p>{product.descripcion}</p>
                                                        <span>$ {product.costo_unit}</span>
                                                        
                                                    </div>
                                                </button>
                                                
                                                <ProductModal product={product} restaurant={restaurant}/>
                                            </section>
                                        )
                                    })
                                    : null
                                }
                            </article>
                        )
                    })
                    : <h1>Loading...</h1>
                    }
            </section>
        </section>
    )
}

// {/* { product, restaurant, selectedProduct, selectProduct } */}