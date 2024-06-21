import React, { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_STORE_CONFIG = gql`
    query storeConfigData {
        storeConfig {
            store_code
            beesline_default_country {
                default_country_code
                default_country_name
                default_country_calling_code
            }
        }
    }
`;

export const GetDefautlCountryData = () => {
    const [storeConfig, setStoreConfig] = useState(null);
    const { data, loading, error } = useQuery(GET_STORE_CONFIG);

    useEffect(() => {
        if (data && data.storeConfig) {
            setStoreConfig(data.storeConfig);
        }
    }, [data]); // Include 'data' in the dependency array

    const memoizedStoreConfig = useMemo(() => storeConfig, [storeConfig]);

    return {
        loading,
        error,
        storeConfig: memoizedStoreConfig,
    };
};
