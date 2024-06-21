import React, { Fragment } from "react";
import './productPrice.css';
import Price from '../Price';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import GetDeviceType from '../GetDeviceType/getDeviceType';

const ProductPrice = ({ item }) => {
    const { isDesktop, isMobile, isTablet } = GetDeviceType();
    const currency = item.price_range.maximum_price.regular_price.currency;
    const regularPrice = item.price_range.maximum_price.regular_price.value;
    const finalPrice = item.price_range.maximum_price.final_price.value;
    const priceTextClass = isDesktop ? 'priceTextDesktop' : 'priceText';
    const oldPriceClass = isDesktop ? 'oldPriceDesktop' : 'oldPrice';

    let comparisonResult;

    if (finalPrice < regularPrice) {
        // Error message for screen reader
        comparisonResult = (
            <Box className="priceContainer">
                <Typography variant="h6" component="span" className={priceTextClass}>
                    <Price
                        currencyCode={currency}
                        value={finalPrice}
                    />
                </Typography>
                <Typography variant="h6" component="span" className={`${priceTextClass} ${oldPriceClass}`}>
                    <Price
                        currencyCode={currency}
                        value={regularPrice}
                    />
                </Typography>
            </Box>
        );
    } else if (finalPrice === regularPrice) {
        comparisonResult = (
            <Box className="priceContainer">
                <Typography variant="h6" component="span" className={priceTextClass}>
                    <Price
                        currencyCode={currency}
                        value={regularPrice}
                    />
                </Typography>
            </Box>
        );
    }


    return (
        <Fragment>
            {comparisonResult}
        </Fragment>
    );
};

export default ProductPrice;
