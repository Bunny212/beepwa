import { gql } from '@apollo/client';

export const GET_HOM_SLIDER_DATA = gql`
  query GetHomSliderData($id: Int!) {
    getHomSliderData(id: $id) {
        banner_badge
        banner_id
        image
        image_mob
        name
        status
        sub_title
        title
        url_banner
        url_banner_type
        product_link
        category_link
        category_name
        category_descp
        item {
          id
          name
          price
          imageUrl
          name
          originalPrice
          price
          productPath
          sku
        }
    }
  }
`;