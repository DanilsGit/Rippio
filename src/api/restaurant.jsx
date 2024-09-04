import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// const API_LOCAL = 'http://localhost:4000';

export const getCatAndProdByResId = (id) => axios.get(`${API_URL}/api/restaurant/getCatAndProdByResId/${id}`);

export const getInfo = (id) => axios.get(`${API_URL}/api/restaurant/getProfileById/${id}`);

export const getCategories = () => axios.get(`${API_URL}/api/category/getAll`);

export const getRestaurants = (ciudad, categoria, calificacion) =>
    axios.get(`${API_URL}/api/restaurant/PageRestaurant`, {
        params: {
            ciudad,
            categoria,
            calificacion
        }
    });