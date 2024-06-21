import { gql } from '@apollo/client';

export const GET_FEATURED_CATEGORIES_DATA = gql`
  query GetFeaturedCategories {
    getFeaturedCategories {
      uid
      name
      urlKey
      pathKey
      iconUrl
      catDescp
      imageUrl
      mobImageUrl
    }
  }
`;