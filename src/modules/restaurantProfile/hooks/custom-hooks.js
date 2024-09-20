import { useEffect, useState } from "react";
import { getOrdersByRestaurant } from "@/api/order";
import { useAuth } from "@m/core/hooks/useAuth";
import { formatDate } from "@m/core/utils/formatDate";

export const useRestaurantOrders = () => {
  // Conseguir el token del usuario con zustand
  const token = useAuth((state) => state.token);

  // Estado para mostrar el Cargando... mientras se obtienen los pedidos
  const [loading, setLoading] = useState(true);

  // Estado para obtener los pedidos
  const [orders, setOrders] = useState(null);

  // Estado para almacenar pedidos filtrados
  const [filteredOrders, setFilteredOrders] = useState(null);

  // Estado para almacenar la selección del filtro
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Estado para mostrar el modal de detalles del pedido
  const [isOpen, setIsOpen] = useState(false);

  // Estado para almacenar el pedido seleccionado
  const [selectedOrder, setSelectedOrder] = useState(null);

  // useEffect para obtener los pedidos
  useEffect(() => {
    getOrdersByRestaurant(token)
      .then((response) => {
        response.data.forEach((order) => {
          order.fecha = formatDate(order.fecha);
          order.total = order.costo_total + order.creditos_usados;
          order.subtotal =
            order.costo_total + order.creditos_usados - order.costo_envio;
        });
        setOrders(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [token]);

  // UseEffect para filtrar los pedidos
  useEffect(() => {
    // Si no hay pedidos, no hacer nada
    if (!orders) return;
    // Si no hay filtro seleccionado, mostrar los Pendiente
    if (!selectedFilter) {
      setSelectedFilter("Pendiente");
      return;
    }
    if (selectedFilter === "Todos") {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(
        (order) => order.estado === selectedFilter
      );
      setFilteredOrders(filtered);
    }
  }, [selectedFilter, orders]);

  const handleChangeFilter = (selectedOption) => {
    setSelectedFilter(selectedOption.value);
  };

  const handleOpenOrder = (order) => {
    setSelectedOrder(order);
    setIsOpen(true);
  };

  return {
    loading,
    orders,
    filteredOrders,
    selectedFilter,
    handleChangeFilter,
    isOpen,
    selectedOrder,
    handleOpenOrder,
    setOrders,
    setIsOpen,
    setSelectedOrder,
  };
};

export const useRestaurantChat = () => {
  const [isOpenChat, setIsOpenChat] = useState(false);
  const [orderChat, setOrderChat] = useState(null);

  const handleCloseChat = () => {
    setOrderChat(null);
    setIsOpenChat(false);
  };

  const handleOpenChat = (order) => {
    setOrderChat(order);
    setIsOpenChat(true);
  };

  return { isOpenChat, orderChat, handleCloseChat, handleOpenChat };
};
