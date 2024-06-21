// File: src/components/FreeGiftComponent/index.js

import React from 'react';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';
import { useFreeGift } from '../../talons/useFreeGift';

const FreeGiftComponent = () => {
  const [{ cartId }] = useCartContext();
  console.log("-->>> cartId = ", cartId);
  const [{ dispatch }] = useEventingContext();
  const { isFreeGiftAdded } = useFreeGift(cartId);
  
  return (
    <div>
      <h2>Free Gift Component</h2>
      <p>Is Free Gift Added: {isFreeGiftAdded ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default FreeGiftComponent;
