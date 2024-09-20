import { useAuth } from "@m/core/hooks/useAuth";
import { useCart } from "@m/core/hooks/useCart";
import { useEffect, useState } from "react";
import { getAddresses } from "@/api/address";
import { getPayments } from "@/api/payment";
import { createchat_order } from "@/api/chat";
import { addOrder } from "@/api/order";
import { useNavigate } from "react-router-dom";

export const useUserDeriveryData = () => {
  const token = useAuth((state) => state.token);

  //Estado para guardar las direcciones del usuario
  const [address, setAddress] = useState(null);

  //Estado para guardar los métodos de pago del usuario
  const [payment, setPayment] = useState(null);

  //useEffect para cargar las direcciones del usuario
  useEffect(() => {
    getAddresses(token)
      .then((res) => {
        console.log(res.data);
        const newAddress = res.data.map((address) => {
          return {
            value: address.id,
            label: `${address.ciudad}, ${address.barrio} - ${address.tipo_via} - ${address.numero_uno} - ${address.numero_dos} - ${address.observaciones}`,
          };
        });
        setAddress(newAddress);
      })
      .catch((err) => {
        // console.log(err);
        console.log(err.response.data.message);
        if (err.response.data.message === "No hay direcciones") {
          setAddress([]);
        }
      });
  }, [token]);

  //useEffect para cargar los metodos de pago
  useEffect(() => {
    getPayments(token)
      .then((res) => {
        const newPayment = res.data.map((payment) => {
          const firstFourthAndTwoLast =
            payment.numero.slice(0, 4) +
            " ❋❋❋❋ ❋❋❋❋ " +
            "❋❋" +
            payment.numero.slice(-2);
          return {
            value: payment.id,
            label: firstFourthAndTwoLast,
          };
        });
        setPayment(newPayment);
      })
      .catch((err) => {
        // console.log(err);
        console.log(err.response.data.message);
        if (err.response.data.message === "No hay tarjetas") {
          setPayment([]);
        }
      });
  }, [token]);

  return { address, payment };
};

export const useCheckout = () => {
  const cart = useCart((state) => state.cart);
  const loadCartFromDatabase = useCart((state) => state.loadCartFromDatabase);
  const user = useAuth((state) => state.user);
  const token = useAuth((state) => state.token);
  const clearCart = useCart((state) => state.clearCart);

  const navigator = useNavigate();

  // Estado para el costo de envío
  const [costoEnvio, setCostoEnvio] = useState(3000);

  //Estado para saber si usar creditos
  const [useCredits, setUseCredits] = useState(false);

  //Objeto para la informacion previa del pedido
  const [orderBeforeInfo, setOrderBeforeInfo] = useState({});

  //Estado para guardar la información del pedido
  const [orderInfo, setOrderInfo] = useState({});

  // Estado para saber si el pedido se completó
  const [completeOrder, setCompleteOrder] = useState(false);

  //Estado para darle a comprar solo una vez
  const [buyOnce, setBuyOnce] = useState(false);

  //Estado para enviar la información del pedido
  const [order, setOrder] = useState({
    id_pago: "",
    id_direccion: "",
    useCreditos: useCredits,
    costoEnvio: costoEnvio,
  });

  //useEffect para cargar el carrito desde la base de datos
  useEffect(() => {
    loadCartFromDatabase(token);
    console.log("cargadoEnCheckout");
  }, []);

  //UseEffect para iniciar la información del pedido
  useEffect(() => {
    const NewOrderBeforeInfo = {
      totalCreditos: user.creditos,
      subTotal: cart.total,
      total: cart.total + costoEnvio,
    };
    setOrderBeforeInfo(NewOrderBeforeInfo);
    setOrderInfo(NewOrderBeforeInfo);
  }, [cart, cart.total, user.creditos, costoEnvio]);

  //Función para calcular el total del pedido si incluye creditos o no
  const calculateTotal = () => {
    const newUseCredits = !useCredits;
    if (!newUseCredits) {
      setOrderInfo(orderBeforeInfo);
    } else {
      const newOrderInfo = { ...orderInfo };
      if (newOrderInfo.totalCreditos >= newOrderInfo.total) {
        newOrderInfo.totalCreditos -= newOrderInfo.total;
        newOrderInfo.total = 0;
      } else {
        newOrderInfo.total -= newOrderInfo.totalCreditos;
        newOrderInfo.totalCreditos = 0;
      }
      setOrderInfo(newOrderInfo);
    }
    setUseCredits(newUseCredits);
  };

  // Función para actualizar el estado del pedido
  const updateOrder = (name, value) => {
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  //Función para enviar el pedido
  const handleSubmit = async () => {
    setBuyOnce(true);

    // const {  //Esto es lo que se espera recibir en el body
    //     id_payment_method,
    //     id_address,
    //     use_credits,
    //     shipping_cost,
    //   } = req.body;

    if (order.id_pago === "" || order.id_direccion === "") {
      alert("Por favor, selecciona una dirección y un método de pago");
      setBuyOnce(false);
      return;
    }

    const loadingStart = document.querySelector(".CheckoutPage-btn-loading");
    loadingStart.classList.add("CheckoutPage-btn-loadingStart");

    //Formato fecha:
    //2024-06-02 13:08:18
    //2024-06-02 20:20:53

    const newOrderToSend = {
      id_payment_method: order.id_pago,
      id_address: order.id_direccion,
      use_credits: useCredits,
      shipping_cost: Number(costoEnvio),
      date: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    try {
      const resOrder = await addOrder(token, newOrderToSend);
      const { message, id } = resOrder.data;

      if (message !== "Pedido creado correctamente")
        throw new Error("Error al crear el pedido");

      const resChat = await createchat_order(token, {
        id_pedido: id,
        id_restaurante: cart.restaurant.id,
        id_usuario: user.id,
      });

      console.log(resChat.data);

      loadingStart.classList.add("CheckoutPage-btn-loadingEnd");
      setCompleteOrder(true);
      setTimeout(() => {
        clearCart();
        navigator("/profile/orders");
      }, 2000);
    } catch (err) {
      console.log(err);
      setBuyOnce(false);
    }
  };

  return {
    orderBeforeInfo,
    orderInfo,
    costoEnvio,
    updateOrder,
    completeOrder,
    buyOnce,
    cart,
    handleSubmit,
    useCredits,
    calculateTotal,
  };
};
