// mutations.js
import { gql } from '@apollo/client';

export const SET_SHIPPING_ADDRESSES_ON_CART = gql`
  mutation SetShippingAddressesOnCart($input: SetShippingAddressesOnCartInput!) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        email
        total_quantity
      }
    }
  }
`;
