import { gql } from '@apollo/client';

export const GET_WHAT_IT_DOES_QUERY = gql`
  query Whatitdoes($sku: String!) {
    whatitdoes(sku: $sku) {
        iconUrl
        id
        status
        title
        translated_title
    }
  }
`;