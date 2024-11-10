import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// const API_LOCAL = 'http://localhost:4000';

export const getRestaurantsPagination = (ciudad, offset, limit) => axios.get(`${API_URL}/api/restaurant/getByCity`,{
    params: {
        ciudad,
        offset,
        limit
    }
});

export const putUserState = (id) => axios.put(`${API_URL}/api/user_data/changeState/${id}`);
