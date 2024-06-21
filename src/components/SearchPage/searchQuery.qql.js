import { gql } from '@apollo/client';

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts(
    $searchQuery: String!
    $pageSize: Int!
    $currentPage: Int!
  ) {
    products(
      search: $searchQuery
      filter: {}
      pageSize: $pageSize
      currentPage: $currentPage
      sort: {}
    ) {
      items {
        canonical_url
        categories {
          name
          uid
        }
        country_of_manufacture
        description {
          html
        }
        image {
          label
          position
          url
        }
        media_gallery {
          label
          position
          url
        }
        meta_description
        meta_keyword
        meta_title
        name
        new_from_date
        new_to_date
        only_x_left_in_stock
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
        short_description {
          html
        }
        sku
        special_price
        special_to_date
        stock_status
        swatch_image
        uid
        url_key
      }
      page_info {
        current_page
        page_size
        total_pages
      }
      total_count
    }
  }
`;
