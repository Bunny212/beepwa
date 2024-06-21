import { gql } from '@apollo/client';

export const GET_GTM_VIEW_CART_ITEMS = gql`
  query GetGtmViewCartItems($skus: [String]!) {
    getGtmViewCartItems(skus: $skus) {
      currency
      value
      country
      items {
        uid
        sku
        quantity
        price
        discount
        item_name
        item_brand
        item_category
        item_list_id
        item_list_name
        item_variant
      }
    }
  }
`;