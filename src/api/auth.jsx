import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_URL = 'https://h8vxgqcm-4000.use2.devtunnels.ms';
// const API_URL = 'http://localhost:4000';

export const registerRequest = data => axios.post(`${API_URL}/api/auth/register`, data);

export const loginRequest = data => axios.post(`${API_URL}/api/auth/login`, data);

export const getUserData = id => axios.get(`${API_URL}/api/user_data/getById/${id}`);
