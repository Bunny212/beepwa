import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GTM_PURCHASE_DATA } from './talons/gtmPurchaseData.qql.js';
import { sendPurchaseEvent } from '../App/GTMEvents.js';

function useGtmPurchaseData(increment_id) {
    //console.log("Datalayer increment_id = ", increment_id);

    const { loading, error, data, refetch } = useQuery(GET_GTM_PURCHASE_DATA, {
        variables: {
            incrementId: increment_id
        },
        skip: !increment_id // Skip query if increment_id is empty or falsy
    });

    useEffect(() => {
        // Handle the data returned by the query after refetching
        if (!loading && !error && data) {
            // Access the data here and perform any necessary actions
            if (data && data.getGtmPurchaseData) {
                const gtmPurchaseData = {
                    transaction_id: data.getGtmPurchaseData.increment_id,
                    coupon: data.getGtmPurchaseData.coupon_code,
                    discount: data.getGtmPurchaseData.discount_amount,
                    currency: data.getGtmPurchaseData.order_currency,
                    shipping: data.getGtmPurchaseData.shipping_amount,
                    tax: data.getGtmPurchaseData.tax,
                    value: data.getGtmPurchaseData.grand_total,
                    country: data.getGtmPurchaseData.country,
                    items: data.getGtmPurchaseData.order_items.map((item, index) => ({
                        index: index + 1, // Index starts from 1
                        item_id: item.uid,
                        quantity: item.quantity,
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
                //console.log("Datalayer gtmPurchaseData = ", gtmPurchaseData);
                sendPurchaseEvent(gtmPurchaseData);
            }
        }
    }, [data]);

    return null;
}

export default useGtmPurchaseData;
