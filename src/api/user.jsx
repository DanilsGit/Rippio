import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const editProfileRestaurant = (token, direccion, celular, categorias) => 
    axios.post(`${API_URL}/api/profile/edit`, 
        {
            direccion,
            celular,
            categorias
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });