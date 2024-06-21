import { gql } from '@apollo/client';

export const GET_SELECTED_PAYMENT_METHOD = gql`
  query GetSelectedPaymentMethod($cartId: String!) {
    cart(cart_id: $cartId) {
      selected_payment_method {
        code
        title
      }
    }
  }
`;

export const GET_OSC_CONFIG = gql`
    query storeConfigData {
        storeConfig {
            amasty_checkout_default_values_payment_method
        }
    }
`;