// File: src/talons/useCart.js

import { useMutation } from '@apollo/client';
import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from '../graphql/mutations';

export const useCart = () => {
  const [addToCart] = useMutation(ADD_PRODUCT_TO_CART);
  const [removeFromCart] = useMutation(REMOVE_PRODUCT_FROM_CART);

  const addProductToCart = async (cartId, input) => {
    try {
        const variables = {
            cartId,
            product: input
        };
      const { data } = await addToCart({ variables });
      // Handle the response data as needed
      console.log('Product added to cart:', data.addToCart);
    } catch (error) {
      // Handle the error
      console.error('Error adding product to cart:', error);
    }
  };

  const removeProductFromCart = async (itemId) => {
    try {
        const variables = {
            cartId,
            itemId: itemId
        };
      const { data } = await removeFromCart({ variables });
      // Handle the response data as needed
      console.log('Product removed from cart:', data.removeFromCart);
    } catch (error) {
      // Handle the error
      console.error('Error removing product from cart:', error);
    }
  };

  return {
    addProductToCart,
    removeProductFromCart,
  };
};
