import { gql } from '@apollo/client';

export const GET_SUPPORT_FAQS = gql`
  query GetSupportFaqs {
    getSupportFaqs {
        category_id
        identifier
        is_active
        position
        title
    }
  }
`;
