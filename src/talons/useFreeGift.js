// File: src/talons/useFreeGift.js
import { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useFreeGiftContext } from '../context/FreeGiftContext';
import cart from '@magento/peregrine/lib/context/cart';
import { useCart } from './useCart';
import { GET_CART_DETAILS_QUERY } from '../graphql/getCartDetails.qql';
import { useQuery, InMemoryCache } from '@apollo/client';

const cache = new InMemoryCache({
  typePolicies: {
      SimpleProduct: {
          keyFields: ['uid'], // Use 'uid' as the cache key for SimpleProduct
      },
  },
});

export const useFreeGift = (cartId) => {
  const { addProductToCart, removeProductFromCart } = useCart();
  const { state } = useFreeGiftContext();

  const { data } = useQuery(GET_CART_DETAILS_QUERY, {
    variables: {
        cartId: cartId,
    },
    cache
});

  const handleAddToCart = () => {
    // Replace the following with your actual product data and input structure
    const input = {
      sku: '801388',
      quantity: 1,
    };

    addProductToCart(cartId, input);
  };

  const handleRemoveFromCart = () => {
    removeProductFromCart(itemId);
  };


  useEffect(() => {
    const handleFreeGiftLogic = async () => {
      // if (state.isFreeGiftAdded) {

      //   const freeGiftPayload = {
      //     cartId,
      //     sku: '801388', // Replace with the actual SKU of your free gift product
      //     name: 'Scratch and Win', // Replace with the name of your free gift product
      //     priceTotal: 0, // Set the price of the free gift
      //     currencyCode: 'LBP', // Replace with the currency code of your store
      //     discountAmount: 0, // Set the discount amount of the free gift
      //     selectedOptions: {}, // Add any selected options for the free gift if needed
      //     quantity: 1, // Set the quantity of the free gift
      //   };

      //   dispatch({
      //     type: 'CART_REMOVE_ITEM',
      //     payload: freeGiftPayload,
      //   });

      //   // Remove free gift
      //   //await removeFreeGift();
      //   console.log('Free gift removed from cart!');
      //   dispatch({ type: 'REMOVE_FREE_GIFT' });
      // } else {
        // Add free gift
        console.log("cart id === ", cartId);
        const freeGiftPayload = {
          cartId,
          sku: '801388', // Replace with the actual SKU of your free gift product
          name: 'Scratch and Win', // Replace with the name of your free gift product
          priceTotal: 0, // Set the price of the free gift
          currencyCode: 'LBP', // Replace with the currency code of your store
          discountAmount: 0, // Set the discount amount of the free gift
          selectedOptions: {}, // Add any selected options for the free gift if needed
          quantity: 1, // Set the quantity of the free gift
        };
        console.log("freeGiftPayload === ", freeGiftPayload);
        // dispatch({
        //   type: 'CART_ADD_ITEM',//'CART_UPDATE_ITEM', // or 'CART_ADD_FREE_GIFT' if you want a separate action
        //   payload: freeGiftPayload,
        // });

        handleAddToCart();
      //}
    };

    // Automatically check and add/remove free gift when the component is mounted
    handleFreeGiftLogic();
  }, [cartId, state.isFreeGiftAdded]);

  return {
    isFreeGiftAdded: state.isFreeGiftAdded,
  };
};
