// mutations.js
import { gql } from '@apollo/client';

export const SET_SHIPPING_ADDRESSES_ON_CART = gql`
  mutation SetShippingAddressesOnCart($input: SetShippingAddressesOnCartInput!) {
    setShippingAddressesOnCart(input: $input) {
      cart {
        email
        total_quantity
        shipping_addresses {
          firstname
          lastname
          company
          street
          city
          region {
            region_id
            code
            label
          }
          postcode
          telephone
          country {
            code
            label
          }
          bee_building_name
          bee_apartment_nb
          bee_address_nickname
          bee_address_notes
          bee_coordinates
          available_shipping_methods{
            carrier_code
            carrier_title
            method_code
            method_title
          }
        }
      }
    }
  }
`;
