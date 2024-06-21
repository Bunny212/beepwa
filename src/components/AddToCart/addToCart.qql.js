import { gql } from '@apollo/client';

export const GET_CART_DETAILS_QUERY = gql`
    query getCartDetails($cartId: String!) {
        cart(cart_id: $cartId) {
            id
            is_virtual
            items {
                errors {
                    code
                    message
                }
                product {
                    sku
                    uid
                }
                quantity
                uid
            }
            total_quantity
        }
    }
`;