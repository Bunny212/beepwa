import { gql } from '@apollo/client';

export const CustomerAddressBookAddressFragment = gql`
    fragment CustomerAddressBookAddressFragment on CustomerAddress {
        __typename
        id
        country_code
        default_billing
        default_shipping
        firstname
        lastname
        street
        city
        region {
            region
            region_code
            region_id
        }
        postcode
        telephone
        bee_building_name
        bee_apartment_nb
        bee_address_nickname
        bee_nickname
        bee_address_notes
        bee_address_type
        bee_floor
        bee_coordinates
        custom_attributes {
            attribute_code
            value
        }
    }
`;
