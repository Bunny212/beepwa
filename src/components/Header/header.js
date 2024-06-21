import React, { Fragment, Suspense, useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useAccountInformationPage } from '@magento/peregrine/lib/talons/AccountInformationPage/useAccountInformationPage';
import AccountInformationPageOperations from '@magento/venia-ui/lib/components/AccountInformationPage/accountInformationPage.gql.js';

import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';
import StoreSwitcher from './storeSwitcher';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './header.module.css';
import { useIntl } from 'react-intl';
import Badge from '@mui/material/Badge';
import TickerNews from '../TickerNews';
import { styled } from '@mui/material/styles';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import DesktopHeader from './desktopHeader';
import MobileHeader from './mobileHeader';
import { useQuery, InMemoryCache } from '@apollo/client';
import { GET_CART_DETAILS_QUERY } from '../AddToCart/addToCart.qql';
import { useCart } from 'react-use-cart';
import { remove } from 'lodash';

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const cache = new InMemoryCache({
    typePolicies: {
        SimpleProduct: {
            keyFields: ['uid'], // Use 'uid' as the cache key for SimpleProduct
        },
    },
});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -2,
        top: 8,
        backgroundColor: '#F00',
        color: '#fff'
    },
}));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();

    const {
        items,
        removeItem,
        updateItemQuantity,
        emptyCart
    } = useCart();

    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const [{ cartId }] = useCartContext();
    const [localCartIds, setLocalCartIds] = useState([]);

    const talonProps = useAccountInformationPage({
        ...AccountInformationPageOperations
    });

    const {
        initialValues
    } = talonProps;

    let customerName = 'My Account';
    if (initialValues) {
        const { customer } = initialValues;
        customerName = `${customer.firstname} ${customer.lastname}`;
    }

    const location = useLocation();
    const isHomePage = () => {
        const location = useLocation();
        return location.pathname === '/';
    };

    const onHomePage = isHomePage();
    const {
        itemCount,
    } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const itemCountDisplay = itemCount > 9 ? '9+' : itemCount;
    const maybeItemCounter = itemCount ? (
        <span className={classes.counter} data-cy="Header-CartTrigger-counter">
            {itemCountDisplay}
        </span>
    ) : null;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader}>
                    <div className={classes.loaderBefore} />
                    <div className={classes.loaderAfter} />
                </div>
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef} />
            </Route>
        </Suspense>
    ) : null;

    const { formatMessage } = useIntl();
    const history = useHistory();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Beesline' });
    const goBack = () => {
        history.goBack();
    };

    // useEffect(() => {
    //     if (itemCount === 0) {
    //         emptyCart(); // Empty local cart
    //     }
    // }, [itemCount]);

    // const { data } = useQuery(GET_CART_DETAILS_QUERY, {
    //     variables: {
    //         cartId: cartId,
    //     },
    //     cache
    // });

    // const handleCartItemDifference = (localCartIds, realCartIds) => {
    //     const diff = localCartIds.filter(item => !realCartIds.includes(item));
    //     if (diff.length > 0) {
    //       diff.forEach((id, index) => {
    //         // Assuming removeItem is a function that removes an item based on its id
    //         removeItem(id);
    //       });
    //     }
    // };

    // const getQuantityDifference = (localCartItems, realCartItems) => {
    //     return localCartItems.filter(localItem => {
    //       const correspondingRealItem = realCartItems.find(realItem => realItem.id === localItem.id);
      
    //       // Include items where the correspondingRealItem is not found or quantities are different
    //       return !correspondingRealItem || localItem.quantity !== correspondingRealItem.quantity;
    //     });
    // };

    // const createItemArray = items => {
    //     return items.map(item => ({ id: item.id, quantity: item.quantity }));
    // };

    // const createRealItemArray = data => {
    //     return data && data.cart.items.map(item => ({ id: item.product.uid, quantity: item.quantity }));
    // }
    
    // const updateCartItems = () => {
    //     console.log("items:", items);
    //     const localCartIds = items && items.map(item => item.id);
    //     const realCartIds = data && data.cart.items.map(item => item.product.uid);
    //     handleCartItemDifference(localCartIds, realCartIds);
    // };

    // const updateLocalCartItemsQty = () => {
    //     const localCartItems = createItemArray;
    //     const realCartItems = createRealItemArray;
    //     const quantityDifferenceArray = getQuantityDifference(localCartItems, realCartItems);
    //     console.log("****>>>>>> ",quantityDifferenceArray);
    // };
    
    // useEffect(() => {
    //     updateCartItems();
    // }, [items, data]);

    // useEffect(() => {
    //     updateLocalCartItemsQty();
    // }, [createItemArray, createRealItemArray, updateItemQuantity]);

    return (
        <Fragment>
            {onHomePage ? (
                <TickerNews />
            ): null}
            {/* <div className={classes.switchersContainer}>
                <div className={classes.switchers} data-cy="Header-switchers">
                    <StoreSwitcher />
                    <CurrencySwitcher />
                </div>
            </div> */}
            {isDesktop ? (
                <DesktopHeader classes={classes} />
            ) : (
                <MobileHeader classes={classes} />
            )}

        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
