import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const addProduct = (token, product) => axios.post(`${API_URL}/api/product/add`, product, { headers: { 'Authorization': `Bearer ${token}` } });

export const editProduct = (token, product) => axios.post(`${API_URL}/api/product/updateProd`, product, { headers: { 'Authorization': `Bearer ${token}` } });

export const getProductsByResId = (resId) => axios.get(`${API_URL}/api/restaurant/getCatAndProdByResId/${resId}`);