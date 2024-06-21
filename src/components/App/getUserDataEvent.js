import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useUserContext } from '@magento/peregrine/lib/context/user';

const GET_USER_DATA = gql`
    query GetUserData($email: String) {
        getUserData(email: $email) {
            id
            firstname
            lastname
            fullname
            email
            phone
            address {
                address_summary
                address1
                city
                zipcode
                country
                country_id
                region
            }
            hash_email
            hash_phone
            country
        }
    }
`;

export const GetUserDataEvent = () => {
    const [gtmUserData, gtmSetUserData] = useState(null);

    const [
        { isSignedIn: isUserSignedIn, currentUser },
        { signOut }
    ] = useUserContext();

    const { data, loading, error } = useQuery(GET_USER_DATA,{
        variables: {
            email: currentUser.email,
        },
    });

    useEffect(() => {
        if (data && data.getUserData) {
            gtmSetUserData(data.getUserData);
        }
    }, [data]); // Include 'data' in the dependency array

    const memoizedGTMUserData = useMemo(() => gtmUserData, [gtmUserData]);

    return {
        loading,
        error,
        gtmUserData: memoizedGTMUserData,
    };
};
