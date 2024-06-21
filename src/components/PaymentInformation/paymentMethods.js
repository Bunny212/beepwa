import React, { Fragment, useState } from 'react';
import { shape, string, bool, func } from 'prop-types';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAmOscContext } from '../../@amasty/one-step-checkout/src/context';
import { useCartContext } from '@magento/peregrine/lib/context/cart';
import { usePaymentMethods } from '../../@amasty/one-step-checkout/src/talons/PaymentInformation/usePaymentMethods';
import { useStyle } from '@magento/venia-ui/lib/classify';
import RadioGroup from '@magento/venia-ui/lib/components/RadioGroup';
import Radio from '@magento/venia-ui/lib/components/RadioGroup/radio';
import defaultClasses from './paymentMethods.module.css';
import payments from '@magento/venia-ui/lib/components/CheckoutPage/PaymentInformation/paymentMethodCollection';
import PlaceOrderButton from '../../@amasty/one-step-checkout/src/components/OrderSummary/placeOrderButton';
import Agreements from '../../@amasty/one-step-checkout/src/components/AdditionalOptions/Agreements';

import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Skeleton from '@mui/material/Skeleton';
import CheckoutPaymentIcon from '../Icons/payment_icon.svg';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import { useQuery } from '@apollo/client'; // Import the Apollo Client's useQuery hook
import { GET_SELECTED_PAYMENT_METHOD } from './queries/selectedPyamentMethod.qq'; // Import your GraphQL query

const drawerBleeding = 56;

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

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

const CenterItem = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    boxShadow: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'cnter',
    justifyContent: 'cnter',
    padding: '0px',
}));

