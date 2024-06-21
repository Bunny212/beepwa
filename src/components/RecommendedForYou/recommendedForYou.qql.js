import { gql } from '@apollo/client';

export const GET_RECOMMENDED_FOR_YOU_DATA = gql`
  query GetHomeRecommendedForYou {
    getHomeRecommendedForYou {
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