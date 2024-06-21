import { gql } from '@apollo/client';

export const GET_TABS1_DATA = gql`
  query GetTabs1 {
    getTabs1 {
      items {
        id
        name
        price
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
      }
      title
    }
  }
`;

export const GET_TOP_SEARCHES = gql`
  query TopSearches {
    topSearches {
        label
        position
    }
  }
`;