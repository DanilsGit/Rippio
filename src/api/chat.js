import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Crear el chat de la orden
export const createchat_order = (token, body) => axios.post(`${API_URL}/api/chat/createchat_order`, body, { headers: { 'Authorization': `Bearer ${token}` } });