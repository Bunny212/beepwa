import { gql } from '@apollo/client';

export const GET_CATEGORY_SHOP_BY_DATA = gql`
  query GetCategoryShopByTabs {
    getCategoryShopByTabs {
      items {
        category_uid
        concern_uid
        position
        title
        concern_url_key
      }
      viewallcat_id
      viewallcat_descp
      viewallcat_img
      viewallcat_mob_img
      viewallcat_urlkey
    }
  }
`;
