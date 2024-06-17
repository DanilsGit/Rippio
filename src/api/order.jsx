import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

// Ordenes de los usuarios
export const addOrder = (token, order) => axios.post(`${API_URL}/api/order/add`, order, { headers: { 'Authorization': `Bearer ${token}` } });

export const getOrders = (token) => axios.get(`${API_URL}/api/order/getByUserID`, { headers: { 'Authorization': `Bearer ${token}` } });

export const getOrderDetailByID =
    (id_details_order) => axios.get(`${API_URL}/api/order/getDetail`, { params: { id_details_order } });

// Ordenes de los restaurantes
export const getOrdersByRestaurant = (token) => axios.get(`${API_URL}/api/order/restaurant`, { headers: { 'Authorization': `Bearer ${token}` } });

export const getOrderDetailRestaurantByID =
    (token, id_order) => axios.get(`${API_URL}/api/order/detailsRestaurant`, { headers: { 'Authorization': `Bearer ${token}` }, params: { id_order } });

export const updateOrderState = (token, id_order, status) => axios.put(`${API_URL}/api/order/status`, { id_order, status }, { headers: { 'Authorization': `Bearer ${token}` } });

export const mostOrdered = (fecha) =>
    axios.get(`${API_URL}/api/most_request/most_request`, {
        params: {
            fecha: fecha
        }
    });