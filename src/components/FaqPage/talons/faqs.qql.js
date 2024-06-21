import { gql } from '@apollo/client';

export const GET_FAQS = gql`
  query GetFaqs {
    getFaqs {
        category_id
        identifier
        is_active
        position
        title
    }
  }
`;
