import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories($categoryId: String!, $all: String!) {
    getAllCategories(categoryId: $categoryId, all: $all) {
      id
      name
      pathKey
      urlKey
      catDescp
      imageUrl
      subcategories {
        id
        name
        pathKey
        urlKey
        catDescp
        imageUrl
      }
    }
  }
`;
