import React, { Fragment, Suspense } from 'react';
import { FormattedMessage } from 'react-intl';
import { useProductListing } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProductListing';

import { useStyle } from '@magento/venia-ui/lib/classify';
import LoadingIndicator from '@magento/venia-ui/lib/components/LoadingIndicator';
import defaultClasses from './productListing.module.css';
import Product from './product';
import ErrorMessage from '@magento/venia-ui/lib/components/CartPage/ProductListing/errorMessage';

import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import GetDeviceType from '../../GetDeviceType/getDeviceType';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'start',
    padding: '0px',
}));

const EditModal = React.lazy(() => import('@magento/venia-ui/lib/components/CartPage/ProductListing/EditModal'));
/**
 * A child component of the CartPage component.
 * This component renders the product listing on the cart page.
 *
 * @param {Object} props
 * @param {Function} props.setIsCartUpdating Function for setting the updating state of the cart.
 * @param {Object} props.classes CSS className overrides.
 * See [productListing.module.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/ProductListing/productListing.module.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import ProductListing from "@magento/venia-ui/lib/components/CartPage/ProductListing";
 */
const ProductListing = props => {
    const {
        onAddToWishlistSuccess,
        setIsCartUpdating,
        fetchCartDetails
    } = props;

    const talonProps = useProductListing();

    const {
        activeEditItem,
        isLoading,
        error,
        items,
        setActiveEditItem,
        wishlistConfig
    } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();

    if (isLoading) {
        return (
            <div>
                <li className={classes.root} data-cy="Product-root">
                    <div className={classes.itemsBox}>
                        <div className={classes.item}>
                            <Skeleton animation="wave" variant="rounded" width={80} height={80} />
                            <div className={isDesktop ? classes.desktopDetails : classes.details}>
                                <div className={classes.name} data-cy="Product-name">
                                    <Skeleton animation="wave" height={10} width="100%" />
                                </div>
                                <span className={classes.price} data-cy="Product-price">
                                    <Skeleton animation="wave" height={10} width="70%" />
                                </span>
                                <span className={classes.price} data-cy="Product-price">
                                    <Skeleton animation="wave" height={10} width="40%" />
                                </span>
                            </div>
                        </div>
                        <div className={classes.item}>
                            <Skeleton animation="wave" variant="rounded" width={80} height={80} />
                            <div className={isDesktop ? classes.desktopDetails : classes.details}>
                                <div className={classes.name} data-cy="Product-name">
                                    <Skeleton animation="wave" height={10} width="100%" />
                                </div>
                                <span className={classes.price} data-cy="Product-price">
                                    <Skeleton animation="wave" height={10} width="70%" />
                                </span>
                                <span className={classes.price} data-cy="Product-price">
                                    <Skeleton animation="wave" height={10} width="40%" />
                                </span>
                            </div>
                        </div>
                        <div className={classes.item}>
                            <Skeleton animation="wave" variant="rounded" width={80} height={80} />
                            <div className={isDesktop ? classes.desktopDetails : classes.details}>
                                <div className={classes.name} data-cy="Product-name">
                                    <Skeleton animation="wave" height={10} width="100%" />
                                </div>
                                <span className={classes.price} data-cy="Product-price">
                                    <Skeleton animation="wave" height={10} width="70%" />
                                </span>
                                <span className={classes.price} data-cy="Product-price">
                                    <Skeleton animation="wave" height={10} width="40%" />
                                </span>
                            </div>
                        </div>
                    </div>
                </li>
            </div>
        );
    }

    if (items.length) {
        const productComponents = items.map(product => (
            <Product
                item={product}
                key={product.uid}
                setActiveEditItem={setActiveEditItem}
                setIsCartUpdating={setIsCartUpdating}
                onAddToWishlistSuccess={onAddToWishlistSuccess}
                fetchCartDetails={fetchCartDetails}
                wishlistConfig={wishlistConfig}
                isDesktop={isDesktop}
            />
        ));

        return (
            <Fragment>
                <ErrorMessage error={error} />
                <ul className={classes.root} data-cy="ProductListing-root">
                    {productComponents}
                </ul>
                <Suspense fallback={null}>
                    <EditModal
                        item={activeEditItem}
                        setIsCartUpdating={setIsCartUpdating}
                        setActiveEditItem={setActiveEditItem}
                    />
                </Suspense>
            </Fragment>
        );
    }

    return null;
};

export default ProductListing;
