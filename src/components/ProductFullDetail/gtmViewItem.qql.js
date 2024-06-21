import { gql } from '@apollo/client';

export const GET_GTM_VIEW_ITEM = gql`
  query GetGtmViewItem($sku: String!) {
    getGtmViewItem(sku: $sku) {
      currency
      value
      country
      items {
        uid
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