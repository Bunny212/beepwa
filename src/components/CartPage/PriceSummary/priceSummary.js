import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import Price from '../../Price';
import { usePriceSummary } from '@magento/peregrine/lib/talons/CartPage/PriceSummary/usePriceSummary';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { useUserContext } from '@magento/peregrine/lib/context/user';
import Button from '@magento/venia-ui/lib/components/Button';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './priceSummary.module.css';
import DiscountSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/discountSummary';
import GiftCardSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/giftCardSummary';
import GiftOptionsSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/giftOptionsSummary';
import ShippingSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/shippingSummary';
import TaxSummary from '@magento/venia-ui/lib/components/CartPage/PriceSummary/taxSummary';
import Skeleton from '@mui/material/Skeleton';
import LoadingButton from '@mui/lab/LoadingButton';
import { useCartTrigger } from '@magento/peregrine/lib/talons/Header/useCartTrigger';
import { GET_ITEM_COUNT_QUERY } from '@magento/venia-ui/lib/components/Header/cartTrigger.gql';
import { useMutation } from '@apollo/client';
import { SET_CUSTOMER_ADDRESS_ON_CART, SET_CUSTOMER_BILLING_ADDRESS_ON_CART } from '../../AddressBookPage/talons/AddressBookPage/addressBookPage.gql';
// import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import UpSellDrawer from '../../UpSellDrawer/upselldrawer';
import GetDeviceType from '../../GetDeviceType/getDeviceType';

/**
 * A child component of the CartPage component.
 * This component fetches and renders cart data, such as subtotal, discounts applied,
 * gift cards applied, tax, shipping, and cart total.
 *
 * @param {Object} props
 * @param {Object} props.classes CSS className overrides.
 * See [priceSummary.module.css]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceSummary/priceSummary.module.css}
 * for a list of classes you can override.
 *
 * @returns {React.Element}
 *
 * @example <caption>Importing into your project</caption>
 * import PriceSummary from "@magento/venia-ui/lib/components/CartPage/PriceSummary";
 */
