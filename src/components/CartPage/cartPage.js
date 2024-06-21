import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import { Check } from 'react-feather';
import { useCartPage } from '@magento/peregrine/lib/talons/CartPage/useCartPage';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { useToasts } from '@magento/peregrine';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import Icon from '@magento/venia-ui/lib/components/Icon';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { fullPageLoadingIndicator } from '@magento/venia-ui/lib/components/LoadingIndicator';
import StockStatusMessage from '@magento/venia-ui/lib/components/StockStatusMessage';
import PriceAdjustments from '@magento/venia-ui/lib/components/CartPage/PriceAdjustments';
import PriceSummary from './PriceSummary';
import ProductListing from './ProductListing';
import defaultClasses from './cartPage.module.css';

import Image from '@magento/venia-ui/lib/components/Image';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';
import Button from '@mui/material/Button';
import ArrowIcon from '../Icons/Arrow.svg';
import CategoryIcon from '../Icons/category_icon.svg';
import CategoriesIcon from '../Icons/categories.svg';
import DeliveryTruck from '../Icons/delivery_truck.svg';
import MapIcon from '../Icons/map.svg';
import { useQuery } from '@apollo/client';
import { GET_CUSTOMER_ADDRESSES } from '../AddressBookPage/talons/AddressBookPage/addressBookPage.gql';
import useGtmCartData from './useGtmCartData';

const OUT_OF_STOCK_CODE = 'OUT_OF_STOCK';
const IN_STOCK_CODE = 'IN_STOCK';

const CheckIcon = <Icon size={20} src={Check} />;

/**
 * Structural page component for the shopping cart.
 * This is the main component used in the `/cart` route in Venia.
 * It uses child components to render the different pieces of the cart page.
 *
 * @see {@link https://venia.magento.com/cart}
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides for the component.
 * See [cartPage.module.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/cartPage.module.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import CartPage from "@magento/venia-ui/lib/components/CartPage";
 */
