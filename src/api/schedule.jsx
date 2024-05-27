import axios from 'axios';

const API_URL = 'https://rippio-api.vercel.app';
// const API_LOCAL = 'http://localhost:4000';

export const getSchedule = token => axios.get(`${API_URL}/api/schedule/getSchedule`, { headers: { 'Authorization': `Bearer ${token}` } });

export const updateSchedule = (token, schedule) => axios.put(`${API_URL}/api/schedule/updateSchedule`, schedule, { headers: { 'Authorization': `Bearer ${token}` } });

export const addSchedule = (token, schedule) => axios.post(`${API_URL}/api/schedule/addSchedule`, schedule, { headers: { 'Authorization': `Bearer ${token}` } });