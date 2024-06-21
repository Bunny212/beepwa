import { gql } from '@apollo/client';

export const GET_BEESLINE_COUNTRIES = gql`
  query BeeslineCountries {
    beeslineCountries {
      countries {
        country_code
        country_name
        url
        position
        status,
        languages {
          code
          label
        }
      }
      default_country_code
      default_country_name
    }
  }
`;