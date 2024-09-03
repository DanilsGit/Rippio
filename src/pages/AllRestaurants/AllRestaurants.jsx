/* eslint-disable react/prop-types */
import { Footer } from '@m/core/components/footer/Footer'
import { HeaderNav } from '@m/core/components/headerDrawer/HeaderDrawer'
import Select from 'react-select'
import './allrestaurants.css'
import { Rating } from '@mui/material'
import { useState } from 'react'
import { useEffect } from 'react'
import { getLocation } from '../../constants/location'
import { getRestaurants, getCategories } from '../../api/restaurant'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

export function AllRestaurants() {

    // Usar los params
    const params = useParams()
    const searchCategory = params.category

    // Opciones para el select de categorías
    // const options = [
    //     { value: 'all', label: 'Todos' },
    //     { value: 'fastfood', label: 'Comida rápida' },
    //     { value: 'healthy', label: 'Comida saludable' },
    //     { value: 'japanese', label: 'Japonesa' },
    //     { value: 'mexican', label: 'Mexicana' },
    //     { value: 'italian', label: 'Italiana' },
    //     { value: 'peruvian', label: 'Peruana' },
    //     { value: 'chinese', label: 'China' },
    //     { value: 'french', label: 'Francesa' },
    //     { value: 'spanish', label: 'Española' },
    //     { value: 'american', label: 'Americana' },
    //     { value: 'vegan', label: 'Vegana' },
    //     { value: 'vegetarian', label: 'Vegetariana' },
    //     { value: 'glutenfree', label: 'Libre de gluten' },
    //     { value: 'desserts', label: 'Postres' },
    //     { value: 'drinks', label: 'Bebidas' },
    //     { value: 'coffee', label: 'Café' },
    //     { value: 'breakfast', label: 'Desayunos' },
    //     { value: 'brunch', label: 'Brunch' },
    //     { value: 'lunch', label: 'Almuerzos' },
    //     { value: 'dinner', label: 'Cenas' },
    //     { value: 'snacks', label: 'Snacks' },
    //     { value: 'seafood', label: 'Mariscos' },
    //     { value: 'meat', label: 'Carnes' },
    //     { value: 'pasta', label: 'Pastas' },
    //     { value: 'pizza', label: 'Pizzas' },
    //     { value: 'sushi', label: 'Sushi' },
    //     { value: 'tacos', label: 'Tacos' },
    //     { value: 'burgers', label: 'Hamburguesas' },
    //     { value: 'salads', label: 'Ensaladas' },
    //     { value: 'soup', label: 'Sopas' },
    //     { value: 'rice', label: 'Arroces' },
    //     { value: 'noodles', label: 'Fideos' },
    // ]

    // Estado para el valor de la calificación
    const [ratingValue, setRatingValue] = useState(5)
    // Estado para guardar las categorías
    const [category, setCategory] = useState([])
    // Estado para seleccionar la categoría
    const [selectedCategory, setSelectedCategory] = useState(null)
    // Estado para guardar los restaurantes
    const [restaurants, setRestaurants] = useState(null)
    // Estado para cargar los restaurantes
    const [loading, setLoading] = useState(true)
    // Estado para redireccionar
    const navigator = useNavigate()

    //Traer la ubicación del usuario y los permisos
    const [location, setLocation] = useState(null)
    const [permission, setPermission] = useState(false)


    // Función para traer los restaurantes
    const getMyRestaurants = (city, category, rating) => {
        setLoading(true)
        getRestaurants(city, category, rating)
            .then(res => {
                setRestaurants(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }

    // Función para seleccionar la categoría
    const handleSelectCategory = (e) => {
        if (e.value === selectedCategory) {
            return
        }
        setSelectedCategory(e.value)
        getMyRestaurants(location.city, e.value, ratingValue)
    }

    // Función para seleccionar el rating
    const handleRating = (e) => {
        if (e === ratingValue) {
            return
        }
        setRatingValue(e)
        getMyRestaurants(location.city, selectedCategory, e)
    }

    // UseEffect para llevar el scroll al inicio y limpiar el params
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    // UseEffect por si hubo un cambio en la ubicación
    useEffect(() => {
        getLocation().then(({ location, permission }) => {
            setLocation(location)
            setPermission(permission)
            console.log(location, permission);
        }).catch((error) => {
            console.log(error);
        });
    }, [])

    //UseEffect para cargar los restaurantes
    useEffect(() => {
        if (location) {
            getMyRestaurants(location.city, selectedCategory, ratingValue)
        }
    }, [location, ratingValue, selectedCategory])

    // UseEffect para cargar las categorías
    useEffect(() => {
        getCategories()
            .then(res => {
                res.data.unshift({ value: null, nombre: 'Todos' })
                const newCategories = res.data.map(category => {
                    return {
                        value: category.nombre === 'Todos' ? null : category.nombre,
                        label: category.nombre
                    }
                });
                setCategory(newCategories)
                if (searchCategory) {
                    const category = newCategories.find(c => c.value === searchCategory)
                    setSelectedCategory(category.value)
                }
            }).catch(err => {
                console.log(err)
            })
    }, [searchCategory])


    return (
        <main>
            <HeaderNav />
            <section className="all-restaurants">
                <header className='all-restaurants-header'>
                    <div>
                        <h1>Descubre las ricuras en tu ciudad</h1>
                    </div>
                    <div className='all-restaurants-header-filters'>
                        <p>Filtra tus preferencias</p>
                        <div>
                            <label className='hidden-label'>Calificación: </label>
                            <Rating precision={0.5}
                                name="simple-controlled"
                                value={ratingValue}
                                onChange={(event, newValue) => {
                                    handleRating(newValue)
                                }}
                            />
                            <label className='hidden-label'>Categoría: </label>
                            <Select
                                className="all-restaurants-header-filters-select"
                                options={category}
                                placeholder='Categoría'
                                onChange={handleSelectCategory}
                                isSearchable={false}
                                value={category.find(c => c.value === selectedCategory)}
                            />
                        </div>
                    </div>
                </header>
                <section className='all-restaurants-main'>
                    {
                        permission ?
                            loading ? <p>Cargando...</p> :
                                restaurants.length > 0 ?
                                    restaurants.map((restaurant, index) => {
                                        return (
                                            <button
                                                onClick={() => navigator(`/restaurant/${restaurant.id}`)}
                                                key={index} className='all-restaurants-main-restaurant'>
                                                <img draggable='false' src={restaurant.img_banner} alt='banner' />
                                                <div className='all-restaurants-main-restaurant-info'>
                                                    <img draggable='false' src={restaurant.img_icon} alt='Logo' />
                                                    <div className='all-restaurants-main-restaurant-name-container'>
                                                        <h2 className='all-restaurants-main-restaurant-name'>{restaurant.nombre}</h2>
                                                    </div>
                                                    <div className='all-restaurants-main-restaurant-rating-container'>
                                                        <img draggable='false' src='https://firebasestorage.googleapis.com/v0/b/rippio.appspot.com/o/icons%2Fstar.png?alt=media&token=333d2b1d-f002-4105-8598-a13999ab3485' alt='star' />
                                                        <p>{restaurant.calificacion}</p>
                                                    </div>
                                                </div>
                                            </button>
                                        )
                                    })
                                    : <p>Estamos mejorando cada día para llevar restaurantes de estas características a tu ciudad</p>
                            : <p>No fue posible traer los restaurantes de tu ciudad</p>
                    }
                </section>
            </section>
            <Footer />
        </main>
    )
}