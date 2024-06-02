import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const addOrder = (token, order) => axios.post(`${API_URL}/api/order/add`, order, { headers: { 'Authorization': `Bearer ${token}` } });