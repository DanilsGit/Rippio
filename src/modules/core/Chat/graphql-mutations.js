import { gql } from "@apollo/client";

export const POST_MESSAGE_IN_ORDER_ID = gql`
  mutation (
    $idPedido: ID!
    $mensaje: String!
    $fecha: String!
    $token: String!
  ) {
    insertchat_order(
      id_pedido: $idPedido
      mensaje: $mensaje
      fecha: $fecha
      token: $token
    ) {
      id
    }
  }
`;
