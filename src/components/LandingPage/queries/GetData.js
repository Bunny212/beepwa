import { gql } from '@apollo/client';

export const GET_FEATURED_CATEGORIES = gql`
  query GetFeaturedCategories {
    getFeaturedCategories {
      uid
      name
      pathKey
      urlKey
    }
  }
`;
