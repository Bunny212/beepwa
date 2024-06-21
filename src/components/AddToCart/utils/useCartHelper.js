import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import debounce from 'lodash.debounce';
import { useToastMessages } from './useToastMessages';
import { useCart } from 'react-use-cart';
import { useQuery, InMemoryCache } from '@apollo/client';
import { GET_CART_DETAILS_QUERY } from '../addToCart.qql';

/*const ADD_TO_CART = gql`
  mutation AddProductToCart($cartId: String!, $product: CartItemInput!) {
    addProductsToCart(cartId: $cartId, cartItems: [$product]) {
      cart {
        id
        items {
            uid
            product {
                uid
                sku
            }
        }
        total_quantity
      }
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation RemoveItemFromCart($cartId: String!, $itemId: ID!) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_uid: $itemId }) {
      cart {
        id
        total_quantity
      }
    }
  }
`;

const UPDATE_IN_CART = gql`
  mutation UpdateCartItems($cartId: String!, $itemId: ID!, $quantity: Float!) {
    updateCartItems(input: {
            cart_id: $cartId
            cart_items: [{ cart_item_uid: $itemId, quantity: $quantity }]
        }) {
      cart {
        id
        total_quantity
      }
    }
  }
`;*/

export const useCartHelper = () => {
    const {
        items
    } = useCart();
    const [showNotification, setShowNotification] = useState(false);
    const [severity, setSeverity] = useState('success');
    const [message, setMessage] = useState('');
    const { TOAST_MESSAGES } = useToastMessages();

    const handleCloseNotification = () => {
        setShowNotification(false);
    };

    const handleShowNotification = (severity, message) => {
        setSeverity(severity);
        setMessage(message);
        setShowNotification(true);
    };

 
    const debouncedHandleShowNotification = debounce(handleShowNotification, 500); // Adjust the delay as needed

    const handleItemAdd = (item) => {
        debouncedHandleShowNotification("success", TOAST_MESSAGES.success);
    };

    const handleItemUpdated = (item) => {
        debouncedHandleShowNotification("info", TOAST_MESSAGES.info);
    };
    
    const handleItemRemoved = () => {
        debouncedHandleShowNotification("warning", TOAST_MESSAGES.warning);
    };

    return {
        showNotification,
        severity,
        message,
        handleCloseNotification,
        handleItemAdd,
        handleItemUpdated,
        handleItemRemoved
    };

}