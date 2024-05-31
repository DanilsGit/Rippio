import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const addSection = (token, section) => axios.post(`${API_URL}/api/section/add`, section, { headers: { 'Authorization': `Bearer ${token}` } });

export const deleteSection = (token, section) => axios.post(`${API_URL}/api/section/remove`, section, { headers: { 'Authorization': `Bearer ${token}` } });