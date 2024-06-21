import { gql } from '@apollo/client';

export const GET_ORDER_STATUS_DATA = gql`
  query GetOrderStatusData ($incrementId: String, $email: String) {
    getOrderStatusData (incrementId: $incrementId, email: $email) {
      id
      status
      shipping_method
    }
  }
`;
