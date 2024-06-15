import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const getPlans = () => axios.get(`${API_URL}/api/plan/getAll`);

export const buyPlan =
(token, data) => axios.post(`${API_URL}/api/plan/getPlan`, data, {
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export const getPlanById =
(token) => axios.get(`${API_URL}/api/plan/getById`, { headers: { Authorization: `Bearer ${token}` } });


export const cancelPlan =
(token) => axios.post(`${API_URL}/api/plan/cancelPlan`, {}, { headers: { Authorization: `Bearer ${token}` } });