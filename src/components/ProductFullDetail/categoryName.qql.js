import { gql } from '@apollo/client';

export const GET_CATEGORY_NAME = gql`
  query GetParentCategoryBySku($sku: String!) {
    getParentCategoryBySku(sku: $sku) {
      catDescp
      iconUrl
      uid
      imageUrl
      name
      pathKey
      position
      urlKey
    }
  }
`;