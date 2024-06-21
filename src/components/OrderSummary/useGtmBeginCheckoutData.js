import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GTM_VIEW_CART_ITEMS } from '../CartPage/gtmViewCartItems.qql.js';
import { sendBeginCheckoutEvent } from '../App/GTMEvents.js';

function useGtmData(products) {
    console.log("Begin checkout SKus cartItems = ", products);
    const [skus, setSkus] = useState([]);
    const [skusWithQty, setSkusWithQty] = useState([]);

    // Function to track previous value of a state/prop
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
        });
        return ref.current;
    }

    const { loading, error, data, refetch } = useQuery(GET_GTM_VIEW_CART_ITEMS, {
        variables: {
            skus: skus
        },
        skip: !skus // Skip query if skus is empty or falsy
    });

    function getQuantityBySku(skusWithQty, targetSku) {
        const product = skusWithQty.find(item => item.sku === targetSku);
        return product ? product.quantity : 0; // Assuming quantity is stored in the 'quantity' property
    }

    useEffect(() => {
        if (products) {
            const updatedSkus = products.map(item => item.product.sku);
            const updatedSkusWithQty = products.map(item => ({ 
                sku: item.product.sku,
                quantity: item.quantity  // Assuming 'quantity' is the property containing the quantity
            }));
            setSkus(updatedSkus);
            setSkusWithQty(updatedSkusWithQty);
            
        }
    }, [products]);

    useEffect(() => {
        if (skus.length > 0) {
            refetch(); // Refetch data when skus changes
        }
    }, [skus, refetch]);

    useEffect(() => {
        // Handle the data returned by the query after refetching
        if (!loading && !error && data) {
            // Access the data here and perform any necessary actions
            if (data && data.getGtmViewCartItems.items.length > 0) {
                const gtmBeginCheckoutItems = {
                    currency: data.getGtmViewCartItems.currency,
                    value: data.getGtmViewCartItems.value,
                    country: data.getGtmViewCartItems.country,
                    items: data.getGtmViewCartItems.items.map((item, index) => ({
                        index: index + 1, // Index starts from 1
                        item_id: item.uid,
                        quantity: getQuantityBySku(skusWithQty, item.sku), // Assuming quantity is always 1
                        price: item.price,
                        discount: Math.ceil(item.discount), // Assuming no discount for now
                        item_name: item.item_name,
                        // Assuming other item details are not available in the provided data
                        item_brand: item.item_brand,
                        item_category: item.item_category,
                        item_list_id: item.item_list_id,
                        item_list_name: item.item_list_name,
                        item_variant: ''
                    }))
                };
                //console.log("Datalayer gtmBeginCheckoutItems = ", gtmBeginCheckoutItems);
                sendBeginCheckoutEvent(gtmBeginCheckoutItems);
            }
        }
    }, [data]);

    return null;
}

export default useGtmData;
