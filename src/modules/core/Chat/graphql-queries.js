import { gql } from "@apollo/client";

export const GET_MESSAGES_BY_ORDER_ID = gql`
  query ($idPedido: ID!, $token: String!) {
    getchat_order(id_pedido: $idPedido, token: $token) {
      id
      mensaje
      img_icon
      mensaje
      tipo_usuario
      fecha
    }
  }
`;
