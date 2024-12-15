import { useCallback, useEffect, useState } from "react";
import {
  getAverageSalesByDay,
  getMostSoldCategoriesByDate,
  getMostSoldProductsByDate,
  getOrdersByDays,
  getPopularRestaurantByDate,
} from "../controller/controller";

export const useAdminCharts = () => {
  const [popularRestaurants, setPopularRestaurants] = useState(null);
  const [ordersByDays, setOrdersByDays] = useState(null);
  const [averageSalesByDay, setAverageSalesByDay] = useState(null);
  const [mostSoldProducts, setMostSoldProducts] = useState(null);
  const [mostSoldCategories, setMostSoldCategories] = useState(null);

  const loadPopularRestaurantByDate = useCallback(async (date) => {
    try {
      const response = await getPopularRestaurantByDate(date);
      setPopularRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadOrdersByDays = useCallback(async () => {
    try {
      const response = await getOrdersByDays();
      setOrdersByDays(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadAverageSalesByDay = useCallback(async () => {
    try {
      const response = await getAverageSalesByDay();
      setAverageSalesByDay(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadMostSoldProductsByDate = useCallback(async (date) => {
    try {
      const response = await getMostSoldProductsByDate(date);
      setMostSoldProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadMostSoldCategoriesByDate = useCallback(async (date) => {
    try {
      const response = await getMostSoldCategoriesByDate(date);
      setMostSoldCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const date = new Date().toISOString().split("T")[0];
    loadPopularRestaurantByDate(date);
    loadOrdersByDays();
    loadAverageSalesByDay();
    loadMostSoldProductsByDate(date);
    loadMostSoldCategoriesByDate(date);
  }, [
    loadPopularRestaurantByDate,
    loadOrdersByDays,
    loadAverageSalesByDay,
    loadMostSoldProductsByDate,
    loadMostSoldCategoriesByDate,
  ]);

  return {
    popularRestaurants,
    ordersByDays,
    averageSalesByDay,
    mostSoldProducts,
    mostSoldCategories,
  };
};
