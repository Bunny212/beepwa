import React, { Fragment, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { bool, shape, string } from 'prop-types';
import defaultClasses from './shippingMethod.module.css';
import FormError from '@magento/venia-ui/lib/components/FormError';
import { useShippingMethod } from './useShippingMethod';
import ShippingRadios from './shippingRadios';
import { Form } from 'informed';
import Price from '../Price';

import LinkButton from '@magento/venia-ui/lib/components/LinkButton';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

import { Global } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FormattedEstimationDeliveryDate from '../FormattedEstimationDeliveryDate/FormattedEstimationDeliveryDate';

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

const ShippingMethod = props => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const talonProps = useShippingMethod(props, setOpen, toggleDrawer);

    const {
        errors,
        isLoading,
        shippingMethods,
        handleChange,
        selectedShippingMethod,
        setFormApi
    } = talonProps;
    const { isUpdating, design } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const { carrier_code, method_code, method_title, amount } = selectedShippingMethod || {};
    // const {
    //     carrier_code = 'freeshipping',
    //     method_code = 'freeshipping',
    //     method_title = '3-day Delivery',
    //     amount = { value: 0, currency: 'USD' }
    // } = selectedShippingMethod || {};

    const { currency, value } = amount || {};

    const hiddenStyles = {
        display: 'none',
    };

    const priceElement = value ? (
        <div>
            <Price value={value} currencyCode={currency} />
        </div>
    ) : (
        <span className={classes.free}>
            <FormattedMessage id={'global.free'} defaultMessage={'Free'} />
        </span>
    );

    const selectedInitialShippingMethodContent = (
        <div>
            <div className={classes.cardHeader}>
                <h5 className={classes.cardTitle}>
                    <FormattedMessage id="deliveryTime" defaultMessage="Delivery time:" />
                </h5>
                {shippingMethods.length > 1 && (
                    <LinkButton
                        onClick={toggleDrawer(true)}
                        className={classes.editButton}
                        data-cy="ShippingInformation-editButton"
                    >
                        <span className={classes.editText}>
                            <FormattedMessage id="getFasterDelivery" defaultMessage="Get faster delivery" /> →
                        </span>
                    </LinkButton>
                )}
            </div>
            {method_title && (
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2} sx={{ alignItems: 'center', marginTop: '10px' }}>
                        <Grid item xs={12}>
                            <Item>
                                <FormattedEstimationDeliveryDate methodTitle={method_title} className={classes.methodTitle} />
                                <Box sx={{ display: "flex" }}>
                                    <span className={classes.subMethodTitle}>{method_title}:</span>
                                    <span className={classes.subMethodPrice}>{priceElement}</span>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </div>
    );

    return (
        <Fragment>
            <div style={hiddenStyles}>
                <Form
                    getApi={setFormApi}
                    className={classes.form}
                    initialValues={{
                        shipping_method: selectedShippingMethod
                            ? selectedShippingMethod.serializedValue
                            : undefined
                    }}
                >
                    <ShippingRadios
                        disabled={isUpdating || isLoading}
                        shippingMethods={shippingMethods}
                        onChange={handleChange}
                        design={design}
                    />
                </Form>
            </div>
            {selectedInitialShippingMethodContent}
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
                    <Typography sx={{ p: 2, color: 'text.secondary' }}><FormattedMessage id="getFasterDelivery" defaultMessage="Get faster delivery" /></Typography>
                </StyledBox>
                <StyledBox
                    sx={{
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    <FormError errors={Array.from(errors.values())} />
                    <Form
                        getApi={setFormApi}
                        className={classes.form}
                        initialValues={{
                            shipping_method: selectedShippingMethod
                                ? selectedShippingMethod.serializedValue
                                : undefined
                        }}
                    >
                        <ShippingRadios
                            disabled={isUpdating || isLoading}
                            shippingMethods={shippingMethods}
                            onChange={handleChange}
                            design={design}
                        />
                    </Form>
                </StyledBox>
            </SwipeableDrawer>
        </Fragment>
    );
};

ShippingMethod.propTypes = {
    blockTitle: string,
    isUpdating: bool,
    classes: shape({
        root: string
    })
};

export default ShippingMethod;