const CartPage = props => {
    const talonProps = useCartPage();

    const {
        cartItems,
        hasItems,
        isCartUpdating,
        fetchCartDetails,
        onAddToWishlistSuccess,
        setIsCartUpdating,
        shouldShowLoadingIndicator,
        wishlistSuccessProps
    } = talonProps;
    console.log("isCartUpdating = ", isCartUpdating);
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl'; // Use your logic to determine RTL
    const [, { addToast }] = useToasts();
    const [{ isSignedIn, currentUser }] = useUserContext();
    const { data, loading, error } = useQuery(
        GET_CUSTOMER_ADDRESSES,
        {
            fetchPolicy: 'cache-and-network',
            skip: !isSignedIn
        }
    );
    
    useGtmCartData(cartItems, isCartUpdating);

    const customerAddress = useMemo(() => {
        if (data && data.customer.addresses) {
            const defaultAddress = data.customer.addresses.find(address => address.default_shipping);
            return defaultAddress ? defaultAddress : null;
        }
        return null;
    }, [data, loading]);

    const customerDefaultAddressId = useMemo(() => {
        if (data && data.customer.addresses) {
            const defaultAddress = data.customer.addresses.find(address => address.default_shipping);
            return defaultAddress ? defaultAddress.id : null;
        }
        return null;
    }, [data, loading]);
    console.log("customerAddress = ", customerAddress);
    console.log("customerDefaultAddressId = ", customerDefaultAddressId);
    useEffect(() => {
        if (wishlistSuccessProps) {
            addToast({ ...wishlistSuccessProps, icon: CheckIcon });
        }
    }, [addToast, wishlistSuccessProps]);

    // useEffect(() => {
    //     if (dataGtm && dataGtm.getCategoryProducts) {
    //         const gtmViewItemList = {
    //             currency: dataGtm.getCategoryProducts.currency,
    //             item_list_id: dataGtm.getCategoryProducts.category_info.uid,
    //             item_list_name: dataGtm.getCategoryProducts.category_info.name,
    //             country: dataGtm.getCategoryProducts.country,
    //             items: dataGtm.getCategoryProducts.items.map((item, index) => ({
    //                 index: index + 1, // Index starts from 1
    //                 item_id: item.id,
    //                 quantity: item.stock_status === OUT_OF_STOCK_CODE ? 0 : 1, // Assuming quantity is always 1
    //                 price: item.price_range.maximum_price.final_price.value,
    //                 discount: Math.ceil(item.price_range.maximum_price.discount.percent_off), // Assuming no discount for now
    //                 item_name: item.name,
    //                 // Assuming other item details are not available in the provided dataGtm
    //                 item_brand: dataGtm.getCategoryProducts.brand,
    //                 item_category: dataGtm.getCategoryProducts.category_info.name,
    //                 item_list_id: dataGtm.getCategoryProducts.category_info.uid,
    //                 item_list_name: dataGtm.getCategoryProducts.category_info.name,
    //                 item_variant: ''
    //             }))
    //         };
    //         sendViewItemListEvent(gtmViewItemList);
    //     }
    // }, [dataGtm]);

    if (shouldShowLoadingIndicator) {
        return fullPageLoadingIndicator;
    }

    const productListing = hasItems ? (
        <ProductListing
            onAddToWishlistSuccess={onAddToWishlistSuccess}
            setIsCartUpdating={setIsCartUpdating}
            fetchCartDetails={fetchCartDetails}
        />
    ) : (
        <div>
            <div className={classes.emptyCartNotice}>
                <Link to={resourceUrl('/product-categories')}>
                    <FormattedMessage id="startShopping.text" />
                </Link>
                <Image
                    height='25px'
                    src={ArrowIcon}
                    alt='Search'
                    title='Search'
                    width='26px'
                    style={{ ...(isRTL && { transform: 'scaleX(-1)' }) }}
                />
            </div>
            <List sx={{ width: '100%', padding: 0, bgcolor: 'background.paper' }}>
                <ListItemButton component={Link} to="/sign-in" className={classes.listItemButton}>
                    <ListItemIcon>
                        <Image
                            height='36px'
                            src={DeliveryTruck}
                            alt={<FormattedMessage id="freeDelivery.primary" />}
                            title={<FormattedMessage id="freeDelivery.primary" />}
                            width='36px'
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={<FormattedMessage id="freeDelivery.primary" />}
                        secondary={<FormattedMessage id="freeDelivery.secondary" />}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to={{
                        pathname: resourceUrl('/product-categories'),
                        state: { headerTitle: 'Categories' }
                    }} className={classes.listItemButton}>
                    <ListItemIcon>
                        <Image
                            height='36px'
                            src={CategoriesIcon}
                            alt={<FormattedMessage id="shopByCategories.primary" />}
                            title={<FormattedMessage id="shopByCategories.primary" />}
                            width='36px'
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={<FormattedMessage id="shopByCategories.primary" />}
                        secondary={<FormattedMessage id="shopByCategories.secondary" />}
                    />
                </ListItemButton>
                <ListItemButton component={Link} to="/track-order" className={classes.listItemButton}>
                    <ListItemIcon>
                        <Image
                            height='36px'
                            src={MapIcon}
                            alt={<FormattedMessage id="trackOrders.primary" />}
                            title={<FormattedMessage id="trackOrders.primary" />}
                            width='36px'
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={<FormattedMessage id="trackOrders.primary" />}
                        secondary={<FormattedMessage id="trackOrders.secondary" />}
                    />
                </ListItemButton>
            </List>
            <Button component={Link} to={{
                    pathname: resourceUrl(`/product-categories`),
                }} className={classes.fullBtn} variant="contained" size="medium">
                    <FormattedMessage id="startShopping.buttonText" />
                </Button>
        </div>
    );

    const priceAdjustments = hasItems ? (
        <PriceAdjustments setIsCartUpdating={setIsCartUpdating} />
    ) : null;

    const priceSummary = hasItems ? (
        <PriceSummary isUpdating={isCartUpdating} addressId={customerDefaultAddressId} customerAddress={customerAddress} />
    ) : null;

    return (
        <div className={classes.root} data-cy="CartPage-root">
            <div className={classes.heading_container}>
                <h1
                    aria-live="polite"
                    data-cy="CartPage-heading"
                    className={classes.heading}
                >
                    <FormattedMessage
                        id={'cartPage.heading'}
                        defaultMessage={'Cart'}
                    />
                </h1>
                <div className={classes.stockStatusMessageContainer}>
                    <StockStatusMessage cartItems={cartItems} />
                </div>
            </div>
            <div className={classes.body}>
                <div className={hasItems ? classes.items_container : classes.items_containerr}>{productListing}</div>
                {/* <div className={classes.price_adjustments_container}>
                    {priceAdjustments}
                </div> */}
                <div className={classes.summary_container}>
                    <div className={classes.summary_contents}>
                        {priceSummary}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
