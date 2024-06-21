import { gql } from '@apollo/client';

export const GET_TICKER_MEWS_DATA = gql`
  query GetTickerNews {
      getTickerNews {
        id
        value
      }
  }
`;
