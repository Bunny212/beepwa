import { gql } from '@apollo/client';

export const GET_GTM_PURCHASE_DATA = gql`
  query GetGtmPurchaseData($incrementId: String!) {
    getGtmPurchaseData(incrementId: $incrementId) {
      coupon_code
      discount_amount
      grand_total
      increment_id
      order_currency
      country
      order_items {
        discount
        item_brand
        item_category
        item_list_id
        item_list_name
        item_name
        item_variant
        price
        quantity
        sku
        stock_status
        uid
      }
      shipping_amount
      tax
    }
  }`;