import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const moveProductToSection = (token, id_producto, secciones) => axios.post(`${API_URL}/api/product/updateSeccionProd`, { id_producto, secciones }, { headers: { authorization: `Bearer ${token}` } });



