import React, { Fragment } from 'react';
import { Link, useLocation } from "react-router-dom";
import { FormattedMessage, useIntl } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './orderSummaryPage.module.css';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import Price from '../Price';
import Image from '@magento/venia-ui/lib/components/Image';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ErrorOutline } from '@mui/icons-material';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import CheckoutPaymentIcon from '../Icons/payment_icon.svg';
import Button from '@mui/material/Button';
import StaticMap from '../StaticMap/staticMap';
import { useQuery } from '@apollo/client';
import { GET_ORDER_DATA } from './orderSummaryQuery';
import GetDeviceType from '../GetDeviceType/getDeviceType';
import placeHolderImage from '../Images/placeholder.png';

const IMAGE_SIZE = 100;

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

const CustomItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0px',
}));

const ItemTotalDetails = styled(Paper)(({ theme }) => ({
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
    fontSize: '11px',
    color: '#000000',
    fontFamily: 'Roobert',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '20px'
}));

const ItemTotal = styled(Paper)(({ theme }) => ({
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
    fontSize: '18px',
    color: '#000000',
    fontFamily: 'Roobert',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '20px'
}));

const ItemValues = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'end',
    padding: '0px',
    fontSize: '11px',
    color: '#000000',
    fontFamily: 'Roobert',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '20px'
}));

const ItemValuesTotal = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'right',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'end',
    justifyContent: 'end',
    padding: '0px',
    fontSize: '18px',
    color: '#000000',
    fontFamily: 'Roobert',
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: '110%'
}));

const ErrorContent = ({ errorMessage }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="300px"
        >
            <ErrorOutline sx={{ fontSize: 48, color: 'error.main' }} />
            <Typography variant="h6" component="div" align="center" mt={2}>
                {errorMessage}
            </Typography>
        </Box>
    );
};


const OrderSummaryPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const location = useLocation();
    const { formatMessage } = useIntl();
    const { stateIncrementId } = location.state || {};
    const { fromTrackOrderPage } = location.state || { fromTrackOrderPage: false };
    const {
        orderIncrementId
    } = props;
    const incrementId = stateIncrementId ? stateIncrementId : orderIncrementId;
    const { loading, error, data, refetch } = useQuery(GET_ORDER_DATA, {
        fetchPolicy: "cache-and-network",
        nextFetchPolicy: "cache-first",
        variables: { incrementId },
    });

    // useEffect(() => {
    //     // Perform additional logic or data manipulation here on page load
    //     // You can also trigger a manual refetch if needed
    //     refetch();
    // }, []);

    if (loading) {
        return (
            <div className={classes.root} >
                <div className={classes.skeletonItemsBox}>
                    <div className={classes.item}>
                        <Skeleton animation="wave" variant="rounded" width={80} height={80} />
                        <div className={classes.details}>
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
                        <div className={classes.details}>
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
                        <div className={classes.details}>
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
                    <Skeleton animation="wave" height={10} width="100%" />
                    <Skeleton animation="wave" height={10} width="100%" />
                    <Skeleton animation="wave" height={10} width="100%" />
                </div>
                <div className={classes.skeletonDeliveryTo}>
                    <span className={classes.titleContainer}>
                        <h5 className={classes.heading}>
                            Delivered ty:
                        </h5>
                    </span>
                    <br />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                            <Grid item xs={4}>
                                <Item>
                                    <Skeleton animation="wave" variant="rounded" width={80} height={80} />
                                </Item>
                            </Grid>
                            <Grid item xs={8}>
                                <Item>
                                    <Skeleton animation="wave" height={10} width="100%" />
                                    <Skeleton animation="wave" height={10} width="80%" />
                                    <Skeleton animation="wave" height={10} width="70%" />
                                    <Skeleton animation="wave" height={10} width="60%" />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <div className={classes.skeletonPaymentMethod}>
                    <span className={classes.titleContainer}>
                        <h5 className={classes.heading}>
                            <FormattedMessage id="orderDetails.paymentMethodLabel" defaultMessage="Payment Method" />
                        </h5>
                    </span>
                    <br />
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                            <Grid item xs={2}>
                                <Item>
                                    <Skeleton animation="wave" variant="rounded" width={36} height={25} />
                                </Item>
                            </Grid>
                            <Grid item xs={10}>
                                <Item>
                                    <Skeleton animation="wave" height={10} width="40%" />
                                    <Skeleton animation="wave" height={10} width="60%" />
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    const orderData = data.getOrderData;
    console.log("Order Data = ", orderData);

    const disableClick = (event) => {
        event.preventDefault();
    };

    const orderItemCount = orderData.orderItems.length;

    const orderItemsData = (
        <Fragment>
            {orderData.orderItems.map((item, index) => (
                <div key={index} className={classes.itemsBox}>
                    <div className={classes.item}>
                        <Link
                            to="#"
                            onClick={disableClick}
                            className={classes.imageContainer}
                            data-cy="Product-imageContainer"
                        >
                            <Image
                                alt={item.name}
                                classes={{
                                    root: classes.imageRoot,
                                    image: classes.image
                                }}
                                width={IMAGE_SIZE}
                                resource={item.imageUrl ? item.imageUrl : placeHolderImage}
                                data-cy="Product-image"
                            />
                        </Link>
                        <div className={isDesktop ? classes.desktopDetails : classes.details}>
                            <div className={classes.name} data-cy="Product-name">
                                <Link to="#" onClick={disableClick}>{item.name}</Link>
                            </div>
                            <span className={classes.price} data-cy="Product-price">
                                <Price currencyCode={orderData.orderCurrency} value={item.price} />
                            </span>
                        </div>
                        <div className={classes.kebab}>
                            <div className={classes.quantity}>
                                {item.qtyOrdered}x
                            </div>
                        </div>
                    </div>
                    {index < orderItemCount - 1 && <Divider />}
                </div>
            ))}
        </Fragment>
    );

    const orderTotalString = orderData.subTotal.replace(/[^0-9.]/g, "");
    const OrderTotal = parseFloat(orderTotalString);
    const orderGrandTotalString = orderData.grandTotal.replace(/[^0-9.]/g, "");
    const OrderGrandTotal = parseFloat(orderGrandTotalString);
    let shippingAmountValue = 0;
    if(orderData.shippingAmount != 'FREE') {
        const shippingAmountString = orderData.shippingAmount.replace(/[^0-9.]/g, "");
        shippingAmountValue = parseFloat(shippingAmountString);
    }

    const addressNicknameOptions = [
        { label: formatMessage({id: 'home'}), value: 148 },
        { label: formatMessage({id: 'work'}), value: 149 },
        { label: formatMessage({id: 'other'}), value: 154 },
    ];
    const nicknameLabel = orderData.addressData.shipping.bee_address_nickname;

    const [latitude, longitude] = orderData.addressData.shipping.bee_coordinates ? orderData.addressData.shipping.bee_coordinates.split(',') : '';
    const coordinatesObject = {
        lat: parseFloat(latitude),
        lng: parseFloat(longitude)
    };

    let displayLabel = nicknameLabel;

    if (orderData.addressData.shipping.bee_address_nickname && orderData.addressData.shipping.bee_address_nickname === 'Other') {
        displayLabel += ' ' + orderData.addressData.shipping.bee_nickname;
    }

    const totals = (
        <Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center', padding: '4px 0' }}>
                    <Grid sx={{ paddingTop: '0px', paddingBottom: '0px' }} item xs={6}>
                        <ItemTotalDetails>
                            Subtotal
                        </ItemTotalDetails>
                    </Grid>
                    <Grid sx={{ paddingTop: '0px', paddingBottom: '0px', display: 'flex', justifyContent: 'end' }} item xs={6}>
                        <ItemValues sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                            <Price currencyCode={orderData.orderCurrency} value={OrderTotal} />
                        </ItemValues>
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ alignItems: 'center', padding: '4px 0' }}>
                    <Grid sx={{ paddingTop: '0px', paddingBottom: '0px' }} item xs={6}>
                        <ItemTotalDetails>
                            Delivery Charge
                        </ItemTotalDetails>
                    </Grid>
                    {orderData.shippingAmount == 'FREE' ? (
                        <Grid sx={{ paddingTop: '0px', paddingBottom: '0px' }} item xs={6}>
                            <ItemValues>
                                {orderData.shippingAmount}
                            </ItemValues>
                        </Grid>
                    ) : (
                        <Grid sx={{ paddingTop: '0px', paddingBottom: '0px', display: 'flex', justifyContent: 'end' }} item xs={6}>
                            <ItemValues sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                                <Price currencyCode={orderData.orderCurrency} value={shippingAmountValue} />
                            </ItemValues>
                        </Grid>
                    )}
                </Grid>
                {orderData.hasDiscount ? (
                    <Grid container spacing={2} sx={{ alignItems: 'center', padding: '4px 0' }}>
                        <Grid sx={{ paddingTop: '0px', paddingBottom: '0px' }} item xs={6}>
                            <ItemTotalDetails>
                                Discount
                            </ItemTotalDetails>
                        </Grid>
                        <Grid sx={{ paddingTop: '0px', paddingBottom: '0px' }} item xs={6}>
                            <ItemValues>
                                {/* <Price currencyCode={orderData.orderCurrency} value={orderData.discountAmount} /> */}
                                {orderData.discountAmount}
                            </ItemValues>
                        </Grid>
                    </Grid>
                ) : null}
                <Grid container spacing={2} sx={{ alignItems: 'center', marginTop: '10px' }}>
                    <Grid item xs={6}>
                        <ItemTotal>
                            Total
                        </ItemTotal>
                    </Grid>
                    <Grid sx={{ display: 'flex', justifyContent: 'end' }} item xs={6}>
                        <ItemValuesTotal sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                            <Price currencyCode={orderData.orderCurrency} value={OrderGrandTotal} />
                        </ItemValuesTotal>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );

    const deliveryTo = (
        <Fragment>
            <div className={classes.cardHeader}>
                <h5 className={classes.cardTitle}>
                    <FormattedMessage id="deliveryTo" defaultMessage="Delivery to:" />
                </h5>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center', marginBottom: '4px' }}>
                    <Grid item xs={4}>
                        <Item sx={{ padding: '0px' }}>
                            <StaticMap coordinates={coordinatesObject} zoom={12} size="120x80" />
                        </Item>
                    </Grid>
                    <Grid item xs={8}>
                        <Item>
                            {orderData.addressData.shipping.bee_address_nickname === 'Other' ? (
                                <span className={classes.addressTitle}>{nicknameLabel}:{orderData.addressData.shipping.bee_nickname} <FormattedMessage id="contactWith" defaultMessage="Contact:" /> {orderData.addressData.shipping.fullname}</span>
                            ) : (
                                <span className={classes.addressTitle}>{nicknameLabel} <FormattedMessage id="contactWith" defaultMessage="Contact:" /> {orderData.addressData.shipping.fullname}</span>
                            )}
                            <div className={classes.address}>
                                {orderData.addressData.shipping.street}
                            </div>
                            <span className={classes.telephone}>{orderData.addressData.shipping.telephone}</span>
                        </Item>
                    </Grid>
                </Grid>
                {orderData.addressData.shipping.bee_address_notes && (
                    <>
                        <Divider />
                        <Grid container spacing={2} sx={{ alignItems: 'center', marginTop: '4px' }}>
                            <Grid item xs={4}>
                                <Item sx={{ padding: '0px' }}>
                                    <span className={classes.deliveryNoteTitle}>Delivery note:</span>
                                </Item>
                            </Grid>
                            <Grid item xs={8} sx={{ paddingRight: '0px', paddingLeft: '0px' }}>
                                <Item sx={{ padding: '0px' }}>
                                    <span className={classes.deliveryNote}>
                                        {orderData.addressData.shipping.bee_address_notes} 
                                        {/* <EllipsisText text={orderData.addressData.shipping.bee_address_notes} maxLines="1" ellipsis="..." /> */}
                                    </span>
                                </Item>
                            </Grid>
                        </Grid>
                    </>
                )}
            </Box>
        </Fragment>
    );

    const paymentMethod = (
        <Fragment>
            <div className={classes.cardHeader}>
                <h5 className={classes.cardTitle}>
                    <FormattedMessage id="orderDetails.paymentMethodLabel" defaultMessage="Payment Method" />
                </h5>
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid item xs={2}>
                        <Item>
                            <img src={CheckoutPaymentIcon} />
                        </Item>
                    </Grid>
                    <Grid item xs={10}>
                        <Item>
                            <span className={classes.methodTitle}><FormattedMessage id="cash" defaultMessage={orderData.paymentMethod.title} /></span>
                            <span className={classes.subMethodTitle}>{orderData.paymentMethod.label}</span>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </Fragment>
    );

    return (
        <div className={isDesktop ? classes.desktopRoot : classes.root} data-cy="OrderSummaryPage-root">
            <div className={classes.mainContainer}>
                {orderData && ( // Add a check to ensure orderData exists before accessing its properties
                    <>
                        <div className={classes.containerBox}>
                            {orderItemsData}
                            <div className={classes.totalSection}>
                                {totals}
                            </div>
                        </div>
                        <br />
                        <div className={classes.containerBox}>
                            <Box sx={{ flexGrow: 1 }}>
                                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                                    <Grid item xs={fromTrackOrderPage && orderData.status !== 'complete' ? 12 : 6}>
                                        <CustomItem>
                                            <Button
                                                component={Link}
                                                to={{
                                                    pathname: resourceUrl(`/get-support/orders`),
                                                    state: { headerTitle: formatMessage({
                                                        id: 'faq',
                                                        defaultMessage: 'FAQ'
                                                    }), faqCategoryId: 1, incrementId: orderData.incrementId }
                                                }}
                                                className={classes.fullBtnOutline} variant="outlined">
                                                    <FormattedMessage id="support" defaultMessage="Support" />
                                                </Button>
                                        </CustomItem>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <CustomItem>
                                            {orderData.status === 'complete' ? (
                                                // Content to render when status is 'Complete'
                                                <Button className={classes.fullBtn} variant="contained">Reorder</Button>
                                            ) : (
                                                // Content to render when status is not 'Complete'
                                                !fromTrackOrderPage ? (
                                                    <Button
                                                        component={Link} to={{
                                                            pathname: resourceUrl(`/track-order/order-status`),
                                                            state: { headerTitle: formatMessage({
                                                                id: 'orderStatus',
                                                                defaultMessage: 'Order Status'
                                                            }), incrementId: orderData.incrementId, email: orderData.email, fromOrderSummary: true }
                                                        }}
                                                        className={classes.fullBtn} variant="contained">
                                                            <FormattedMessage id="trackOrder" defaultMessage="Track Order" />
                                                        </Button>
                                                ) : null
                                            )}
                                        </CustomItem>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                        <br />
                        <div className={classes.deliveryTo}>
                            {deliveryTo}
                        </div>
                        <br />
                        <div className={classes.paymentMethod}>
                            {paymentMethod}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default OrderSummaryPage;
