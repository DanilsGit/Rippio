import { gql } from "@apollo/client";

export const GET_MESSAGES_BY_ORDER_ID = gql`
  query ($orderId: ID!) {
    getAllMessages(order_id: $orderId) {
      id
      message
      sent_by
      created_at
    }
  }
`;
