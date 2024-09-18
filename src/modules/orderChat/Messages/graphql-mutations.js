import { gql } from "@apollo/client";

export const POST_MESSAGE_IN_ORDER_ID = gql`
  mutation (
    $userId: ID!
    $restaurantId: ID!
    $orderId: ID!
    $message: String!
  ) {
    sendMessage(
      user_id: $userId
      restaurant_id: $restaurantId
      order_id: $orderId
      message: $message
    ) {
      id
    }
  }
`;
