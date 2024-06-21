import { gql } from '@apollo/client';

export const GET_CATEGORY_QUICK_ACCESS_DATA = gql`
  query GetCategoryQuickAccessTabs {
    getCategoryQuickAccessTabs {
        description
        iconUrl
        imageUrl
        items {
            imageUrl
            name
            originalPrice
            price
            productPath
            sku
        }
        position
        template
        title
    }
  }
`;
