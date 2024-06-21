import { gql } from '@apollo/client';

export const GET_CATEGORY_PRODUCTS_DATA = gql`
  query GetCategoryProducts($uid: String,) {
    getCategoryProducts(uid: $uid) {
      items {
        id
        name
        price
        product_type
        label
        sale_type
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
      count
      section_title
      sub_category_uid
      show_tabs
      sale_category_uid
      country
      currency
      brand
      category_info {
        catDescp
        iconUrl
        imageUrl
        mobImageUrl
        name
        pathKey
        position
        uid
        urlKey
      }
    }
  }
`;
