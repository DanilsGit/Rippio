import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const getPlans = () => axios.get(`${API_URL}/api/plan/getAll`);