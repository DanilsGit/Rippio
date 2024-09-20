import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { useAuth } from "@m/core/hooks/useAuth";
import { useState } from "react";
import { getOrderDetailByID } from "@/api/order";
import { useEffect } from "react";
import { GET_MESSAGES_BY_ORDER_ID } from "../Chat/graphql-queries";
import { POST_MESSAGE_IN_ORDER_ID } from "../Chat/graphql-mutations";
import { SUSCRIBE_BY_ORDER_ID } from "../Chat/graphql-subscription";

export const useDetailOrderModal = (order) => {
  //Estado mientras se cargan los productos
  const [loading, setLoading] = useState(true);

  //Estado para guardar los productos
  const [products, setProducts] = useState(null);

  //Estado para la dirección de envío
  const [direction, setDirection] = useState(null);

  //Estado para el método de pago
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(
    () => {
      if (order) {
        getOrderDetailByID(order.id)
          .then((response) => {
            // console.log(response.data)
            response.data.forEach((product) => {
              product.observacionp =
                product.observacionp == "N/A" ||
                product.observacionp == "" ||
                !product.observacionp
                  ? ""
                  : product.observacionp;
              product.observaciond =
                product.observaciond == "N/A" ||
                product.observaciond == "" ||
                !product.observaciond
                  ? ""
                  : product.observaciond;
            });
            const direction = `${response.data[0].ciudad}, ${response.data[0].barrio}, ${response.data[0].tipo_via} ${response.data[0].numero_via} # ${response.data[0].numero_uno} - ${response.data[0].numero_dos}`;
            const observacion_direction = response.data[0].observaciond;
            const newDirection = [direction, observacion_direction];
            setDirection(newDirection);
            const paymentMethod =
              response.data[0].numero.slice(0, 4) +
              " ❋❋❋❋ ❋❋❋❋ " +
              "❋❋" +
              response.data[0].numero.slice(-2);
            setPaymentMethod(paymentMethod);
            setProducts(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    },
    [order],
    []
  );

  const setNull = () => {
    setProducts(null);
    setDirection(null);
    setPaymentMethod(null);
  };

  return { products, direction, paymentMethod, loading, setNull };
};

export const useChatQuery = (id) => {
  const token = useAuth((state) => state.token);
  const result = useQuery(GET_MESSAGES_BY_ORDER_ID, {
    variables: { idPedido: id, token: token },
    onError: (err) => {
      console.log(err);
    },
  });
  return result;
};

export const useChatMutation = (id) => {
  const token = useAuth((state) => state.token);


  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [sending, setSending] = useState(false);

  const [createMessage] = useMutation(POST_MESSAGE_IN_ORDER_ID, {
    onError: (err) => {
      setError("Error al enviar el mensaje");
      console.log(err);
    },
  });

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  }, [error]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    if (!message) return;
    try {
      setMessage("");
      await createMessage(
        {
          variables: {
            idPedido: id,
            mensaje: message,
            fecha: new Date().toISOString(),
            token: token,
          },
        },
        {
          onError: (err) => {
            setError("Error al enviar el mensaje");
            console.log(err);
          },
        }
      );
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setSending(false);
  };

  return { handleSendMessage, error, handleChange, message };
};

export const useChatSubscription = (id) => {
  const client = useApolloClient();
  const token = useAuth((state) => state.token);
  const user = useAuth((state) => state.user);

  // Solicitar permiso de notificación
  const requestNotificationPermission = async () => {
    if (Notification.permission === "default") {
      await Notification.requestPermission();
    }
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const showNotification = (message) => {
    if (Notification.permission === "granted") {
      new Notification("Nuevo mensaje", {
        body: message,
      });
    }
  };

  useSubscription(SUSCRIBE_BY_ORDER_ID, {
    variables: { idPedido: id },
    onData: async ({ data }) => {
      const listenOrderMessages = data.data.listenOrderMessages;
      const dataInStore = client.readQuery({
        query: GET_MESSAGES_BY_ORDER_ID,
        variables: { idPedido: id, token: token },
      });

      // Mostrar notificación
      if (listenOrderMessages.tipo_usuario != user.tipo_usuario) {
        showNotification(listenOrderMessages.mensaje);
      }

      client.writeQuery({
        query: GET_MESSAGES_BY_ORDER_ID,
        variables: { idPedido: id, token: token },
        data: {
          ...dataInStore,
          getchat_order: [...dataInStore.getchat_order, listenOrderMessages],
        },
      });
    },
  });
};
