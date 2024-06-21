import { gql } from '@apollo/client';

export const GET_TABS1_DATA = gql`
  query GetTabs1 {
    getTabs1 {
      items {
        id
        name
        price
        product_type
        label
        price_range {
          maximum_price {
            discount {
              amount_off
              percent_off
            }
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
          minimum_price {
            discount {
              amount_off
              percent_off
            }
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
        }
        productPath
        imageUrl
        sku
        uid
        stock_status
        bundle_selected_options
        data_layer {
          country
          currency
          value
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
      title
      category_info {
        uid
        position
        name
        urlKey
        iconUrl
        pathKey
        catDescp
        imageUrl
        mobImageUrl
      }
      count
    }
  }
`;

export const GET_TABS2_DATA = gql`
  query GetTabs2 {
    getTabs2 {
      items {
        id
        name
        price
        product_type
        label
        price_range {
          maximum_price {
            discount {
              amount_off
              percent_off
            }
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
          minimum_price {
            discount {
              amount_off
              percent_off
            }
            final_price {
              currency
              value
            }
            regular_price {
              currency
              value
            }
          }
        }
        productPath
        imageUrl
        sku
        uid
        stock_status
        bundle_selected_options
        data_layer {
          country
          currency
          value
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
      title
      category_info {
        uid
        position
        name
        urlKey
        iconUrl
        pathKey
        catDescp
        imageUrl
        mobImageUrl
      }
      count
    }
  }
`;