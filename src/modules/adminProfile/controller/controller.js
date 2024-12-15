import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const getPopularRestaurantByDate = async (date) =>
  axios.get(`${API_URL}/api/statistics/getMostPopularRestaurants`, {
    params: {
      fecha: date,
    },
  });

export const getOrdersByDays = async () =>
  axios.get(`${API_URL}/api/statistics/getMostRequestedDays`);

export const getAverageSalesByDay = async () =>
  axios.get(`${API_URL}/api/statistics/getAverageSpending`);

export const getMostSoldProductsByDate = async (date) =>
  axios.get(`${API_URL}/api/statistics/getMostSoldProducts`, {
    params: {
      fecha: date,
    },
  });

export const getMostSoldCategoriesByDate = async (date) =>
  axios.get(`${API_URL}/api/statistics/getMostRequested`, {
    params: {
      fecha: date,
    },
  });
