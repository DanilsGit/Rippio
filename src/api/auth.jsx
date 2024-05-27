import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const registerRequest = data => axios.post(`${API_URL}/api/auth/register`, data, { withCredentials: true });

export const loginRequest = data => axios.post(`${API_URL}/api/auth/login`, data, { withCredentials: true });

export const getUserData = id => axios.get(`${API_URL}/api/user_data/getById/${id}`);
