import { gql } from '@apollo/client';

export const GET_CATEGORY_QUICK_ACCESS_DATA = gql`
  query GetCategoryQuickAccessTabs {
    getCategoryQuickAccessTabs {
        category_uid
        description
        iconUrl
        imageUrl
        mobImageUrl
        category_urlkey
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
        }
        position
        template
        title
    }
  }
`;
