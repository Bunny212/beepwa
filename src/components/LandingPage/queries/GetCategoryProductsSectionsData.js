import { gql } from '@apollo/client';

export const GET_CATEGORY_PRODUCTS_SECTIONS_DATA = gql`
  query GetCategoryProductsSections($uid: String,) {
    getCategoryProductsSections(uid: $uid) {
      items {
        id
        name
        price
        product_type
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
      }
      count
      section_title
      sub_category_uid
      category_urlkey
    }
  }
`;
