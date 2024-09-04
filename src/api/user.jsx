import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
// const API_LOCAL = 'http://localhost:4000';

export const editProfileRestaurant = (token, direccion, celular, categorias) =>
    axios.post(`${API_URL}/api/profile/edit`,
        {
            direccion,
            celular,
            categorias
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

export const forgotPassword = (email, fecha) =>
    axios.post(`${API_URL}/api/recovery/forgot-password`,
        {
            email,
            fecha
        });

export const resetPassword =
    (token, newPassword, confirmNewPassword, time) =>
        axios.post(`${API_URL}/api/recovery/reset-password`,
            {
                token,
                newPassword,
                confirmNewPassword,
                time
            });