import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// const API_LOCAL = 'http://localhost:4000';

export const getCart = (token) => axios.get(`${API_URL}/api/cart/get`, { headers: { authorization: `Bearer ${token}` } });

export const addToCart = (token, id_producto, cantidad_prod, observacion) => 
    axios.post(`${API_URL}/api/cart/add`, { id_producto, cantidad_prod, observacion }, { headers: { authorization: `Bearer ${token}` } });

export const removeFromCart = (token, id_producto, observacion, all) =>
    axios.delete(`${API_URL}/api/cart/removeByProdId`, { 
        data: { id_producto, observacion, all }, 
        headers: { authorization: `Bearer ${token}` } 
    });

export const clearCart = (token) =>
    axios.delete(`${API_URL}/api/cart/empty`, { headers: { authorization: `Bearer ${token}` } });

