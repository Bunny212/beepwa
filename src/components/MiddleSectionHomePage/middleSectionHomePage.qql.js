import { gql } from '@apollo/client';

export const GET_MIDDLE_SECTION_DATA = gql`
  query GetMiddleSectionData {
    getMiddleSectionData {
      items {
        banner_badge
        banner_id
        category_descp
        category_link
        category_urlkey
        category_name
        image
        image_mob
        category_img
        category_mob_img
        item {
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
        name
        product_link
        status
        sub_title
        title
        url_banner
        url_banner_type
      }
      title
    }
  }
`;