import { GET_MESSAGES_BY_ORDER_ID } from "../Messages/graphql-queries";
import {
  useApolloClient,
  useMutation,
  useQuery,
  useSubscription,
} from "@apollo/client";
import { useEffect, useState } from "react";
import { POST_MESSAGE_IN_ORDER_ID } from "../Messages/graphql-mutations";
import { SUSCRIBE_BY_ORDER_ID } from "../Messages/graphql-subscription";

export const useMessageMutaion = ({ idOrder }) => {
  const initialValue = {
    message: "",
    userId: "",
    restaurantId: "",
    orderId: idOrder,
  };
  const [message, setMessage] = useState(initialValue);
  const [error, setError] = useState(null);
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
    const { name, value } = e.target;
    setMessage((prevMessage) => ({
      ...prevMessage,
      [name]: value,
    }));
  };

  const handleSummit = async (e) => {
    e.preventDefault();

    if (!message.message) {
      setError("Falta el mensaje");
      return;
    }

    try {
      await createMessage({ variables: message });
      setMessage({
        message: "",
        userId: "",
        restaurantId: "",
        orderId: message.orderId,
      });
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  return { message, error, handleSummit, handleChange };
};

export const useMessageSubscription = ({ idOrder }) => {
  const client = useApolloClient();

  useSubscription(SUSCRIBE_BY_ORDER_ID, {
    variables: { orderId: idOrder },
    onData: ({ data }) => {
      const listenOrderMessages = data.data.listenOrderMessages;
      const dataInStore = client.readQuery({
        query: GET_MESSAGES_BY_ORDER_ID,
        variables: { orderId: idOrder },
      });
      client.writeQuery({
        query: GET_MESSAGES_BY_ORDER_ID,
        variables: { orderId: idOrder },
        data: {
          ...dataInStore,
          getAllMessages: [...dataInStore.getAllMessages, listenOrderMessages],
        },
      });
      setTimeout(() => {
        window.scrollTo(0, document.body.scrollHeight);
      }, 500);
    },
  });
};

export const useMessageQuery = ({ idOrder }) => {
  const result = useQuery(GET_MESSAGES_BY_ORDER_ID, {
    variables: { orderId: idOrder },
    onError: (err) => {
      console.log(err);
    },
  });
  return result;
};
