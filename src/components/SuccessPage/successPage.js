import React, { useEffect } from 'react';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Link } from "react-router-dom";
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import { object, shape, string } from 'prop-types';
import defaultClasses from './successPage.module.css';
import { FormattedMessage, useIntl } from 'react-intl';
import { StoreTitle } from '@magento/venia-ui/lib/components/Head';
import { useSuccessPage } from './talons/useSuccessPage';

import PriceSummary from '../OrderSummary/PriceSummary';
import CreateAccount from '@magento/venia-ui/lib/components/CheckoutPage/OrderConfirmationPage/createAccount';
// import Button from '@magento/venia-ui/lib/components/Button';
import LinkButton from '@magento/venia-ui/lib/components/LinkButton';

import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Button from '@mui/material/Button';
import FormattedEstimationDeliveryDate from '../FormattedEstimationDeliveryDate/FormattedEstimationDeliveryDate';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useCart } from "react-use-cart";
import useGtmPurchaseData from './useGtmPurchaseData';

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


const SuccessPage = props => {
    const { data } = props;
    const talonProps = useSuccessPage(props);
    const classes = useStyle(defaultClasses, props.classes);
    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl';

    const {
        shippingMethod,
        shippingAddress,
        billingAddress,
        paymentMethod,
        deliveryData,
        orderNumber,
        orderGiftMessage,
        createdAt,
        isSubscribed,
        isRegistered,
        orderComment,
        bottomBlockId,
        isShowCreateAccountForm,
        handleClickContinueShopping,
        setView,
        view
    } = talonProps;

    const {
        emptyCart
    } = useCart();

    useEffect(() => {
        emptyCart(); // Empty local cart
    }, []); // Empty dependency array ensures it runs only 

    useGtmPurchaseData(orderNumber);

    const { carrier_code, method_code, method_title, amount } = shippingMethod;
    // const {
    //     carrier_code = 'freeshipping',
    //     method_code = 'freeshipping',
    //     method_title = '3-day Delivery',
    //     amount = { value: 0, currency: 'USD' }
    // } = shippingMethod || {};

    const subscriptionMessage = isSubscribed ? (
        <div className={classes.message}>
            <FormattedMessage
                id={'amOsc.subscriptionMessage'}
                defaultMessage={'Thank you for your subscription.'}
            />
        </div>
    ) : null;

    const registrationMessage = isRegistered ? (
        <div className={classes.message}>
            <FormattedMessage
                id={'amOsc.registrationMessage'}
                defaultMessage={
                    'Registration: A letter with further instructions will be sent to your email.'
                }
            />
        </div>
    ) : null;

    const createAccountArea = isShowCreateAccountForm ? (
        <div className={classes.createAccount}>
            <p>
                <FormattedMessage
                    id={'amOsc.successPageCreateAccountMessage'}
                    defaultMessage={
                        'You can track your order status by creating an account.'
                    }
                />
            </p>
            <p>
                <FormattedMessage
                    id={'amOsc.successPageEmail'}
                    defaultMessage={'Email Address: {email}'}
                    values={{ email: shippingAddress.email }}
                />
            </p>
            <Button onClick={() => setView('register')}>
                <FormattedMessage
                    id={'amOsc.successPageCreateAccountBtn'}
                    defaultMessage={'Create An Account'}
                />
            </Button>
        </div>
    ) : null;

    const containerClass =
        view === 'order' ? classes.mainContainer : classes.mainContainer_hidden;

    return (
        <div className={classes.root}>
            <StoreTitle>
                {formatMessage(
                    {
                        id: 'amOsc.successPageTitle',
                        defaultMessage: 'Order #{orderNumber}'
                    },
                    { orderNumber }
                )}
            </StoreTitle>
            <div className={containerClass}>
            <div className={classes.mainContainer}>
                <div className={classes.deliveryStatus}>
                    <h5 className={classes.deliveryStatusTitle}>
                        <FormattedMessage id="deliveryStatus" defaultMessage="Delivery Status" />
                    </h5>
                    <Timeline
                        sx={{
                            padding: '6px 0',
                            [`& .${timelineItemClasses.root}:before`]: {
                            flex: 0,
                            padding: 0,
                            },
                        }}
                    >
                        <TimelineItem sx={{ minHeight: 'inherit' }}>
                            <TimelineSeparator>
                            <TimelineDot sx= {{ backgroundColor: '#FFC629', boxShadow: 'none', margin: '0px' }} />
                            <TimelineConnector sx={{ minHeight: '14px', backgroundColor: '#E0E0E0' }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ padding: '0 14px', marginTop: '-5px', fontFamily: 'Roobert', fontSize: '14px', fontStyle: 'normal', fontWeight: '500', color: '#000', ...(isRTL && { textAlign: 'right' }) }} >
                                <FormattedMessage id="orderPlaced" defaultMessage="Order Placed" />
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem sx={{ minHeight: 'inherit' }}>
                            <TimelineSeparator>
                            <TimelineDot sx= {{ boxShadow: 'none', margin: '0px', borderColor: '#E0E0E0' }} variant="outlined" />
                            <TimelineConnector sx={{ minHeight: '14px', backgroundColor: '#E0E0E0' }} />
                            </TimelineSeparator>
                            <TimelineContent sx={{ padding: '0 14px', marginTop: '-5px', fontFamily: 'Roobert', fontSize: '14px', fontStyle: 'normal', fontWeight: '500', color: '#E0E0E0', ...(isRTL && { textAlign: 'right' }) }} >
                                <FormattedMessage id="processing" defaultMessage="Processing" />
                            </TimelineContent>
                        </TimelineItem>
                        <TimelineItem sx={{ minHeight: 'inherit' }}>
                            <TimelineSeparator>
                            <TimelineDot sx= {{ boxShadow: 'none', margin: '0px', borderColor: '#E0E0E0' }} variant="outlined" />
                            </TimelineSeparator>
                            <TimelineContent sx={{ padding: '0 14px', marginTop: '-5px', fontFamily: 'Roobert', fontSize: '14px', fontStyle: 'normal', fontWeight: '500', color: '#E0E0E0', ...(isRTL && { textAlign: 'right' }) }} >
                                <FormattedMessage id="delivered" defaultMessage="Delivered" />
                            </TimelineContent>
                        </TimelineItem>
                    </Timeline>
                    {method_title && (
                        <FormattedEstimationDeliveryDate methodTitle={method_title} className={classes.estimationTime} />
                    )}
                </div>
                <div className={classes.deliverySupport}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                            {/* <Grid sx={{ borderRight: '1px solid #fff' }} item xs={6}>
                                <Item>
                                    You think you made a mistake?
                                    <Button className={classes.deliveryBtn}>Cancel Order</Button>
                                </Item>
                            </Grid> */}
                            <Grid item xs={12}>
                                <Item>
                                    A question for our customer care team?
                                    <Button className={classes.deliveryBtn}>Chat here</Button>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
                <br/>
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
                                }), stateIncrementId: orderNumber}
                            }}
                            className={classes.editButton}
                            data-cy="CheckoutOrderSummary-editButton"
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
                <br/>
                <Button className={classes.fullBtn} variant="contained" size="medium"><FormattedMessage id="resumeShopping" defaultMessage="Resume Shopping" /></Button>
            </div>
            </div>
        </div>
    );
};

SuccessPage.propTypes = {
    data: object,
    classes: shape({
        root: string
    })
};

export default SuccessPage;
