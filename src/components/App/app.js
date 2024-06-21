import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useIntl, IntlProvider } from 'react-intl';
import { useLocation } from "react-router-dom";
import { array, func, shape, string } from 'prop-types';
import { useToasts } from '@magento/peregrine';
import { useDelayedTransition } from '@magento/peregrine/lib/hooks/useDelayedTransition';
import { useApp } from '@magento/peregrine/lib/talons/App/useApp';
import { availableRoutes } from '@magento/venia-ui/lib/components/Routes/routes';
import { useStoreSwitcher } from '../Header/talons/useStoreSwitcher';
import globalCSS from '@magento/venia-ui/lib/index.module.css';
import { HeadProvider, StoreTitle } from '@magento/venia-ui/lib/components/Head';
import Main from '../Main';
import Mask from '@magento/venia-ui/lib/components/Mask';
import Navigation from '@magento/venia-ui/lib/components/Navigation';
import Routes from '@magento/venia-ui/lib/components/Routes';
import ToastContainer from '@magento/venia-ui/lib/components/ToastContainer';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { ThemeProvider } from '@mui/material/styles';
import beeTheme from '../../theme';
import { CartProvider } from "react-use-cart";
import CustomSnackbar from '../CustomSnackbar/CustomSnackbar';
import { generateUniqueCartId } from '../AddToCart/utils/cartUtils';
import { useCartHelper } from '../AddToCart/utils/useCartHelper';
import { useCart } from "react-use-cart";
import { BrowserPersistence } from '@magento/peregrine/lib/util';
import { useQuery, InMemoryCache } from '@apollo/client';
import { GET_CART_DETAILS_QUERY } from '../AddToCart/addToCart.qql';
import { analytics } from './GoogleTagManager';

const storage = new BrowserPersistence();

import {
    AlertCircle as AlertCircleIcon,
    CloudOff as CloudOffIcon,
    Wifi as WifiIcon
} from 'react-feather';

const cache = new InMemoryCache({
    typePolicies: {
        SimpleProduct: {
            keyFields: ['uid'], // Use 'uid' as the cache key for SimpleProduct
        },
    },
});

const OnlineIcon = <Icon src={WifiIcon} attrs={{ width: 18 }} />;
const OfflineIcon = <Icon src={CloudOffIcon} attrs={{ width: 18 }} />;
const ErrorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;


