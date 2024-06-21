import { gql } from '@apollo/client';

export const GET_FEATURED_CATEGORIES = gql`
  query GetFeaturedCategories {
    getFeaturedCategories {
      id
      name
      pathKey
      urlKey
    }
  }
`;
