import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const getCatAndProdByResId = (id) => axios.get(`${API_URL}/api/restaurant/getCatAndProdByResId/${id}`);

export const getInfo = (id) => axios.get(`${API_URL}/api/restaurant/getProfileById/${id}`);