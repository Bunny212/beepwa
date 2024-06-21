import { gql } from '@apollo/client';

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories($categoryId: String!, $all: String!) {
    getAllCategories(categoryId: $categoryId, all: $all) {
      categories {
        catDescp
        uid
        imageUrl
        position
        mobImageUrl
        iconUrl
        name
        pathKey
      subcategories {
        catDescp
        position
        uid
        imageUrl
        mobImageUrl
        iconUrl
        name
        pathKey
        subcategories {
          catDescp
          position
          name
          uid
          imageUrl
          mobImageUrl
          iconUrl
          pathKey
          urlKey
        }
        urlKey
      }
      urlKey
    }
    catDescp
    imageUrl
    mobImageUrl
    pathKey
    uid
    }
  }
`;