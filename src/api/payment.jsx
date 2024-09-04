import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// const API_LOCAL = 'http://localhost:4000';

export const getPayments = (token) => axios.get(`${API_URL}/api/profile/get_payment_methods`, { headers: { 'Authorization': `Bearer ${token}` } });

export const getTypeOfPayment = (token) => axios.get(`${API_URL}/api/profile/get_type_payment_methods`, { headers: { 'Authorization': `Bearer ${token}` } });

export const addPayment = (token, data) => axios.post(`${API_URL}/api/profile/add_payment_method`, data, { headers: { 'Authorization': `Bearer ${token}` } });

export const deletePayment = (token, id_credit_card) => axios.delete(`${API_URL}/api/profile/delete_payment_methods`, { 
    data: id_credit_card, 
    headers: { 'Authorization': `Bearer ${token}` } 
});