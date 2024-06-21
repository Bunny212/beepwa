import { useCallback, useRef, useState, useMemo } from 'react';
import { useApolloClient, useMutation } from '@apollo/client';

import { useGoogleReCaptcha } from '@magento/peregrine/lib/hooks/useGoogleReCaptcha/useGoogleReCaptcha';
import mergeOperations from '@magento/peregrine/lib/util/shallowMerge';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import { useAwaitQuery } from '@magento/peregrine/lib/hooks/useAwaitQuery';
import { retrieveCartId } from '@magento/peregrine/lib/store/actions/cart';

import DEFAULT_OPERATIONS from './signIn.gql';
import { useEventingContext } from '@magento/peregrine/lib/context/eventing';

export const useSignIn = props => {
    const {
        getCartDetailsQuery,
        setDefaultUsername,
        showCreateAccount,
        showForgotPassword
    } = props;

    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations);
    const {
        createCartMutation,
        getCustomerQuery,
        mergeCartsMutation,
        signInMutation,
        signEmailInMutation
    } = operations;

    const apolloClient = useApolloClient();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const [
        { cartId },
        { createCart, removeCart, getCartDetails }
    ] = useCartContext();

    const [
        { isGettingDetails, getDetailsError },
        { getUserDetails, setToken }
    ] = useUserContext();

    const [, { dispatch }] = useEventingContext();

    const [signIn, { error: signInError }] = useMutation(signInMutation, {
        fetchPolicy: 'no-cache'
    });

    const [signInEmail, { error: signInEmailError }] = useMutation(signEmailInMutation, {
        fetchPolicy: 'no-cache'
    });

    const {
        generateReCaptchaData,
        recaptchaLoading,
        recaptchaWidgetProps
    } = useGoogleReCaptcha({
        currentForm: 'CUSTOMER_LOGIN',
        formAction: 'signIn'
    });

    const [fetchCartId] = useMutation(createCartMutation);
    const [mergeCarts] = useMutation(mergeCartsMutation);
    const fetchUserDetails = useAwaitQuery(getCustomerQuery);
    const fetchCartDetails = useAwaitQuery(getCartDetailsQuery);

    const formApiRef = useRef(null);
    const setFormApi = useCallback(api => (formApiRef.current = api), []);

    const handleSubmit = useCallback(
        //async ({ mobile }) => {
        async (mobile) => {
            setIsSigningIn(true);
            try {
                // Get source cart id (guest cart id).
                const sourceCartId = cartId;

                // Get recaptchaV3 data for login
                const recaptchaData = await generateReCaptchaData();

                // Sign in and set the token.
                const signInResponse = await signIn({
                    variables: {
                        mobile
                    },
                    ...recaptchaData
                });
                const token = signInResponse.data.generateCustomerTokenV2.token;
                await setToken(token);

                // Clear all cart/customer data from cache and redux.
                await apolloClient.clearCacheData(apolloClient, 'cart');
                await apolloClient.clearCacheData(apolloClient, 'customer');
                await removeCart();

                // Create and get the customer's cart id.
                await createCart({
                    fetchCartId
                });
                const destinationCartId = await retrieveCartId();

                const diffCartId = destinationCartId !== sourceCartId;
                if(diffCartId) {
                    // Merge the guest cart into the customer cart.
                    await mergeCarts({
                        variables: {
                            destinationCartId,
                            sourceCartId
                        }
                    });
                }

                // Ensure old stores are updated with any new data.

                await getUserDetails({ fetchUserDetails });

                const { data } = await fetchUserDetails({
                    fetchPolicy: 'cache-only'
                });

                dispatch({
                    type: 'USER_SIGN_IN',
                    payload: {
                        ...data.customer
                    }
                });

                getCartDetails({ fetchCartId, fetchCartDetails });
                setIsSigningIn(false);
                return true;
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }

                setIsSigningIn(false);
                return false;
            }
        },
        [
            cartId,
            generateReCaptchaData,
            signIn,
            setToken,
            apolloClient,
            removeCart,
            createCart,
            fetchCartId,
            mergeCarts,
            getUserDetails,
            fetchUserDetails,
            getCartDetails,
            fetchCartDetails,
            dispatch
        ]
    );

    const handleSubmitEmail = useCallback(
        //async ({ mobile }) => {
        async (email) => {
            setIsSigningIn(true);
            try {
                // Get source cart id (guest cart id).
                const sourceCartId = cartId;

                // Get recaptchaV3 data for login
                const recaptchaData = await generateReCaptchaData();

                // Sign in and set the token.
                const signInEmailResponse = await signInEmail({
                    variables: {
                        email
                    },
                    ...recaptchaData
                });
                const token = signInEmailResponse.data.generateCustomerEmailTokenV2.token;
                await setToken(token);

                // Clear all cart/customer data from cache and redux.
                await apolloClient.clearCacheData(apolloClient, 'cart');
                await apolloClient.clearCacheData(apolloClient, 'customer');
                await removeCart();

                // Create and get the customer's cart id.
                await createCart({
                    fetchCartId
                });
                const destinationCartId = await retrieveCartId();

                // Merge the guest cart into the customer cart.
                await mergeCarts({
                    variables: {
                        destinationCartId,
                        sourceCartId
                    }
                });

                // Ensure old stores are updated with any new data.

                await getUserDetails({ fetchUserDetails });

                const { data } = await fetchUserDetails({
                    fetchPolicy: 'cache-only'
                });

                dispatch({
                    type: 'USER_SIGN_IN',
                    payload: {
                        ...data.customer
                    }
                });

                getCartDetails({ fetchCartId, fetchCartDetails });
                setIsSigningIn(false);
                return true;
            } catch (error) {
                if (process.env.NODE_ENV !== 'production') {
                    console.error(error);
                }

                setIsSigningIn(false);
                return false;
            }
        },
        [
            cartId,
            generateReCaptchaData,
            signInEmail,
            setToken,
            apolloClient,
            removeCart,
            createCart,
            fetchCartId,
            mergeCarts,
            getUserDetails,
            fetchUserDetails,
            getCartDetails,
            fetchCartDetails,
            dispatch
        ]
    );

    const handleForgotPassword = useCallback(() => {
        const { current: formApi } = formApiRef;

        if (formApi) {
            setDefaultUsername(formApi.getValue('email'));
        }

        showForgotPassword();
    }, [setDefaultUsername, showForgotPassword]);

    const handleCreateAccount = useCallback(() => {
        const { current: formApi } = formApiRef;

        if (formApi) {
            setDefaultUsername(formApi.getValue('email'));
        }

        showCreateAccount();
    }, [setDefaultUsername, showCreateAccount]);

    const handleEnterKeyPress = useCallback(() => {
        event => {
            if (event.key === 'Enter') {
                handleCreateAccount();
            }
        };
    }, [handleCreateAccount]);

    const errors = useMemo(
        () =>
            new Map([
                ['getUserDetailsQuery', getDetailsError],
                ['signInMutation', signInError],
                ['signEmailInMutation', signInEmailError]
            ]),
        [getDetailsError, signInError, signInEmailError]
    );

    return {
        errors,
        handleCreateAccount,
        handleEnterKeyPress,
        handleForgotPassword,
        handleSubmit,
        handleSubmitEmail,
        isBusy: isGettingDetails || isSigningIn || recaptchaLoading,
        setFormApi,
        recaptchaWidgetProps
    };
};
