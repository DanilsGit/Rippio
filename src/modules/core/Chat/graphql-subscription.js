import { gql } from "@apollo/client";

export const SUSCRIBE_BY_ORDER_ID = gql`
  subscription ($idPedido: ID!) {
    listenOrderMessages(id_pedido: $idPedido) {
      id
      tipo_usuario
      fecha
      img_icon
      mensaje
    }
  }
`;
