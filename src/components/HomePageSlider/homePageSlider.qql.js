import { gql } from '@apollo/client';

export const GET_SLIDER_DATA = gql`
  query GetSliderData($id: Int!) {
    getSliderData(id: $id) {
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
        category_urlkey
        category_name
        category_descp
        category_img
        category_mob_img
    }
  }
`;
