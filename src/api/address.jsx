import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const addAddress = (token, address) => axios.post(`${API_URL}/api/profile/add_address`, address, { headers: { 'Authorization': `Bearer ${token}` } });

export const editAddress = (token, address) => axios.post(`${API_URL}/api/profile/modify_address`, address, { headers: { 'Authorization': `Bearer ${token}` } });
    
export const getAddresses = (token) => axios.get(`${API_URL}/api/profile/get_address_by_id`, { headers: { 'Authorization': `Bearer ${token}` } });

export const deleteAddress = (token,id_direccion) => axios.post(`${API_URL}/api/profile/delete_address`, {id_direccion}, { headers: { 'Authorization': `Bearer ${token}` } });