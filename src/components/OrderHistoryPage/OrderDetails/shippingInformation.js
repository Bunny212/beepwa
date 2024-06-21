import React, { Fragment } from 'react';
import { arrayOf, shape, string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { useStyle } from '@magento/venia-ui/lib/classify';

import defaultClasses from './shippingInformation.module.css';

const ShippingInformation = props => {
    const { data, classes: propsClasses } = props;
    const classes = useStyle(defaultClasses, propsClasses);

    let shippingContentElement;

    if (data) {
        const {
            city,
            country_code,
            firstname,
            lastname,
            postcode,
            region,
            street,
            telephone
        } = data;

        const additionalAddressString = `${city}, ${region}`;
        const fullName = `${firstname} ${lastname}`;
        const streetRows = street.map((row, index) => {
            return (
                <span className={classes.streetRow} key={index}>
                    {row}
                </span>
            );
        });

        shippingContentElement = (
            <Fragment>
                <span className={classes.name}>Home Contact: {fullName}</span>
                <div className={classes.additionalAddress}>
                    {streetRows}
                    {additionalAddressString}
                </div>
                <span className={classes.orderTelephone}>{telephone}</span>
            </Fragment>
        );
    } else {
        shippingContentElement = (
            <FormattedMessage
                id="orderDetails.noShippingInformation"
                defaultMessage="No shipping information"
            />
        );
    }

    return (
        <div
            className={classes.root}
            data-cy="OrderDetails-ShippingInformation-root"
        >
            {shippingContentElement}
        </div>
    );
};

export default ShippingInformation;

ShippingInformation.propTypes = {
    classes: shape({
        root: string,
        heading: string,
        name: string,
        streetRow: string,
        additionalAddress: string
    }),
    data: shape({
        city: string,
        country_code: string,
        firstname: string,
        lastname: string,
        postcode: string,
        region: string,
        street: arrayOf(string),
        telephone: string
    })
};
