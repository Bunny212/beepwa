// File: src/queries/getCountryList.qql.js
import { gql } from '@apollo/client';

export const GET_CITIES = gql`
  query GetCitiesByState ($countryId: String, $stateId: Int) {
    getCitiesByState (countryId: $countryId, stateId: $stateId) {
      id
      name
      code
    }
  }
`;
