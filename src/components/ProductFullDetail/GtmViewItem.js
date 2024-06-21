import React, { useMemo, useEffect } from "react";
import { useQuery } from '@apollo/client';
import { sendViewItemEvent } from '../App/GTMEvents';
import { GET_GTM_VIEW_ITEM } from './gtmViewItem.qql.js';

const OUT_OF_STOCK_CODE = 'OUT_OF_STOCK';
const IN_STOCK_CODE = 'IN_STOCK';

const GtmViewItem = ({ sku }) => {
    // Check if the sku is valid
    if (!sku) {
        return null; // Returning null or an empty fragment is more appropriate than an empty string
    }

    // Here, you can place your logic to fetch and display content based on the query result or other conditions.
    // You might use the useQuery hook to fetch data and then render the data accordingly.
    const { loading, error, data } = useQuery(GET_GTM_VIEW_ITEM, {
        variables: {
            sku: sku
        }
    });

    useEffect(() => {
        if (data && data.getGtmViewItem) {
            const gtmViewItem = {
                currency: data.getGtmViewItem.currency,
                country: data.getGtmViewItem.country,
                value: data.getGtmViewItem.value,
                items: data.getGtmViewItem.items.map((item, index) => ({
                    index: index + 1, // Index starts from 1
                    item_id: item.uid,
                    quantity: item.stock_status === OUT_OF_STOCK_CODE ? 0 : 1, // Assuming quantity is always 1
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
            sendViewItemEvent(gtmViewItem);
        }
    }, [data]);

    return null;
};

export default GtmViewItem;