const App = props => {
    const { markErrorHandled, renderError, unhandledErrors } = props;
    const { formatMessage } = useIntl();
    const location = useLocation();
    const { search } = useLocation();
    const {
        showNotification,
        severity,
        message,
        handleCloseNotification,
        handleItemAdd,
        handleItemUpdated,
        handleItemRemoved
    } = useCartHelper();

    window.dataLayer = window.dataLayer || [];

    // const { data } = useQuery(GET_CART_DETAILS_QUERY, {
    //     variables: {
    //         cartId: cartId,
    //     },
    //     cache
    // });
    // console.log("**** Data = ", data);
    // const {
    //     items,
    //     removeItem,
    // } = useCart();

    // useEffect(() => {
    //     if (data) {
    //         // Check if the product is in the cart based on SKU
    //         const cart = items;
    //         if (cart?.items?.length > 0) {
    //             const productInCart = cart.items.find(item => item.product.id === product.id);
    //         }
    //     }
    // }, [data]);

    const urlParams = new URLSearchParams(search);
    const languageParam = urlParams.get('lng');
    const directionValue = storage.getItem('store_view_direction');
    const { handleSwitchStoreWithoutLoad: originalHandleSwitchStoreWithoutLoad } = useStoreSwitcher({ availableRoutes });
    // Memoize the handleSwitchStoreWithoutLoad function
    const handleSwitchStoreWithoutLoad = useMemo(
        () => originalHandleSwitchStoreWithoutLoad,
        [originalHandleSwitchStoreWithoutLoad]
    );
    const direction = useMemo(
        () => directionValue,
        [directionValue]
    );

    useEffect(() => {
        if (languageParam) {
          const splitLang = languageParam.split('_')[1];
          const isRTL = splitLang === 'ar';
          const direction = isRTL ? 'rtl' : 'ltr';
          document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
          // Use the memoized handleSwitchStoreWithoutLoad
          handleSwitchStoreWithoutLoad(languageParam, direction);
        }
    }, [languageParam, handleSwitchStoreWithoutLoad]);

    useEffect(() => {
        if(direction) {
            document.documentElement.dir = direction ? 'rtl' : 'ltr';
        }
    }, [direction]);

    useEffect(() => {
        analytics(window, document, 'script', 'dataLayer', 'N2993Q');
    },[]);

    const [, { addToast }] = useToasts();
    useDelayedTransition();

    const ERROR_MESSAGE = formatMessage({
        id: 'app.errorUnexpected',
        defaultMessage: 'Sorry! An unexpected error occurred.'
    });

    const handleIsOffline = useCallback(() => {
        addToast({
            type: 'error',
            icon: OfflineIcon,
            message: formatMessage({
                id: 'app.errorOffline',
                defaultMessage:
                    'You are offline. Some features may be unavailable.'
            }),
            timeout: 3000
        });
    }, [addToast, formatMessage]);

    const handleIsOnline = useCallback(() => {
        addToast({
            type: 'info',
            icon: OnlineIcon,
            message: formatMessage({
                id: 'app.infoOnline',
                defaultMessage: 'You are online.'
            }),
            timeout: 3000
        });
    }, [addToast, formatMessage]);

    const handleError = useCallback(
        (error, id, loc, handleDismissError) => {
            const errorToastProps = {
                icon: ErrorIcon,
                message: `${ERROR_MESSAGE}\nDebug: ${id} ${loc}`,
                onDismiss: remove => {
                    handleDismissError();
                    remove();
                },
                timeout: 15000,
                type: 'error'
            };

            addToast(errorToastProps);
        },
        [ERROR_MESSAGE, addToast]
    );

    const talonProps = useApp({
        handleError,
        handleIsOffline,
        handleIsOnline,
        markErrorHandled,
        renderError,
        unhandledErrors
    });

    const { hasOverlay, handleCloseDrawer } = talonProps;

    // Use a consistent cartId for the user session
    const randomCartId = useMemo(() => {
        // Replace this logic with your own cartId generation
        // For example, you might want to store it in a cookie or session storage
        const storedCartId = localStorage.getItem('user_cart_id');
        if (storedCartId) {
            return storedCartId;
        } else {
            const newCartId = generateUniqueCartId(); // Implement this function
            localStorage.setItem('user_cart_id', newCartId);
            return newCartId;
        }
    }, []);

    if (renderError) {
        return (
            <HeadProvider>
                <StoreTitle />
                <Main isMasked={true} />
                <Mask isActive={true} />
                <ToastContainer />
            </HeadProvider>
        );
    }

    return (
        <HeadProvider>
            <CartProvider
                id={randomCartId}
                onItemAdd={handleItemAdd}
                onItemUpdate={handleItemUpdated}
                onItemRemove={handleItemRemoved}
            >
                <ThemeProvider theme={beeTheme}>
                    <StoreTitle />
                    <Main isMasked={hasOverlay}>
                        <Routes />
                    </Main>
                    <Mask
                        isActive={hasOverlay}
                        dismiss={handleCloseDrawer}
                        data-cy="App-Mask-button"
                    />
                    <Navigation />
                    <ToastContainer />
                    <CustomSnackbar
                        open={showNotification}
                        autoHideDuration={2000}
                        onClose={handleCloseNotification}
                        severity={severity}
                        message={message}
                        vertical='top'
                    />
                    {/* Noscript iframe for GTM */}
                    <noscript>
                        <iframe src="https://load.ss.beesline.com/ns.html?id=GTM-N2993Q" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
                    </noscript>
                </ThemeProvider>
            </CartProvider>
        </HeadProvider>
    );
};

App.propTypes = {
    markErrorHandled: func.isRequired,
    renderError: shape({
        stack: string
    }),
    unhandledErrors: array
};

App.globalCSS = globalCSS;

export default App;
