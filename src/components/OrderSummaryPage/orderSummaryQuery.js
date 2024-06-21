import { gql } from '@apollo/client';

export const GET_ORDER_DATA = gql`
  query GetOrderData ($incrementId: String) {
    getOrderData (incrementId: $incrementId) {
      id
      status
      incrementId
      email
      subTotal
      grandTotal
      shippingAmount
      discountAmount
      hasDiscount
      orderCurrency
      paymentMethod
      {
        title
        label
      }
      orderItems {
        name
        qtyOrdered
        price
        originalPrice
        rowTotal
        hasDiscount
        imageUrl
      }
      addressData {
        billing {
          firstname
          lastname
          fullname
          street
          city
          region
          postcode
          country_id
          telephone
          bee_building_name
          bee_apartment_nb
          bee_address_notes
          bee_address_nickname
          bee_nickname
          bee_address_type
          bee_floor
          bee_coordinates
        }
        shipping {
          firstname
          lastname
          fullname
          street
          city
          region
          postcode
          country_id
          telephone
          bee_building_name
          bee_apartment_nb
          bee_address_notes
          bee_address_nickname
          bee_nickname
          bee_address_type
          bee_floor
          bee_coordinates
        }
      }
    }
  }
`;
