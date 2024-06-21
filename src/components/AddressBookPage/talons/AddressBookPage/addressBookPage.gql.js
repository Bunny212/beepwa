import { gql } from '@apollo/client';

import { CustomerAddressBookAddressFragment } from './addressBookFragments.gql';

export const GET_CUSTOMER_ADDRESSES = gql`
    query GetCustomerAddressesForAddressBook {
        # eslint-disable-next-line @graphql-eslint/require-id-when-available
        customer {
            addresses {
                id
                ...CustomerAddressBookAddressFragment
            }
        }
        countries {
            id
            full_name_locale
        }
    }
    ${CustomerAddressBookAddressFragment}
`;

export const ADD_NEW_CUSTOMER_ADDRESS = gql`
    mutation AddNewCustomerAddressToAddressBook(
        $address: CustomerAddressInput!
    ) {
        createCustomerAddress(input: $address) {
            # We don't manually write to the cache to update the collection
            # after adding a new address so there's no need to query for a bunch
            # of address fields here. We use refetchQueries to refresh the list.
            id
        }
    }
`;

export const UPDATE_CUSTOMER_ADDRESS = gql`
    mutation UpdateCustomerAddressInAddressBook(
        $addressId: Int!
        $updated_address: CustomerAddressInput!
    ) {
        updateCustomerAddress(id: $addressId, input: $updated_address) {
            id
            ...CustomerAddressBookAddressFragment
        }
    }
    ${CustomerAddressBookAddressFragment}
`;

export const SET_CUSTOMER_BILLING_ADDRESS_ON_CART = gql`
    mutation SetCustomerBillingAddressOnCart($cartId: String!) {
        setBillingAddressOnCart(
            input: {
                cart_id: $cartId
                billing_address: {
                    same_as_shipping: true
                }
            }
        ) @connection(key: "setBillingAddressOnCart") {
            cart {
                id
            }
        }
    }
`;

export const SET_CUSTOMER_ADDRESS_ON_CART = gql`
    mutation SetCustomerAddressOnCart($cartId: String!, $address: CartAddressInput!) {
        setShippingAddressesOnCart(
            input: {
                cart_id: $cartId
                shipping_addresses: [{ address: $address}]
            }
        ) @connection(key: "setShippingAddressesOnCart") {
            cart {
                id
            }
        }
    }
`;

export const DELETE_CUSTOMER_ADDRESS = gql`
    mutation DeleteCustomerAddressFromAddressBook($addressId: Int!) {
        deleteCustomerAddress(id: $addressId)
    }
`;

export default {
    createCustomerAddressMutation: ADD_NEW_CUSTOMER_ADDRESS,
    deleteCustomerAddressMutation: DELETE_CUSTOMER_ADDRESS,
    getCustomerAddressesQuery: GET_CUSTOMER_ADDRESSES,
    updateCustomerAddressMutation: UPDATE_CUSTOMER_ADDRESS
};
