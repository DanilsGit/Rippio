import { gql } from "@apollo/client";

export const SUSCRIBE_BY_ORDER_ID = gql`
  subscription ($orderId: ID!) {
    listenOrderMessages(order_id: $orderId) {
      id
      sent_by
      message
      created_at
    }
  }
`;
