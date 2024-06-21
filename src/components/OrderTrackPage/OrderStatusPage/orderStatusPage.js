import React, { useEffect, useState, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { object, shape, string } from 'prop-types';
import { Link, useLocation } from "react-router-dom";

import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import defaultClasses from './orderStatusPage.module.css';
import OrderTimeline from '../../OrderTimeline/OrderTimeline';
import OrderTimelineSkeleton from '../../OrderTimeline/OrderTimelineSkeleton';

import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ErrorOutline } from '@mui/icons-material';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import FormattedEstimationDeliveryDate from '../../FormattedEstimationDeliveryDate/FormattedEstimationDeliveryDate';
import { useQuery } from '@apollo/client';
import { GET_ORDER_STATUS_DATA } from './orderStatusQuery';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : 'transparent',
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
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: '500',
    fontFamily: 'Roobert',
    color: '#181717',
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

const OrderStatusPage = props => {
    const classes = useStyle(defaultClasses, props.classes);
    const location = useLocation();
    const { incrementId } = location.state || {};
    const { email } = location.state || {};
    const { formatMessage } = useIntl();
    const { fromOrderSummary } = location.state || { fromOrderSummary: false };

    const { loading, error, data, refetch } = useQuery(GET_ORDER_STATUS_DATA, {
        variables: { incrementId, email },
    });

    useEffect(() => {
        refetch();
        const { scrollTo } = globalThis;

        if (typeof scrollTo === 'function') {
            scrollTo({
                left: 0,
                top: 0,
                behavior: 'smooth'
            });
        }
    }, []);

    if (loading) {
        return (
            <div className={classes.root} >
                <div className={classes.mainContainer}>
                    <div className={classes.deliveryStatus}>
                        <h5 className={classes.deliveryStatusTitle}>
                            <FormattedMessage id="deliveryStatus" defaultMessage="Delivery Status" />
                        </h5>
                        <OrderTimelineSkeleton/>
                        <span className={classes.estimationTime}><Skeleton width="80%" /></span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <ErrorContent errorMessage={error.message} />;
    }

    const orderData = data.getOrderStatusData;
    console.log("ordeerData = ", orderData);
    const { carrier_code, method_code, method_title, amount } = orderData || {};
    const method = orderData.shipping_method;
    // Find the index of the first hyphen
    const indexOfHyphen = method.indexOf('-');
    let result = '';
    // Check if a hyphen was found
    if (indexOfHyphen !== -1) {
        result = method.substring(indexOfHyphen + 1).trim();
    }
    // const {
    //     carrier_code = 'freeshipping',
    //     method_code = 'freeshipping',
    //     method_title = '3-day Delivery',
    //     amount = { value: 0, currency: 'USD' }
    // } = orderData.shipping_method || {};

    return (
        <div className={classes.root} data-cy="OrderStatusPage-root">
            <StoreTitle>
                <FormattedMessage id="deliveryStatus" defaultMessage="Delivery Status" />
            </StoreTitle>
            <div className={classes.mainContainer}>
                <div className={classes.deliveryStatus}>
                    <h5 className={classes.deliveryStatusTitle}>
                        <FormattedMessage id="deliveryStatus" defaultMessage="Delivery Status" />
                    </h5>
                    <OrderTimeline status={orderData.status} />
                    {result && (
                        <>
                            <span className={classes.DeliveryLabel}><FormattedMessage id="estimatedDeliveryDate" defaultMessage="Estimated delivery date:" /></span>
                            <FormattedEstimationDeliveryDate methodTitle={result} className={classes.estimationTime} />
                        </>
                    )}
                </div>
                <div className={classes.deliverySupport}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                            <Grid sx={{ borderRight: '1px solid #fff' }} item xs={6}>
                                <Item>
                                    You think you made a mistake?
                                    <Button className={classes.deliveryBtn}>Cancel Order</Button>
                                </Item>
                            </Grid>
                            <Grid item xs={6}>
                                <Item>
                                    A question for our customer care team?
                                    <Button className={classes.deliveryBtn}>Chat here</Button>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                {!fromOrderSummary && (
                    <div className={classes.orderSummary}>
                        <div className={classes.cardHeader}>
                            <h5 className={classes.orderSummaryTitle}>
                                <FormattedMessage id="orderSummary" defaultMessage="Order Summary" />
                            </h5>
                            <Button
                                component={Link} to={{
                                    pathname: resourceUrl(`/order-summary`),
                                    state: { headerTitle: formatMessage({
                                        id: 'orderSummary',
                                        defaultMessage: 'Order Summary'
                                    }), stateIncrementId: incrementId, fromTrackOrderPage: true }
                                }}
                                className={classes.editButton}
                                data-cy="OrderStatus-editButton"
                            >
                                <span className={classes.editText}>
                                    <FormattedMessage id="view" defaultMessage="View" /> →
                                </span>
                            </Button>
                        </div>
                        <span className={classes.orderSummaryContent}>
                            <FormattedMessage id="checkInboxMessage" defaultMessage="Check your sms or email inbox for your order confirmation. Otherwise check your junk mail." />
                        </span>
                    </div>
                )}
                {/* <Button className={classes.fullBtn} variant="contained" size="medium">Resume Shopping</Button> */}
            </div>
        </div>
    );
};

export default OrderStatusPage;
