import React, { Fragment } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import { useStyle } from '@magento/venia-ui/lib/classify';
import { FormattedMessage, useIntl } from 'react-intl';
import { useAccountInformationPage } from '@magento/peregrine/lib/talons/AccountInformationPage/useAccountInformationPage';
import AccountInformationPageOperations from '../ProfilePage/accountInformationPage.gql.js';
import { shape, string, bool } from 'prop-types';
import GuestFields from './GuestFields';
import { useAsyncAddressForm } from '../../@amasty/one-step-checkout/src/talons/ShippingInformation/useAsyncAddressForm';
import AddressForm from './AddressForm';
import { Form } from 'informed';
import Card from './CardAddress/card';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';
import CheckoutMapIcon from '../Icons/checkout_map.svg';
import Button from '@mui/material/Button';

const GuestForm = props => {
    const { isGuestCheckout, amAllowGuestCheckout } = props;
    const { shippingData, optionsFormProps } = useAsyncAddressForm(props);
    //console.log("shippingData -->>>", shippingData);
    const classes = useStyle({}, props.classes);
    const history = useHistory();
    const location = useLocation();
    const { formatMessage } = useIntl();
    const isRTL = formatMessage({ id: 'lang.direction' }) === 'rtl'; // Use your logic to determine RTL
    const queryParams = new URLSearchParams(location.search);

    let firstnameVal = queryParams.get('firstname');
    let lastnameVal = queryParams.get('lastname');
    let phoneVal = queryParams.get('phone');

    const talonProps = useAccountInformationPage({
        ...AccountInformationPageOperations
    });
    const {
        initialValues
    } = talonProps;

    if (initialValues) {
        const { customer } = initialValues;
        firstnameVal = customer.firstname;
        lastnameVal = customer.lastname;
        phoneVal = customer.mobile;
    }

    const guestFields = isGuestCheckout ? (
        <Form>
            <GuestFields {...props} />
        </Form>
    ) : null;

    const handleUpdateGuestAddress = () => {
        const targetPagePath = "/guest-form";
        const stateParams = {
            headerTitle: formatMessage({ id: "enterLocation" }),
            isGuestCheckout: isGuestCheckout,
            amAllowGuestCheckout: amAllowGuestCheckout,
            isUpdate: true,
            shippingData: shippingData
        };
        // Redirect the user to the target page with state parameters
        history.push(targetPagePath, stateParams);
    }

    const MapIcon = (
        <img src={CheckoutMapIcon} alt="Map" />
    );

    const hiddenStyles = {
        display: 'none',
    };

    const fullBtnStyles = {
        background: '#FFC629',
        borderRadius: '12px',
        boxShadow: 'none',
        width: '100%',
        color: '#000000',
        textTransform: 'capitalize',
        height: '46px',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: '14px',
        justifyContent: 'start',
        flexDirection: isRTL ? 'row-reverse': 'row'
    };

    const checkoutLabel = {
        color: "#000",
        fontWeight: "600",
        fontStyle: "normal",
        fontWeight: "500",
        lineHeight: "110%",
        display: "block",
        marginTop: "15px",
        marginBottom: "15px",
    }

    const fullBtnHoverStyles = {
        backgroundColor: '#FFC629',
    };

    const firstnameAttribute = shippingData.custom_attributes
    ? shippingData.custom_attributes.find(attribute => attribute.attribute_code === 'firstname')
    : null;
    const isFirstNameNotEmpty = firstnameAttribute && firstnameAttribute.value !== "-";
    return (
        <div className={classes.root}>
            {/* {guestFields} */}
            <div style={hiddenStyles}>
                <AddressForm
                    shippingData={shippingData}
                    isGuestCheckout={isGuestCheckout}
                    optionsFormProps={optionsFormProps}
                    asyncForm
                />
            </div>
            {isFirstNameNotEmpty && Object.keys(shippingData).length > 0 ? (
                <Fragment>
                    <Card shippingData={shippingData} handleUpdateGuestAddress={handleUpdateGuestAddress} />
                </Fragment>
            ) : (
                <div>
                    <h5 style={checkoutLabel}><FormattedMessage id="deliveryTo" defaultMessage="Delivery to:" /></h5>
                    <Button style={fullBtnStyles} className={classes.fullBtn} component={Link} to={{
                        pathname: resourceUrl(`/guest-form`),
                        search: `firstname=${firstnameVal}&lastname=${lastnameVal}&phone=${phoneVal}`,
                        state: { headerTitle: formatMessage({ id: "enterLocation" }), isGuestCheckout: isGuestCheckout, amAllowGuestCheckout: amAllowGuestCheckout }
                    }} variant="contained" size="medium" startIcon={!isRTL && MapIcon}endIcon={isRTL && MapIcon}>
                        <FormattedMessage id="addAddress" defaultMessage="Add Address" />
                    </Button>
                </div>
            )}
        </div>
    );
};

GuestForm.propTypes = {
    isGuestCheckout: bool,
    classes: shape({
        root: string
    })
};

export default GuestForm;
