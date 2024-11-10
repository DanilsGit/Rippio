import { useEffect, useState } from 'react'
import { getRestaurantsPagination } from '@/api/admin'
import { putUserState } from '../../../api/admin';

export const useRestaurantManagementCities = () => {
    const [loading, setLoading] = useState(false);
    const [selectedDepartamento, setSelectedDepartamento] = useState(null);
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [restaurants, setRestaurants] = useState(null);
    // Paginación
    const limit = 10;
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(0);

    const handleSelectDepartamentos = (departamento) => {
        setSelectedDepartamento(departamento);
    }

    const handleSelectCity = (city) => {
        setSelectedCity(city);
    }

    const handleNextPage = (e) => {
        e.preventDefault();
        console.log(page, pages);
        if (page < pages) {
            setPage(page + 1);
        }
    }

    const handlePrevPage = (e) => {
        e.preventDefault();
        if (page > 1) {
            setPage(page - 1);
        }
    }

    const handleSwitchState = async (e, id) => {
        e.stopPropagation();
        const newRestaurants = restaurants.map(restaurant => {
            if (restaurant.id === id) {
                restaurant.estado = !restaurant.estado;
            }
            return restaurant;
        });
        setRestaurants(newRestaurants);
        const res = await putUserState(id);
        console.log(res.data);
        
    }

    // useEffect para cuando se cambia el departamento seleccionado
    useEffect(() => {
        if (selectedDepartamento) {
            setCities(selectedDepartamento.ciudades.map(ciudad => ({ value: ciudad, label: ciudad })));
        }
    }, [selectedDepartamento]);

    const getRestaurants = async (ciudad, offset, limit) => {
        setLoading(true);
        const res = await getRestaurantsPagination(ciudad, offset, limit);
        setRestaurants(res.data.restaurants);
        setPages(res.data.totalPages);
        setLoading(false);
    }

    // UseEffect para cuando se cambia la página seleccionada
    useEffect(() => {
        if (selectedCity) {
            const offset = (page - 1) * limit;
            const ciudad = selectedCity.value;
            getRestaurants(ciudad, offset, limit);
        }
    }, [page]);

    // UseEffect para cuando se cambia la ciudad seleccionada
    useEffect(() => {
        if (selectedCity) {
            const offset = 0;
            setPage(1);
            const ciudad = selectedCity.value;
            getRestaurants(ciudad, offset, limit);
        }
    }, [selectedCity]);

    return { cities, handleSelectDepartamentos, handleSelectCity, restaurants, handleNextPage, handlePrevPage, page, pages, loading, handleSwitchState }
}