// File: src/queries/getCountryList.qql.js
import { gql } from '@apollo/client';

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      id
      full_name_locale
      three_letter_abbreviation
      two_letter_abbreviation
      available_regions {
        code
        id
        name
        cities {
          id
          name
          code
        }
      }
    }
  }
`;
