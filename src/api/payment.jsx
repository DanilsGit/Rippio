import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const getPayments = (token) => axios.get(`${API_URL}/api/profile/get_payment_methods`, { headers: { 'Authorization': `Bearer ${token}` } });