const PriceSummary = props => {
    const { isUpdating, addressId, customerAddress } = props;
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const [updateCustomerAddressLoading, setUpdateCustomerAddressLoading] = useState(false);
    const talonProps = usePriceSummary();
    const history = useHistory();
    const [{ cartId }] = useCartContext();
    const [{ isSignedIn }] = useUserContext();

    const {
        handleProceedToCheckout,
        handleEnterKeyPress,
        hasError,
        hasItems,
        isCheckout,
        isLoading,
        flatData
    } = talonProps;
    const { formatMessage } = useIntl();

    const [setCustomerAddressOnCart] = useMutation(SET_CUSTOMER_ADDRESS_ON_CART, {
        onCompleted: (data) => {
            if (data) {
                console.log("11-->>>>> Data = ", data);
                // The mutation was successful
                //handleProceedToCheckout();
                setCustomerBillingAddressOnCart({
                    variables: {
                        cartId: cartId
                    },
                })
            }
        },
        onError: (error) => {
            // Handle error
            setUpdateCustomerAddressLoading(false);
        },
    });

    const [setCustomerBillingAddressOnCart] = useMutation(SET_CUSTOMER_BILLING_ADDRESS_ON_CART, {
        onCompleted: (data) => {
            if (data) {
                console.log("22-->>>>> Data = ", data);
                // The mutation was successful
                handleProceedToCheckout();
            }
        },
        onError: (error) => {
            // Handle error
            setUpdateCustomerAddressLoading(false);
        },
    });

    const handleSetCustomerAddress = () => {
        if(customerAddress) {
            setUpdateCustomerAddressLoading(true);
            setCustomerAddressOnCart({
              variables: {
                cartId: cartId,
                address: {
                    firstname: customerAddress.firstname,
                    lastname: customerAddress.lastname,
                    street: customerAddress.street,
                    city: customerAddress.city,
                    postcode: customerAddress.postcode,
                    region: customerAddress.region.region_id,
                    country_code: customerAddress.country_code,
                    telephone: customerAddress.telephone.trim(),
                    bee_building_name: customerAddress.bee_building_name,
                    bee_apartment_nb: customerAddress.bee_apartment_nb,
                    bee_address_nickname: customerAddress.bee_address_nickname,
                    bee_nickname: customerAddress.bee_nickname,
                    bee_address_notes: customerAddress.bee_address_notes,
                    bee_address_type: customerAddress.bee_address_type,
                    bee_floor: customerAddress.bee_floor,
                    bee_coordinates: customerAddress.bee_coordinates,
                    save_in_address_book: false
                }
              },
            }).then((response) => {
              // Handle the response if needed
              setUpdateCustomerAddressLoading(false);
              console.log(response);
            });
        }else {
            handleProceedToCheckout();
        }
    };

    // const handleSetCustomerAddressOnCart = async (defaultAddressId) => {
    //     try {
    //       const { data } = await setCustomerAddressOnCart({
    //         variables: {
    //           addressId: defaultAddressId,
    //         },
    //       });
    
    //       // Handle the result if needed
    //       console.log('Mutation result:', data);
    //     } catch (error) {
    //       // Handle errors
    //       console.error('Mutation error:', error);
    //     }
    //   };

    // const handleApplyDefaultAddress = useCallback(async () => {
    //     try {
    //         await setCustomerAddressOnCart({
    //             variables: {
    //                 cartId: cartId,
    //                 addressId: defaultAddressId
    //             }
    //         });
    //     } catch {
    //         return;
    //     }
    // }, [
    //     cartId,
    //     defaultAddressId,
    //     setCustomerAddressOnCart
    // ]);

    if (hasError) {
        return (
            <div className={classes.root}>
                <span className={classes.errorText}>
                    <FormattedMessage
                        id={'priceSummary.errorText'}
                        defaultMessage={
                            'Something went wrong. Please refresh and try again.'
                        }
                    />
                </span>
            </div>
        );
    } else if (!hasItems) {
        return null;
    }

    const {
        subtotal,
        total,
        discounts,
        giftCards,
        giftOptions,
        taxes,
        shipping
    } = flatData;

    const isPriceUpdating = isUpdating || isLoading || updateCustomerAddressLoading;
    const priceClass = isPriceUpdating ? classes.priceUpdating : classes.price;
    const totalPriceClass = isPriceUpdating
        ? classes.priceUpdating
        : classes.totalPrice;

    const totalPriceLabel = isCheckout
        ? formatMessage({
            id: 'priceSummary.total',
            defaultMessage: 'Total'
        })
        : formatMessage({
            id: 'priceSummary.estimatedTotal',
            defaultMessage: 'Estimated Total'
        });

    const {
        itemCount,
    } = useCartTrigger({
        queries: {
            getItemCountQuery: GET_ITEM_COUNT_QUERY
        }
    });

    const handleShowLoginPage = () => {
        if(!isSignedIn) {
            //Replace "/target-page" with the path of the page you want to redirect to.
            const targetPagePath = "/sign-in"; // Example: "/products", "/about", etc.
            const stateParams = {
                headerTitle: '',
                fromCart: true
            };
            //Redirect the user to the target page
            history.push(targetPagePath, stateParams);
        }else {
            handleSetCustomerAddress();
            //handleProceedToCheckout();
        }
    }

    const proceedToCheckoutButton = !isCheckout ? (
        <div className={classes.checkoutButton_container}>
            {/* <UpSellDrawer /> */}
            {isPriceUpdating ? (
                // <LoadingButton disabled className={classes.fullBtn} loading loadingIndicator="Loading…" variant="outlined">
                //     Fetch data
                // </LoadingButton>
                <LoadingButton className={classes.loadingBtn} loadingIndicator={formatMessage({
                    id: 'loadingButtonText',
                    defaultMessage: 'Loading…'
                })} disabled loading>
                    Fetch data
                </LoadingButton>
            ) : (
                <Button
                    disabled={isPriceUpdating}
                    priority={'high'}
                    onClick={handleShowLoginPage}
                    onKeyDown={handleEnterKeyPress}
                    data-cy="PriceSummary-checkoutButton"
                    variant="contained" size="medium"
                    className={classes.fullBtn}
                >
                    <span className={classes.itemCount}>{itemCount} {itemCount > 1 ? formatMessage({
                            id: 'items',
                            defaultMessage: 'items'
                        }) : formatMessage({
                            id: 'item',
                            defaultMessage: 'item'
                        })}</span>
                    <span className={classes.checkoutBtnLabel}>
                        {/* <FormattedMessage
                            id={'priceSummary.checkoutButton'}
                            defaultMessage={'Proceed to Checkout'}
                        /> */}
                        <FormattedMessage id="cart.checkout" defaultMessage="Checkout" />
                    </span>
                    <span
                        data-cy="PriceSummary-totalValue"
                        className={totalPriceClass}
                    >
                        <Price
                            value={total.value}
                            currencyCode={total.currency}
                        />
                    </span>
                </Button>
            )}
        </div>
    ) : null;

    return (
        <div className={classes.root} data-cy="PriceSummary-root">
            {/* <div>
                <ul>
                    <li className={classes.lineItems}>
                        <span
                            data-cy="PriceSummary-lineItemLabel"
                            className={classes.lineItemLabel}
                        >
                            <FormattedMessage
                                id={'priceSummary.lineItemLabel'}
                                defaultMessage={'Subtotal'}
                            />
                        </span>
                        <span
                            data-cy="PriceSummary-subtotalValue"
                            className={priceClass}
                        >
                            <Price
                                value={subtotal.value}
                                currencyCode={subtotal.currency}
                            />
                        </span>
                    </li>
                    <DiscountSummary
                        classes={{
                            lineItems: classes.lineItems,
                            lineItemLabel: classes.lineItemLabel,
                            price: priceClass
                        }}
                        data={discounts}
                    />
                    <li className={classes.lineItems}>
                        <GiftCardSummary
                            classes={{
                                lineItemLabel: classes.lineItemLabel,
                                price: priceClass
                            }}
                            data={giftCards}
                        />
                    </li>
                    <li className={classes.lineItems}>
                        <GiftOptionsSummary
                            classes={{
                                lineItemLabel: classes.lineItemLabel,
                                price: priceClass
                            }}
                            data={giftOptions}
                        />
                    </li>
                    <li className={classes.lineItems}>
                        <TaxSummary
                            classes={{
                                lineItemLabel: classes.lineItemLabel,
                                price: priceClass
                            }}
                            data={taxes}
                            isCheckout={isCheckout}
                        />
                    </li>
                    <li className={classes.lineItems}>
                        <ShippingSummary
                            classes={{
                                lineItemLabel: classes.lineItemLabel,
                                price: priceClass
                            }}
                            data={shipping}
                            isCheckout={isCheckout}
                        />
                    </li>
                    <li className={classes.lineItems}>
                        <span
                            data-cy="PriceSummary-totalLabel"
                            className={classes.totalLabel}
                        >
                            {totalPriceLabel}
                        </span>
                        <span
                            data-cy="PriceSummary-totalValue"
                            className={totalPriceClass}
                        >
                            <Price
                                value={total.value}
                                currencyCode={total.currency}
                            />
                        </span>
                    </li>
                </ul>
            </div> */}
            {isDesktop ? (
                proceedToCheckoutButton
            ) : (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: "#ffffff", zIndex: "9999", borderTop: "2px solid #D6D6D6" }} elevation={0}>
                    {proceedToCheckoutButton}
                </Paper>
            )}
            
        </div>
    );
};

export default PriceSummary;
