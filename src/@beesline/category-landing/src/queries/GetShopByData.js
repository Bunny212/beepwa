import { gql } from '@apollo/client';

export const GET_CATEGORY_SHOP_BY_DATA = gql`
  query GetCategoryShopByTabs {
    getCategoryShopByTabs {
      items {
        category_id
        concern_id
        position
        title
      }
      viewallcat_id
    }
  }
`;
