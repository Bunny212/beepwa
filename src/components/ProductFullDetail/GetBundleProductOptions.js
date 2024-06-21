import React, { useMemo } from "react";
import { useQuery } from '@apollo/client';
import { GET_BUNDLE_PRODUCT_OPTIONS } from './getBundleProductOptions.qql.js';


const GetBundleProductOptions = ({ sku, setBundleProductOptions }) => {
    // Check if the sku is valid
    if (!sku) {
        return null; // Returning null or an empty fragment is more appropriate than an empty string
    }

    // Here, you can place your logic to fetch and display content based on the query result or other conditions.
    // You might use the useQuery hook to fetch data and then render the data accordingly.

    const { loading, error, data } = useQuery(GET_BUNDLE_PRODUCT_OPTIONS, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: {
            sku: sku
        }
    });

    const getBundleProductOptions = useMemo(() => {
        if (data && data.getBundleProductOptions) {
            const options = data.getBundleProductOptions;
            setBundleProductOptions(options);
        }
        return null;
    }, [data]);

    if (!getBundleProductOptions || !getBundleProductOptions.length === 0) {
        return null;
    }

    return getBundleProductOptions;
};

export default GetBundleProductOptions;
