import { gql } from '@apollo/client';

export const GET_PRODUCTS_LIST_BY_CATEGORY = gql`
  query GetProductsListByCategory($categoryId: String!, $offset: String!, $limit: String!) {
    getProductsListByCategory(categoryId: $categoryId, offset: $offset, limit: $limit) {
      id
      name
    }
  }
`;
