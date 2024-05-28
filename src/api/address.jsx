import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';

export const addAddress = (token, address) => axios.post(`${API_URL}/api/profile/add_address`, address, { headers: { 'Authorization': `Bearer ${token}` } });

export const editAddress = (token, address) => axios.post(`${API_URL}/api/profile/modify_address`, address, { headers: { 'Authorization': `Bearer ${token}` } });