const PaymentMethods = props => {
    const {
        classes: propClasses,
        onPaymentError,
        onPaymentSuccess,
        resetShouldSubmit,
        shouldSubmit,
        handlePlaceOrder,
        isUpdating
    } = props;

    const { formatMessage } = useIntl();

    const classes = useStyle(defaultClasses, propClasses);
    const [{ cartId }] = useCartContext();

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const talonProps = usePaymentMethods();

    const {
        availablePaymentMethods,
        currentSelectedPaymentMethod,
        initialSelectedMethod,
        isLoading,
        isShowPlaceOrderButton,
        isShowAgreements
    } = talonProps;

    if (isLoading) {
        return null;
    }

    const [
        {
            amasty_checkout_default_values_payment_method: defaultPaymentMethod
        }
    ] = useAmOscContext();
    
    const placeOrderButton = isShowPlaceOrderButton ? (
        <PlaceOrderButton
            handlePlaceOrder={handlePlaceOrder}
            isUpdating={isUpdating}
        />
    ) : null;

    const agreements = isShowAgreements ? (
        <div className={classes.agreements}>
            <Agreements />
        </div>
    ) : null;

    const selectedPaymentMethodContent = (result, title) => (
        <div className={classes.root}>
            <div className={classes.heading_container}>
                <h5 className={classes.heading}>
                    <FormattedMessage id="orderDetails.paymentMethodLabel" defaultMessage="Payment Method" />
                </h5>
                {availablePaymentMethods.length > 1 && (
                    <LinkButton
                        onClick={toggleDrawer(true)}
                        className={classes.editButton}
                        data-cy="PaymentMethod-editButton"
                    >
                        <span className={classes.editText}>
                            Add / Update →
                        </span>
                    </LinkButton>
                )}
            </div>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                    <Grid item xs={2}>
                        <Item>
                            <img src={CheckoutPaymentIcon} alt={title} />
                        </Item>
                    </Grid>
                    <Grid item xs={10} sx={{ marginTop: '10px' }}>
                        <Item>
                            <span className={classes.methodTitle}>{result}</span>
                            <span className={classes.subMethodTitle}>{title}</span>
                        </Item>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );

    const currentPaymentMethod = availablePaymentMethods
        .map(({ code, title }) => {
            // If we don't have an implementation for a method type, ignore it.
            if (!Object.keys(payments).includes(code)) {
                return;
            }

            const id = `paymentMethod--${code}`;
            const isSelected = defaultPaymentMethod === code;
            if (isSelected) {
                const PaymentMethodComponent = payments[code];

                const paymentMethodTitle = title;
                const keyword = "cash";
                let result = "cash";
                if (paymentMethodTitle.includes(keyword)) {
                    result = keyword;
                } else {
                    result = paymentMethodTitle;
                }
                const paymentContent = selectedPaymentMethodContent(result, title);

                return (
                    <div key={code}>
                        {isSelected ? (
                            <Fragment>
                            { paymentContent }
                            </Fragment>
                        ) : null}
                    </div>
                );
            }
        })
        .filter(paymentMethod => !!paymentMethod);

    const radios = availablePaymentMethods
        .map(({ code, title }) => {
            // If we don't have an implementation for a method type, ignore it.
            if (!Object.keys(payments).includes(code)) {
                return;
            }

            const id = `paymentMethod--${code}`;
            const isSelected = currentSelectedPaymentMethod === code;
            const PaymentMethodComponent = payments[code];
            const renderedComponent = isSelected ? (
                <Fragment>
                    <PaymentMethodComponent
                        onPaymentSuccess={onPaymentSuccess}
                        onPaymentError={onPaymentError}
                        resetShouldSubmit={resetShouldSubmit}
                        shouldSubmit={shouldSubmit}
                    />

                    {agreements}
                    {placeOrderButton}
                </Fragment>
            ) : null;

            return (
                <div key={code} className={classes.payment_method}>
                    <Radio
                        id={id}
                        label={title}
                        value={code}
                        classes={{
                            label: classes.radio_label
                        }}
                        checked={isSelected}
                    />
                    {renderedComponent}
                </div>
            );
        })
        .filter(paymentMethod => !!paymentMethod);

    const noPaymentMethodMessage = !radios.length ? (
        <div className={classes.payment_errors}>
            <span>
                {formatMessage({
                    id: 'checkoutPage.paymentLoadingError',
                    defaultMessage: 'There was an error loading payments.'
                })}
            </span>
            <span>
                {formatMessage({
                    id: 'checkoutPage.refreshOrTryAgainLater',
                    defaultMessage: 'Please refresh or try again later.'
                })}
            </span>
        </div>
    ) : null;

    const rootClassName = isUpdating ? classes.root_disabled : classes.root;

    const hiddenStyles = {
        display: 'none',
    };

    return (
        <div className={rootClassName}>
            {radios.length == 1 ? (
                <>
                    {currentPaymentMethod}
                    <div style={hiddenStyles}>
                        <RadioGroup
                            classes={{ root: classes.radio_group }}
                            field="selectedPaymentMethod"
                            initialValue={initialSelectedMethod}
                        >
                            {radios}
                        </RadioGroup>
                    </div>
                    <CssBaseline />
                    <Global
                        styles={{
                            '.MuiDrawer-root > .MuiPaper-root': {
                                height: `calc(50% - ${drawerBleeding}px)`,
                                overflow: 'visible',
                            },
                        }}
                    />
                    <SwipeableDrawer
                        anchor="bottom"
                        open={open}
                        onClose={toggleDrawer(false)}
                        onOpen={toggleDrawer(true)}
                        swipeAreaWidth={drawerBleeding}
                        disableSwipeToOpen={false}
                        ModalProps={{
                            keepMounted: false,
                        }}
                    >
                        <StyledBox
                            sx={{
                                position: 'absolute',
                                top: -drawerBleeding,
                                borderTopLeftRadius: 8,
                                borderTopRightRadius: 8,
                                visibility: 'visible',
                                right: 0,
                                left: 0,
                            }}
                        >
                            <Puller />
                            <Typography sx={{ p: 2, color: 'text.secondary' }}><FormattedMessage id="orderDetails.paymentMethodLabel" defaultMessage="Payment Method" /></Typography>
                        </StyledBox>
                        <StyledBox
                            sx={{
                                px: 2,
                                pb: 2,
                                height: '100%',
                                overflow: 'auto',
                            }}
                        >
                            <RadioGroup
                                classes={{ root: classes.radio_group }}
                                field="selectedPaymentMethod"
                                initialValue={initialSelectedMethod}
                            >
                                {radios}
                            </RadioGroup>
                        </StyledBox>
                    </SwipeableDrawer>
                </>
            ) : (
                <RadioGroup
                    classes={{ root: classes.radio_group }}
                    field="selectedPaymentMethod"
                    initialValue={initialSelectedMethod}
                >
                    {radios}
                </RadioGroup>
            )}   
            {noPaymentMethodMessage}
        </div>
    );
};

export default PaymentMethods;

PaymentMethods.propTypes = {
    classes: shape({
        root: string,
        payment_method: string,
        radio_label: string
    }),
    onPaymentSuccess: func,
    onPaymentError: func,
    resetShouldSubmit: func,
    selectedPaymentMethod: string,
    shouldSubmit: bool
};
